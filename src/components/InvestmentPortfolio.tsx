
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
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-blue-800 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>{t('investmentPortfolio')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500">{t('loading')}</p>
        </CardContent>
      </Card>
    );
  }

  if (investments.length === 0) {
    return (
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-blue-800 flex items-center space-x-2">
            <TrendingUp className="w-5 h-5" />
            <span>{t('investmentPortfolio')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-center text-gray-500">{t('noInvestments')}</p>
            <p className="text-sm text-gray-400 mt-1">{t('startInvestingToday')}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg text-blue-800 flex items-center space-x-2">
          <TrendingUp className="w-5 h-5" />
          <span>{t('investmentPortfolio')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <InvestmentSummary
          totalInvestmentValue={totalInvestmentValue}
          totalCurrentValue={totalCurrentValue}
          totalGainLoss={totalGainLoss}
          gainLossPercentage={gainLossPercentage}
        />
        <InvestmentList investments={investments} />
      </CardContent>
    </Card>
  );
};

export default InvestmentPortfolio;
