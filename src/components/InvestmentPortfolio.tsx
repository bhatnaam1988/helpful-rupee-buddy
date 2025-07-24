
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useInvestments } from "@/hooks/useInvestments";
import { useLanguage } from "@/hooks/useLanguage";
import { TrendingUp } from "lucide-react";
import InvestmentSummary from "./investment/InvestmentSummary";
import InvestmentList from "./investment/InvestmentList";

const InvestmentPortfolio = () => {
  const { investments, loading } = useInvestments();
  const { t } = useLanguage();

  const totalInvestmentValue = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalCurrentValue = investments.reduce((sum, inv) => sum + inv.current_value, 0);
  const totalGainLoss = totalCurrentValue - totalInvestmentValue;
  const gainLossPercentage = totalInvestmentValue > 0 ? ((totalGainLoss / totalInvestmentValue) * 100) : 0;

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mobile-container space-y-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary">{t('investmentPortfolio')}</h1>
            <p className="text-muted-foreground text-sm mt-1">{t('loading')}</p>
          </div>
        </div>
      </div>
    );
  }

  if (investments.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="mobile-container space-y-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary">{t('investmentPortfolio')}</h1>
            <p className="text-muted-foreground text-sm mt-1">{t('manageInvestments')}</p>
          </div>
          
          <Card className="worker-card">
            <CardContent className="text-center py-8">
              <TrendingUp className="w-12 h-12 text-trust-blue/50 mx-auto mb-4" />
              <p className="text-muted-foreground">{t('noInvestments')}</p>
              <p className="text-sm text-muted-foreground/75 mt-1">{t('startInvestingToday')}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="mobile-container space-y-4">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary">{t('investmentPortfolio')}</h1>
          <p className="text-muted-foreground text-sm mt-1">{t('manageInvestments')}</p>
        </div>
        
        <InvestmentSummary
          totalInvestmentValue={totalInvestmentValue}
          totalCurrentValue={totalCurrentValue}
          totalGainLoss={totalGainLoss}
          gainLossPercentage={gainLossPercentage}
        />
        
        <InvestmentList investments={investments} />
      </div>
    </div>
  );
};

export default InvestmentPortfolio;
