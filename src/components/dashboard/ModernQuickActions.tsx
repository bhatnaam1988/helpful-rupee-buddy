
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Target, TrendingUp, Sparkles } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface ModernQuickActionsProps {
  onAddExpenseClick: () => void;
  onAddGoalClick: () => void;
  onAddIncomeClick: () => void;
}

const ModernQuickActions = ({ 
  onAddExpenseClick, 
  onAddGoalClick, 
  onAddIncomeClick 
}: ModernQuickActionsProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-6">
      {/* Primary Action - Expense (Most used feature) */}
      <Card className="bg-gradient-to-r from-fintech-accent to-fintech-accent-light border-0 shadow-fintech-lg overflow-hidden relative">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-white/20 rounded-full mr-3">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-white/90 font-medium text-sm">Most Used</span>
          </div>
          <Button 
            onClick={onAddExpenseClick} 
            className="w-full h-16 text-lg font-bold bg-white text-fintech-accent hover:bg-white/95 border-0 shadow-xl rounded-2xl transition-all duration-300 hover:scale-105"
          >
            <PlusCircle className="w-6 h-6 mr-3" />
            {t('addExpense')}
          </Button>
          <p className="text-white/80 text-sm mt-4 text-center font-medium">
            {t('recordNewExpense')}
          </p>
        </CardContent>
      </Card>

      {/* Secondary Actions Grid - More compact and modern */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-fintech-primary to-fintech-primary-light border-0 shadow-fintech hover:shadow-fintech-lg transition-all duration-300 hover:scale-105">
          <CardContent className="p-5">
            <div className="text-center">
              <div className="inline-flex p-3 bg-white/20 rounded-2xl mb-4">
                <Target className="w-6 h-6 text-white" />
              </div>
              <Button 
                onClick={onAddGoalClick} 
                className="w-full h-12 text-sm font-bold bg-white text-fintech-primary hover:bg-white/95 border-0 rounded-xl mb-3"
              >
                {t('setGoal')}
              </Button>
              <p className="text-white/80 text-xs leading-tight">
                {t('createFinancialGoal')}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-fintech-secondary to-fintech-secondary-light border-0 shadow-success hover:shadow-fintech-lg transition-all duration-300 hover:scale-105">
          <CardContent className="p-5">
            <div className="text-center">
              <div className="inline-flex p-3 bg-white/20 rounded-2xl mb-4">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <Button 
                onClick={onAddIncomeClick} 
                className="w-full h-12 text-sm font-bold bg-white text-fintech-secondary hover:bg-white/95 border-0 rounded-xl mb-3"
              >
                {t('addIncome')}
              </Button>
              <p className="text-white/80 text-xs leading-tight">
                {t('addMonthlyIncome')}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ModernQuickActions;
