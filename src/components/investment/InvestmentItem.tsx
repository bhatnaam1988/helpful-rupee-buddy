
import { Progress } from "@/components/ui/progress";
import { useLanguage } from "@/hooks/useLanguage";

interface Investment {
  id: string;
  investment_type: string;
  instrument_name: string;
  amount: number;
  current_value: number;
  investment_date: string;
  expected_return_rate?: number;
  status: string;
}

interface InvestmentItemProps {
  investment: Investment;
}

const InvestmentItem = ({ investment }: InvestmentItemProps) => {
  const { t } = useLanguage();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('hi-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

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

  const individualGainLoss = investment.current_value - investment.amount;
  const individualGainLossPercentage = investment.amount > 0 ? ((individualGainLoss / investment.amount) * 100) : 0;

  return (
    <div className="border border-blue-100 rounded-lg p-3">
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
};

export default InvestmentItem;
