
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Brain, TrendingUp, AlertCircle, CheckCircle, Target, Shield } from "lucide-react";

interface Recommendation {
  type: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  action: string;
  instruments?: string[];
}

interface AIRecommendationData {
  monthly_investment_amount: number;
  recommendations: Recommendation[];
  ai_advice: string;
  financial_health_score: number;
}

const AIRecommendations = () => {
  const [recommendations, setRecommendations] = useState<AIRecommendationData | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const getRecommendations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-recommendations');
      
      if (error) {
        toast({
          title: "त्रुटि",
          description: "AI सुझाव प्राप्त करने में असफल",
          variant: "destructive"
        });
        return;
      }

      setRecommendations(data);
      toast({
        title: "सफलता",
        description: "AI सुझाव सफलतापूर्वक प्राप्त किए गए"
      });
    } catch (error) {
      toast({
        title: "त्रुटि",
        description: "AI सुझाव प्राप्त करने में असफल",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'medium':
        return <Target className="w-4 h-4 text-yellow-500" />;
      case 'low':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      default:
        return <CheckCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-700 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'low':
        return 'bg-green-100 text-green-700 border-green-200';
      default:
        return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getPriorityText = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'उच्च प्राथमिकता';
      case 'medium':
        return 'मध्यम प्राथमिकता';
      case 'low':
        return 'कम प्राथमिकता';
      default:
        return 'सामान्य';
    }
  };

  const getRecommendationIcon = (type: string) => {
    switch (type) {
      case 'emergency_fund':
        return <Shield className="w-5 h-5 text-blue-600" />;
      case 'sip_investment':
      case 'diversified_portfolio':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      case 'tax_saving':
        return <Target className="w-5 h-5 text-purple-600" />;
      default:
        return <Brain className="w-5 h-5 text-gray-600" />;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('hi-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg text-gray-800 flex items-center space-x-2">
          <Brain className="w-5 h-5 text-purple-600" />
          <span>AI वित्तीय सुझाव</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!recommendations ? (
          <div className="text-center py-8">
            <Brain className="w-16 h-16 text-purple-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              आपकी वित्तीय स्थिति का विश्लेषण करके व्यक्तिगत सुझाव प्राप्त करें
            </p>
            <Button 
              onClick={getRecommendations} 
              disabled={loading}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {loading ? 'विश्लेषण हो रहा है...' : 'AI सुझाव प्राप्त करें'}
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Financial Health Score */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-100">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-purple-800">वित्तीय स्वास्थ्य स्कोर</h4>
                <Badge className="bg-purple-100 text-purple-700">
                  {recommendations.financial_health_score}/100
                </Badge>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-blue-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${recommendations.financial_health_score}%` }}
                ></div>
              </div>
              <p className="text-sm text-purple-600">
                {recommendations.financial_health_score >= 80 ? 'उत्कृष्ट! आपकी वित्तीय स्थिति बहुत अच्छी है।' :
                 recommendations.financial_health_score >= 60 ? 'अच्छी! कुछ सुधार की गुंजाइश है।' :
                 recommendations.financial_health_score >= 40 ? 'औसत। वित्तीय अनुशासन की आवश्यकता है।' :
                 'चेतावनी! तत्काल वित्तीय सुधार आवश्यक है।'}
              </p>
            </div>

            {/* Monthly Investment Suggestion */}
            {recommendations.monthly_investment_amount > 0 && (
              <div className="bg-green-50 rounded-lg p-4 border border-green-100">
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-green-800">सुझावित मासिक निवेश</h4>
                </div>
                <p className="text-2xl font-bold text-green-700 mb-1">
                  {formatCurrency(recommendations.monthly_investment_amount)}
                </p>
                <p className="text-sm text-green-600">
                  प्रति माह निवेश करके अपना wealth बढ़ाएं
                </p>
              </div>
            )}

            {/* AI Advice */}
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <h4 className="font-semibold text-blue-800 mb-2">AI विश्लेषण रिपोर्ट</h4>
              <pre className="text-sm text-blue-700 whitespace-pre-wrap font-sans">
                {recommendations.ai_advice}
              </pre>
            </div>

            {/* Recommendations List */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">व्यक्तिगत सुझाव</h4>
              {recommendations.recommendations.map((rec, index) => (
                <div key={index} className={`border rounded-lg p-4 ${getPriorityColor(rec.priority)}`}>
                  <div className="flex items-start space-x-3">
                    <div className="flex-shrink-0">
                      {getRecommendationIcon(rec.type)}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h5 className="font-semibold text-gray-800">{rec.title}</h5>
                        <div className="flex items-center space-x-1">
                          {getPriorityIcon(rec.priority)}
                          <span className="text-xs font-medium">
                            {getPriorityText(rec.priority)}
                          </span>
                        </div>
                      </div>
                      <p className="text-sm text-gray-700 mb-3">{rec.description}</p>
                      
                      {rec.instruments && (
                        <div className="mb-3">
                          <p className="text-xs text-gray-600 mb-1">सुझावित साधन:</p>
                          <div className="flex flex-wrap gap-1">
                            {rec.instruments.map((instrument, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {instrument}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs"
                      >
                        {rec.action}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Refresh Button */}
            <div className="text-center pt-4">
              <Button
                onClick={getRecommendations}
                disabled={loading}
                variant="outline"
                size="sm"
              >
                {loading ? 'अपडेट हो रहा है...' : 'सुझाव अपडेट करें'}
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIRecommendations;
