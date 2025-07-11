
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useLanguage } from "@/hooks/useLanguage";
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
  const { t } = useLanguage();

  const getRecommendations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-recommendations');
      
      if (error) {
        toast({
          title: t('error'),
          description: t('failedToGetAiSuggestions'),
          variant: "destructive"
        });
        return;
      }

      setRecommendations(data);
      toast({
        title: t('success'),
        description: t('aiSuggestionsReceived')
      });
    } catch (error) {
      toast({
        title: t('error'),
        description: t('failedToGetAiSuggestions'),
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
        return t('highPriority');
      case 'medium':
        return t('mediumPriority');
      case 'low':
        return t('lowPriority');
      default:
        return t('normal');
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

  const getHealthScoreMessage = (score: number) => {
    if (score >= 80) return t('excellent');
    if (score >= 60) return t('good');
    if (score >= 40) return t('average');
    return t('warning');
  };

  return (
    <div className="worker-card">
      <div className="flex items-center space-x-2 mb-4">
        <Brain className="w-5 h-5 text-prosperity-gold" />
        <h2 className="text-lg font-semibold text-primary">{t('aiFinancialSuggestions')}</h2>
      </div>
      {!recommendations ? (
        <div className="text-center py-8">
          <Brain className="w-16 h-16 text-prosperity-gold/50 mx-auto mb-4" />
          <p className="text-muted-foreground mb-4">
            {t('getPersonalizedSuggestions')}
          </p>
          <button 
            onClick={getRecommendations} 
            disabled={loading}
            className="worker-button-primary"
          >
            {loading ? t('analyzing') : t('getAiSuggestions')}
          </button>
        </div>
        ) : (
          <div className="space-y-6">
          {/* Financial Health Score */}
          <div className="bg-gradient-to-r from-prosperity-gold/10 to-trust-blue/10 rounded-lg p-4 border border-prosperity-gold/20">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-semibold text-prosperity-gold">{t('financialHealthScore')}</h4>
              <Badge className="bg-prosperity-gold/20 text-prosperity-gold">
                {recommendations.financial_health_score}/100
              </Badge>
            </div>
            <div className="w-full bg-border rounded-full h-3 mb-2">
              <div 
                className="bg-gradient-to-r from-prosperity-gold to-trust-blue h-3 rounded-full transition-all duration-500"
                style={{ width: `${recommendations.financial_health_score}%` }}
              ></div>
            </div>
            <p className="text-sm text-prosperity-gold">
              {getHealthScoreMessage(recommendations.financial_health_score)}
            </p>
          </div>

          {/* Monthly Investment Suggestion */}
          {recommendations.monthly_investment_amount > 0 && (
            <div className="bg-success-green/10 rounded-lg p-4 border border-success-green/20">
              <div className="flex items-center space-x-2 mb-2">
                <TrendingUp className="w-5 h-5 text-success-green" />
                <h4 className="font-semibold text-success-green">{t('suggestedMonthlyInvestment')}</h4>
              </div>
              <p className="text-2xl font-bold text-success-green mb-1">
                {formatCurrency(recommendations.monthly_investment_amount)}
              </p>
              <p className="text-sm text-success-green/80">
                {t('investMonthlyToGrowWealth')}
              </p>
            </div>
          )}

          {/* AI Advice */}
          <div className="bg-trust-blue/10 rounded-lg p-4 border border-trust-blue/20">
            <h4 className="font-semibold text-trust-blue mb-2">{t('aiAnalysisReport')}</h4>
            <pre className="text-sm text-trust-blue/80 whitespace-pre-wrap font-sans">
              {recommendations.ai_advice}
            </pre>
          </div>

            {/* Recommendations List */}
            <div className="space-y-4">
              <h4 className="font-semibold text-gray-800">{t('personalSuggestions')}</h4>
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
                          <p className="text-xs text-gray-600 mb-1">{t('suggestedInstruments')}</p>
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
            <button
              onClick={getRecommendations}
              disabled={loading}
              className="worker-button-secondary text-sm px-4 py-2"
            >
              {loading ? t('updating') : t('updateSuggestions')}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;
