
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useInvestments } from "@/hooks/useInvestments";
import { useLanguage } from "@/hooks/useLanguage";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

const InvestmentPortfolio = () => {
  const { investments, loading } = useInvestments();
  const { t } = useLanguage();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('hi-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const totalInvestmentValue = investments.reduce((sum, inv) => sum + inv.amount, 0);
  const totalCurrentValue = investments.reduce((sum, inv) => sum + inv.current_value, 0);
  const totalGainLoss = totalCurrentValue - totalInvestmentValue;
  const gainLossPercentage = totalInvestmentValue > 0 ? ((totalGainLoss / totalInvestmentValue) * 100) : 0;

  const getInvestmentTypeIcon = (type: string) => {
    const iconMap: { [key: string]: string } = {
      "SIP": "📈",
      "Lump Sum": "💰",
      "FD": "🏦",
      "Stocks": "📊",
      "Bonds": "📋",
      "PPF": "🛡️",
      "EPF": "👥",
      "Other": "💼"
    };
    return iconMap[type] || "💼";
  };

  const getStatusTranslated = (status: string) => {
    const statusMap: { [key: string]: string } = {
      "Active": t('active'),
      "Matured": t('matured'),
      "Closed": t('closed')
    };
    return statusMap[status] || status;
  };

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
        {/* Portfolio Summary */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-600 mb-1">{t('totalInvestment')}</p>
            <p className="text-lg font-semibold text-blue-700">
              {formatCurrency(totalInvestmentValue)}
            </p>
          </div>
          <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-100">
            <p className="text-sm text-blue-600 mb-1">{t('currentValue')}</p>
            <p className="text-lg font-semibold text-blue-700">
              {formatCurrency(totalCurrentValue)}
            </p>
          </div>
        </div>

        {/* Gain/Loss Summary */}
        {totalCurrentValue > 0 && (
          <div className={`text-center p-4 rounded-lg border mb-6 ${
            totalGainLoss >= 0 
              ? 'bg-green-50 border-green-100' 
              : 'bg-red-50 border-red-100'
          }`}>
            <div className="flex items-center justify-center space-x-2 mb-2">
              {totalGainLoss >= 0 ? (
                <TrendingUp className="w-5 h-5 text-green-600" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-600" />
              )}
              <p className={`text-sm ${
                totalGainLoss >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {totalGainLoss >= 0 ? t('totalGain') : t('totalLoss')}
              </p>
            </div>
            <p className={`text-xl font-bold ${
              totalGainLoss >= 0 ? 'text-green-700' : 'text-red-700'
            }`}>
              {formatCurrency(Math.abs(totalGainLoss))}
            </p>
            <p className={`text-xs mt-1 ${
              totalGainLoss >= 0 ? 'text-green-500' : 'text-red-500'
            }`}>
              ({gainLossPercentage >= 0 ? '+' : ''}{gainLossPercentage.toFixed(2)}%)
            </p>
          </div>
        )}

        {/* Individual Investments */}
        <div className="space-y-3">
          <h4 className="font-semibold text-blue-800 mb-3">{t('yourInvestments')}</h4>
          {investments.slice(0, 5).map((investment) => {
            const individualGainLoss = investment.current_value - investment.amount;
            const individualGainLossPercentage = investment.amount > 0 ? ((individualGainLoss / investment.amount) * 100) : 0;
            
            return (
              <div key={investment.id} className="border border-blue-100 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getInvestmentTypeIcon(investment.investment_type)}</span>
                    <div>
                      <span className="font-medium text-blue-800 text-sm">{investment.instrument_name}</span>
                      <p className="text-xs text-blue-500">{investment.investment_type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-blue-700 text-sm">
                      {formatCurrency(investment.amount)}
                    </p>
                    {investment.current_value > 0 && (
                      <p className={`text-xs ${
                        individualGainLoss >= 0 ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {individualGainLoss >= 0 ? '+' : ''}{formatCurrency(individualGainLoss)}
                      </p>
                    )}
                  </div>
                </div>
                
                {investment.expected_return_rate && (
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-blue-600 mb-1">
                      <span>{t('expectedReturn')}</span>
                      <span>{investment.expected_return_rate}%</span>
                    </div>
                    <Progress value={Math.min(individualGainLossPercentage, investment.expected_return_rate)} className="h-1" />
                  </div>
                )}
                
                <div className="flex justify-between text-xs text-blue-500 mt-2">
                  <span>{new Date(investment.investment_date).toLocaleDateString('hi-IN')}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    investment.status === 'Active' 
                      ? 'bg-green-100 text-green-600' 
                      : investment.status === 'Matured'
                      ? 'bg-blue-100 text-blue-600'
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {getStatusTranslated(investment.status)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentPortfolio;
