
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
    <div className="space-y-3">
      {/* Mobile-first: Full-width action cards for easy thumb access */}
      <Card className="shadow-sm">
        <CardContent className="p-4">
          <Button onClick={onAddExpenseClick} className="w-full h-14 text-lg font-medium bg-red-600 hover:bg-red-700">
            <PlusCircle className="w-6 h-6 mr-3" />
            {t('addExpense')}
          </Button>
          <p className="text-sm text-gray-600 mt-2 text-center">{t('recordNewExpense')}</p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <Card className="shadow-sm">
          <CardContent className="p-3">
            <Button onClick={onAddGoalClick} className="w-full h-12 text-sm" variant="outline">
              <Target className="w-5 h-5 mr-2" />
              {t('setGoal')}
            </Button>
            <p className="text-xs text-gray-600 mt-2 text-center leading-tight">{t('createFinancialGoal')}</p>
          </CardContent>
        </Card>

        <Card className="shadow-sm">
          <CardContent className="p-3">
            <Button onClick={onAddIncomeClick} className="w-full h-12 text-sm" variant="secondary">
              <TrendingUp className="w-5 h-5 mr-2" />
              {t('addIncome')}
            </Button>
            <p className="text-xs text-gray-600 mt-2 text-center leading-tight">{t('addMonthlyIncome')}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuickActions;
