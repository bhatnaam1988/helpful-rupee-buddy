
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Target, TrendingUp } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface QuickActionsProps {
  onAddExpenseClick: () => void;
  onAddGoalClick: () => void;
  onAddIncomeClick: () => void;
}

const QuickActions = ({ onAddExpenseClick, onAddGoalClick, onAddIncomeClick }: QuickActionsProps) => {
  const { t } = useLanguage();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('addExpense')}</CardTitle>
          <CardDescription>{t('recordNewExpense')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onAddExpenseClick} className="w-full">
            <PlusCircle className="w-4 h-4 mr-2" />
            {t('addExpense')}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('setGoal')}</CardTitle>
          <CardDescription>{t('createFinancialGoal')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onAddGoalClick} className="w-full" variant="outline">
            <Target className="w-4 h-4 mr-2" />
            {t('addGoal')}
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">{t('updateIncome')}</CardTitle>
          <CardDescription>{t('addMonthlyIncome')}</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onAddIncomeClick} className="w-full" variant="secondary">
            <TrendingUp className="w-4 h-4 mr-2" />
            {t('addIncome')}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActions;
