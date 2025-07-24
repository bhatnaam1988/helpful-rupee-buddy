
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Rate limiting storage (in production, use Redis or similar)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

const checkRateLimit = (userId: string): boolean => {
  const now = Date.now();
  const key = userId;
  const limit = rateLimitMap.get(key);
  
  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(key, { count: 1, resetTime: now + 60000 }); // 1 minute window
    return true;
  }
  
  if (limit.count >= 5) { // 5 requests per minute
    return false;
  }
  
  limit.count++;
  return true;
};

const sanitizeInput = (input: any): any => {
  if (typeof input === 'string') {
    return input.replace(/[<>]/g, '').replace(/javascript:/gi, '').trim();
  }
  return input;
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: req.headers.get('Authorization')! } } }
    )

    const { data: { user } } = await supabaseClient.auth.getUser()
    if (!user) {
      return new Response('Unauthorized', { status: 401, headers: corsHeaders })
    }

    // Rate limiting check
    if (!checkRateLimit(user.id)) {
      return new Response(
        JSON.stringify({ error: 'Rate limit exceeded. Please try again later.' }),
        { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Fetch user's financial data
    const [profileRes, expensesRes, investmentsRes, goalsRes] = await Promise.all([
      supabaseClient.from('profiles').select('*').eq('id', user.id).single(),
      supabaseClient.from('expenses').select('*').eq('user_id', user.id),
      supabaseClient.from('investments').select('*').eq('user_id', user.id),
      supabaseClient.from('goals').select('*').eq('user_id', user.id)
    ])

    const profile = profileRes.data
    const expenses = (expensesRes.data || []).map(sanitizeInput)
    const investments = (investmentsRes.data || []).map(sanitizeInput)
    const goals = (goalsRes.data || []).map(sanitizeInput)

    // Validate and sanitize financial data
    const monthlyIncome = Math.max(0, Math.min(10000000, profile?.monthly_income || 0))
    const totalExpenses = expenses.reduce((sum: number, exp: any) => {
      const amount = Math.max(0, parseFloat(exp.amount) || 0)
      return sum + amount
    }, 0)
    const totalInvestments = investments.reduce((sum: number, inv: any) => {
      const amount = Math.max(0, parseFloat(inv.amount) || 0)
      return sum + amount
    }, 0)
    const availableSurplus = Math.max(0, monthlyIncome - totalExpenses)
    const currentSavingsRate = monthlyIncome > 0 ? Math.min(100, ((availableSurplus) / monthlyIncome) * 100) : 0

    // Generate AI recommendations based on financial data
    let recommendations = []
    let monthlyInvestmentAmount = 0

    // Emergency Fund Recommendation
    const emergencyFundTarget = monthlyIncome * 6
    const hasEmergencyFund = goals.some((goal: any) => 
      goal.name.toLowerCase().includes('emergency') || goal.name.toLowerCase().includes('आपातकाल')
    )
    
    if (!hasEmergencyFund && monthlyIncome > 0) {
      recommendations.push({
        type: 'emergency_fund',
        title: 'आपातकालीन फंड बनाएं',
        description: `6 महीने के खर्च के लिए ${new Intl.NumberFormat('hi-IN').format(emergencyFundTarget)} का आपातकालीन फंड बनाना आवश्यक है।`,
        priority: 'high',
        action: 'आपातकालीन फंड लक्ष्य जोड़ें'
      })
    }

    // Investment Recommendations
    if (availableSurplus > 0) {
      monthlyInvestmentAmount = Math.floor(availableSurplus * 0.7) // 70% of surplus for investment
      
      if (monthlyInvestmentAmount >= 500) {
        recommendations.push({
          type: 'sip_investment',
          title: 'SIP निवेश शुरू करें',
          description: `महीने में ₹${monthlyInvestmentAmount.toLocaleString('hi-IN')} का SIP निवेश करके wealth building करें।`,
          priority: 'medium',
          action: 'SIP निवेश जोड़ें',
          instruments: ['Equity Mutual Fund', 'Hybrid Fund', 'ELSS']
        })
      }

      if (monthlyInvestmentAmount >= 1000) {
        recommendations.push({
          type: 'diversified_portfolio',
          title: 'विविधीकृत पोर्टफोलियो',
          description: 'अपने निवेश को विभिन्न asset classes में बांटें - 60% Equity, 30% Debt, 10% Gold।',
          priority: 'medium',
          action: 'पोर्टफोलियो डाइवर्सिफाई करें'
        })
      }
    }

    // Expense Optimization
    const highExpenseCategories = expenses
      .reduce((acc: any, exp: any) => {
        acc[exp.category] = (acc[exp.category] || 0) + exp.amount
        return acc
      }, {})

    const maxExpenseCategory = Object.entries(highExpenseCategories)
      .sort(([,a]: any, [,b]: any) => b - a)[0]

    if (maxExpenseCategory && maxExpenseCategory[1] > monthlyIncome * 0.3) {
      recommendations.push({
        type: 'expense_optimization',
        title: 'खर्च कम करें',
        description: `आपका ${maxExpenseCategory[0]} में सबसे ज्यादा खर्च है। इसे optimize करने की कोशिश करें।`,
        priority: 'medium',
        action: 'बजट ट्रैकिंग शुरू करें'
      })
    }

    // Tax Saving Recommendations
    if (monthlyIncome > 25000) {
      const hasELSS = investments.some((inv: any) => 
        inv.investment_type === 'ELSS' || inv.instrument_name.toLowerCase().includes('elss')
      )
      
      if (!hasELSS) {
        recommendations.push({
          type: 'tax_saving',
          title: 'Tax Saving करें',
          description: 'ELSS फंड में निवेश करके 80C के तहत tax save करें। सालाना ₹1.5 लाख तक की छूट मिल सकती है।',
          priority: 'high',
          action: 'ELSS निवेश जोड़ें'
        })
      }
    }

    // Goal-based recommendations
    if (goals.length === 0) {
      recommendations.push({
        type: 'goal_setting',
        title: 'वित्तीय लक्ष्य निर्धारित करें',
        description: 'अपने financial goals set करें - जैसे घर खरीदना, बच्चों की शिक्षा, रिटायरमेंट प्लानिंग।',
        priority: 'high',
        action: 'लक्ष्य जोड़ें'
      })
    }

    // Create AI advice summary
    const aiAdvice = `
आपकी वित्तीय स्थिति का विश्लेषण:
• मासिक आय: ₹${monthlyIncome.toLocaleString('hi-IN')}
• मासिक खर्च: ₹${totalExpenses.toLocaleString('hi-IN')}
• बचत दर: ${currentSavingsRate.toFixed(1)}%
• कुल निवेश: ₹${totalInvestments.toLocaleString('hi-IN')}

सुझाव: ${currentSavingsRate < 10 ? 'अपनी बचत बढ़ाने की कोशिश करें।' : 
         currentSavingsRate < 20 ? 'आपकी बचत अच्छी है, निवेश पर फोकस करें।' : 
         'बेहतरीन! अपने निवेश को diversify करते रहें।'}
    `

    // Validate and save recommendation to database
    const sanitizedRecommendations = recommendations.map(rec => ({
      ...rec,
      title: sanitizeInput(rec.title),
      description: sanitizeInput(rec.description),
      action: sanitizeInput(rec.action)
    }))

    await supabaseClient.from('recommendations').insert({
      user_id: user.id,
      monthly_investment_amount: Math.max(0, Math.min(1000000, monthlyInvestmentAmount)),
      recommended_instruments: sanitizedRecommendations,
      ai_advice: sanitizeInput(aiAdvice.trim())
    })

    return new Response(
      JSON.stringify({
        monthly_investment_amount: monthlyInvestmentAmount,
        recommendations,
        ai_advice: aiAdvice.trim(),
        financial_health_score: Math.min(100, Math.max(0, currentSavingsRate * 2 + (totalInvestments > 0 ? 20 : 0)))
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  } catch (error) {
    // Log error securely without exposing details
    console.error('AI recommendations error:', error instanceof Error ? error.message : 'Unknown error')
    return new Response(
      JSON.stringify({ error: 'Failed to generate recommendations' }),
      { 
        status: 500, 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    )
  }
})
