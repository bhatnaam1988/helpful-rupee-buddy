
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
      <div className="worker-card">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-trust-blue" />
          <h2 className="text-lg font-semibold text-primary">{t('investmentPortfolio')}</h2>
        </div>
        <p className="text-center text-muted-foreground">{t('loading')}</p>
      </div>
    );
  }

  if (investments.length === 0) {
    return (
      <div className="worker-card">
        <div className="flex items-center space-x-2 mb-4">
          <TrendingUp className="w-5 h-5 text-trust-blue" />
          <h2 className="text-lg font-semibold text-primary">{t('investmentPortfolio')}</h2>
        </div>
        <div className="text-center py-8">
          <TrendingUp className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-center text-muted-foreground">{t('noInvestments')}</p>
          <p className="text-sm text-muted-foreground/75 mt-1">{t('startInvestingToday')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="worker-card">
      <div className="flex items-center space-x-2 mb-4">
        <TrendingUp className="w-5 h-5 text-trust-blue" />
        <h2 className="text-lg font-semibold text-primary">{t('investmentPortfolio')}</h2>
      </div>
        <InvestmentSummary
          totalInvestmentValue={totalInvestmentValue}
          totalCurrentValue={totalCurrentValue}
          totalGainLoss={totalGainLoss}
          gainLossPercentage={gainLossPercentage}
        />
      <InvestmentList investments={investments} />
    </div>
  );
};

export default InvestmentPortfolio;
