
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useBudgetCategories } from "@/hooks/useBudgetCategories";
import { useLanguage } from "@/hooks/useLanguage";
import { AlertTriangle, CheckCircle, Target } from "lucide-react";

const BudgetTracker = () => {
  const { categories, loading } = useBudgetCategories();
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

  const totalBudget = categories.reduce((sum, cat) => sum + cat.monthly_limit, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.current_spent, 0);
  const overallProgress = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  if (loading) {
    return (
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-purple-800">{t('budgetTracker')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500">{t('loading')}</p>
        </CardContent>
      </Card>
    );
  }

  if (categories.length === 0) {
    return (
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-purple-800">{t('budgetTracker')}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500">{t('noBudgetSet')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg text-purple-800">{t('budgetTracker')}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Overall Budget Summary */}
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

        {/* Individual Categories */}
        <div className="space-y-4">
          <h4 className="font-semibold text-purple-800 mb-3">{t('categoryWiseBudget')}</h4>
          {categories.map((category) => {
            const progressPercentage = (category.current_spent / category.monthly_limit) * 100;
            const remaining = category.monthly_limit - category.current_spent;
            
            return (
              <div key={category.id} className="border border-purple-100 rounded-lg p-3">
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
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetTracker;
