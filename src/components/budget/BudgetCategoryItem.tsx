
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, CheckCircle } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface BudgetCategory {
  id: string;
  category_name: string;
  monthly_limit: number;
  current_spent: number;
}

interface BudgetCategoryItemProps {
  category: BudgetCategory;
}

const BudgetCategoryItem = ({ category }: BudgetCategoryItemProps) => {
  const { t } = useLanguage();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('hi-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: string } = {
      "Food & Groceries": "🍽️",
      "Transport": "🚌",
      "Utilities": "💡",
      "Rent/Housing": "🏠",
      "Entertainment": "🎬",
      "Healthcare": "🏥",
      "Shopping": "🛍️",
      "Education": "📚",
      "Other": "📋"
    };
    return iconMap[category] || "📋";
  };

  const getCategoryTranslated = (category: string) => {
    const translationMap: { [key: string]: string } = {
      "Food & Groceries": t('foodGroceries'),
      "Transport": t('transport'),
      "Utilities": t('utilities'),
      "Rent/Housing": t('rentHousing'),
      "Entertainment": t('entertainment'),
      "Healthcare": t('healthcare'),
      "Shopping": t('shopping'),
      "Education": t('education'),
      "Other": t('other')
    };
    return translationMap[category] || category;
  };

  const progressPercentage = (category.current_spent / category.monthly_limit) * 100;
  const remaining = category.monthly_limit - category.current_spent;

  return (
    <div className="border border-purple-100 rounded-lg p-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center space-x-2">
          <span className="text-lg">{getCategoryIcon(category.category_name)}</span>
          <span className="font-medium text-purple-800 text-sm">
            {getCategoryTranslated(category.category_name)}
          </span>
        </div>
        <div className="flex items-center space-x-2">
          {progressPercentage <= 80 ? (
            <CheckCircle className="w-4 h-4 text-green-600" />
          ) : progressPercentage <= 100 ? (
            <AlertTriangle className="w-4 h-4 text-yellow-600" />
          ) : (
            <AlertTriangle className="w-4 h-4 text-red-600" />
          )}
        </div>
      </div>
      
      <div className="mb-2">
        <Progress 
          value={Math.min(progressPercentage, 100)} 
          className={`h-2 ${
            progressPercentage > 100 ? '[&>div]:bg-red-500' : 
            progressPercentage > 80 ? '[&>div]:bg-yellow-500' : '[&>div]:bg-green-500'
          }`}
        />
      </div>
      
      <div className="flex justify-between text-xs text-purple-600 mb-1">
        <span>{t('spent')}: {formatCurrency(category.current_spent)}</span>
        <span>{t('limit')}: {formatCurrency(category.monthly_limit)}</span>
      </div>
      
      <div className="text-center">
        <span className={`text-xs font-medium ${
          remaining >= 0 ? 'text-green-600' : 'text-red-600'
        }`}>
          {remaining >= 0 
            ? `${formatCurrency(remaining)} ${t('remaining')}` 
            : `${formatCurrency(Math.abs(remaining))} ${t('exceeded')}`
          }
        </span>
      </div>
    </div>
  );
};

export default BudgetCategoryItem;
