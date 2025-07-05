
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface BudgetOverviewProps {
  totalBudget: number;
  totalSpent: number;
  overallProgress: number;
}

const BudgetOverview = ({ totalBudget, totalSpent, overallProgress }: BudgetOverviewProps) => {
  const { t } = useLanguage();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('hi-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-purple-600">{t('totalMonthlyBudget')}</span>
        <span className="font-semibold text-purple-700">{formatCurrency(totalBudget)}</span>
      </div>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-purple-600">{t('totalSpent')}</span>
        <span className="font-semibold text-purple-700">{formatCurrency(totalSpent)}</span>
      </div>
      <Progress value={overallProgress} className="h-2 mb-2" />
      <div className="flex items-center justify-center space-x-2">
        {overallProgress <= 80 ? (
          <CheckCircle className="w-4 h-4 text-green-600" />
        ) : overallProgress <= 100 ? (
          <AlertTriangle className="w-4 h-4 text-yellow-600" />
        ) : (
          <AlertTriangle className="w-4 h-4 text-red-600" />
        )}
        <span className={`text-xs font-medium ${
          overallProgress <= 80 ? 'text-green-600' : 
          overallProgress <= 100 ? 'text-yellow-600' : 'text-red-600'
        }`}>
          {overallProgress.toFixed(1)}% {t('usage')}
        </span>
      </div>
    </div>
  );
};

export default BudgetOverview;
