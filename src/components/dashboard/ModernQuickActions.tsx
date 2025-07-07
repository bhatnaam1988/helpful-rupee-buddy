
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
      {/* Primary Action - Add Expense with premium fintech design */}
      <Card className="bg-gradient-to-r from-fintech-accent to-fintech-accent-light border-0 shadow-fintech-lg overflow-hidden relative group hover:shadow-2xl transition-all duration-500">
        <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
        <CardContent className="p-6 relative z-10">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-white/20 rounded-full mr-3 group-hover:scale-110 transition-transform duration-300">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-white/90 font-medium text-sm">Most Used</span>
          </div>
          <Button 
            onClick={onAddExpenseClick} 
            className="w-full h-16 text-lg font-bold bg-white text-fintech-accent hover:bg-white/95 border-0 shadow-xl rounded-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <PlusCircle className="w-6 h-6 mr-3" />
            {t('addExpense')}
          </Button>
          <p className="text-white/80 text-sm mt-4 text-center font-medium">
            {t('recordNewExpense')}
          </p>
        </CardContent>
      </Card>

      {/* Secondary Actions Grid with enhanced fintech design */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-gradient-to-br from-fintech-primary to-fintech-primary-light border-0 shadow-fintech hover:shadow-fintech-lg transition-all duration-300 hover:scale-105 group overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-10 translate-x-10"></div>
          <CardContent className="p-5 relative z-10">
            <div className="text-center">
              <div className="inline-flex p-3 bg-white/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <Target className="w-6 h-6 text-white" />
              </div>
              <Button 
                onClick={onAddGoalClick} 
                className="w-full h-12 text-sm font-bold bg-white text-fintech-primary hover:bg-white/95 border-0 rounded-xl mb-3 hover:scale-105 transition-all duration-300"
              >
                {t('setGoal')}
              </Button>
              <p className="text-white/80 text-xs leading-tight">
                {t('createFinancialGoal')}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-fintech-secondary to-fintech-secondary-light border-0 shadow-success hover:shadow-fintech-lg transition-all duration-300 hover:scale-105 group overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="absolute top-0 right-0 w-20 h-20 bg-white/5 rounded-full -translate-y-10 translate-x-10"></div>
          <CardContent className="p-5 relative z-10">
            <div className="text-center">
              <div className="inline-flex p-3 bg-white/20 rounded-2xl mb-4 group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <Button 
                onClick={onAddIncomeClick} 
                className="w-full h-12 text-sm font-bold bg-white text-fintech-secondary hover:bg-white/95 border-0 rounded-xl mb-3 hover:scale-105 transition-all duration-300"
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
