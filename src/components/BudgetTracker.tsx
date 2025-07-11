
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBudgetCategories } from "@/hooks/useBudgetCategories";
import { useLanguage } from "@/hooks/useLanguage";
import { Target } from "lucide-react";
import BudgetOverview from "./budget/BudgetOverview";
import BudgetCategoryItem from "./budget/BudgetCategoryItem";

const BudgetTracker = () => {
  const { categories, loading } = useBudgetCategories();
  const { t } = useLanguage();

  const totalBudget = categories.reduce((sum, cat) => sum + cat.monthly_limit, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.current_spent, 0);
  const overallProgress = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  if (loading) {
    return (
      <div className="worker-card">
        <div className="flex items-center space-x-2 mb-4">
          <Target className="w-5 h-5 text-success-green" />
          <h2 className="text-lg font-semibold text-primary">{t('budgetTracker')}</h2>
        </div>
        <p className="text-center text-muted-foreground">{t('loading')}</p>
      </div>
    );
  }

  if (categories.length === 0) {
    return (
      <div className="worker-card">
        <div className="flex items-center space-x-2 mb-4">
          <Target className="w-5 h-5 text-success-green" />
          <h2 className="text-lg font-semibold text-primary">{t('budgetTracker')}</h2>
        </div>
        <div className="text-center py-8">
          <Target className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
          <p className="text-center text-muted-foreground">{t('noBudgetSet')}</p>
          <p className="text-sm text-muted-foreground/75 mt-1">{t('setBudgetFirst')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="worker-card">
      <div className="flex items-center space-x-2 mb-4">
        <Target className="w-5 h-5 text-success-green" />
        <h2 className="text-lg font-semibold text-primary">{t('budgetTracker')}</h2>
      </div>
      <BudgetOverview
        totalBudget={totalBudget}
        totalSpent={totalSpent}
        overallProgress={overallProgress}
      />

      <div className="space-y-4">
        <h4 className="font-semibold text-success-green mb-3">{t('categoryWiseBudget')}</h4>
          {categories.map((category) => (
            <BudgetCategoryItem key={category.id} category={category} />
          ))}
        </div>
    </div>
  );
};

export default BudgetTracker;
