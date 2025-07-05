
import { Card, CardContent } from "@/components/ui/card";
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
    <div className="space-y-4">
      {/* Primary Action - Add Expense (Most important for daily use) */}
      <Card className="bg-gradient-to-r from-red-500 to-red-600 border-0 shadow-lg">
        <CardContent className="p-4">
          <Button 
            onClick={onAddExpenseClick} 
            className="w-full h-16 text-lg font-semibold bg-white text-red-600 hover:bg-red-50 border-0 shadow-sm"
          >
            <PlusCircle className="w-6 h-6 mr-3" />
            {t('addExpense')}
          </Button>
          <p className="text-white/90 text-sm mt-3 text-center font-medium">
            {t('recordNewExpense')}
          </p>
        </CardContent>
      </Card>

      {/* Secondary Actions Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-blue-500 to-blue-600 border-0 shadow-md">
          <CardContent className="p-4">
            <Button 
              onClick={onAddGoalClick} 
              className="w-full h-14 text-sm font-semibold bg-white text-blue-600 hover:bg-blue-50 border-0"
            >
              <Target className="w-5 h-5 mr-2" />
              {t('setGoal')}
            </Button>
            <p className="text-white/90 text-xs mt-2 text-center leading-tight">
              {t('createFinancialGoal')}
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-500 to-green-600 border-0 shadow-md">
          <CardContent className="p-4">
            <Button 
              onClick={onAddIncomeClick} 
              className="w-full h-14 text-sm font-semibold bg-white text-green-600 hover:bg-green-50 border-0"
            >
              <TrendingUp className="w-5 h-5 mr-2" />
              {t('addIncome')}
            </Button>
            <p className="text-white/90 text-xs mt-2 text-center leading-tight">
              {t('addMonthlyIncome')}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QuickActions;
