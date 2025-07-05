
import { TrendingUp, TrendingDown } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface InvestmentSummaryProps {
  totalInvestmentValue: number;
  totalCurrentValue: number;
  totalGainLoss: number;
  gainLossPercentage: number;
}

const InvestmentSummary = ({ 
  totalInvestmentValue, 
  totalCurrentValue, 
  totalGainLoss, 
  gainLossPercentage 
}: InvestmentSummaryProps) => {
  const { t } = useLanguage();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('hi-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <>
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
    </>
  );
};

export default InvestmentSummary;
