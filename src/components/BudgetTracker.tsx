
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
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-purple-800 flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>{t('budgetTracker')}</span>
          </CardTitle>
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
          <CardTitle className="text-lg text-purple-800 flex items-center space-x-2">
            <Target className="w-5 h-5" />
            <span>{t('budgetTracker')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-center text-gray-500">{t('noBudgetSet')}</p>
            <p className="text-sm text-gray-400 mt-1">{t('setBudgetFirst')}</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg text-purple-800 flex items-center space-x-2">
          <Target className="w-5 h-5" />
          <span>{t('budgetTracker')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <BudgetOverview
          totalBudget={totalBudget}
          totalSpent={totalSpent}
          overallProgress={overallProgress}
        />

        <div className="space-y-4">
          <h4 className="font-semibold text-purple-800 mb-3">{t('categoryWiseBudget')}</h4>
          {categories.map((category) => (
            <BudgetCategoryItem key={category.id} category={category} />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetTracker;
