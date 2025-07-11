import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { TrendingUp, Target, Wallet, TrendingDown } from "lucide-react";

interface WorkerStatsCardsProps {
  totalExpenses: number;
  totalGoalAmount: number;
  completedGoals: number;
  monthlyIncome: number;
}

const WorkerStatsCards = ({
  totalExpenses,
  totalGoalAmount,
  completedGoals,
  monthlyIncome
}: WorkerStatsCardsProps) => {
  const { t, currentLanguage } = useLanguage();
  
  const surplus = monthlyIncome - totalExpenses;
  const savingsRate = monthlyIncome > 0 ? ((surplus / monthlyIncome) * 100) : 0;

  const stats = [
    {
      title: currentLanguage === 'hi' ? 'इस महीने खर्च' : 'This Month Spending',
      value: `₹${totalExpenses.toLocaleString('en-IN')}`,
      icon: TrendingDown,
      bgColor: 'bg-error-red/10',
      iconColor: 'text-error-red',
      textColor: 'text-error-red'
    },
    {
      title: currentLanguage === 'hi' ? 'बचत' : 'Savings',
      value: `₹${surplus.toLocaleString('en-IN')}`,
      icon: Wallet,
      bgColor: surplus >= 0 ? 'bg-success-green/10' : 'bg-warning-orange/10',
      iconColor: surplus >= 0 ? 'text-success-green' : 'text-warning-orange',
      textColor: surplus >= 0 ? 'text-success-green' : 'text-warning-orange'
    },
    {
      title: currentLanguage === 'hi' ? 'लक्ष्य पूरे' : 'Goals Completed',
      value: `${completedGoals}`,
      icon: Target,
      bgColor: 'bg-prosperity-gold/10',
      iconColor: 'text-prosperity-gold',
      textColor: 'text-prosperity-gold'
    },
    {
      title: currentLanguage === 'hi' ? 'बचत दर' : 'Savings Rate',
      value: `${savingsRate.toFixed(1)}%`,
      icon: TrendingUp,
      bgColor: 'bg-trust-blue/10',
      iconColor: 'text-trust-blue',
      textColor: 'text-trust-blue'
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-neutral-900">
        {currentLanguage === 'hi' ? 'आपकी स्थिति' : 'Your Overview'}
      </h2>
      
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <Card key={index} className="worker-card simple-hover border-0">
            <CardContent className="p-4 text-center space-y-3">
              <div className={`w-12 h-12 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto`}>
                <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
              </div>
              <div>
                <p className="text-xs text-neutral-600 mb-1">{stat.title}</p>
                <p className={`text-lg font-bold ${stat.textColor}`}>{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Simple advice based on stats */}
      {surplus < 0 && (
        <div className="worker-card p-4 bg-warning-orange/5 border-warning-orange/20">
          <p className="text-sm text-warning-orange font-medium">
            {currentLanguage === 'hi' 
              ? '⚠️ इस महीने खर्च ज्यादा है। कुछ खर्चे कम करने की कोशिश करें।'
              : '⚠️ Spending more than income this month. Try to reduce some expenses.'
            }
          </p>
        </div>
      )}
      
      {surplus > 0 && savingsRate > 20 && (
        <div className="worker-card p-4 bg-success-green/5 border-success-green/20">
          <p className="text-sm text-success-green font-medium">
            {currentLanguage === 'hi'
              ? '✅ बहुत बढ़िया! आप अच्छी बचत कर रहे हैं।'
              : '✅ Excellent! You are saving well.'
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default WorkerStatsCards;