
import DashboardHeader from "./DashboardHeader";
import StatsCards from "./StatsCards";
import QuickActions from "./QuickActions";
import RecentItems from "./RecentItems";
import AddExpenseModal from "@/components/AddExpenseModal";
import AddGoalModal from "@/components/AddGoalModal";
import AddIncomeModal from "@/components/AddIncomeModal";
import { Expense } from "@/hooks/useExpenses";
import { Goal } from "@/hooks/useGoals";
import { Profile } from "@/hooks/useProfile";

interface DashboardContentProps {
  profile: Profile | null;
  expenses: Expense[];
  goals: Goal[];
  showExpenseModal: boolean;
  showGoalModal: boolean;
  showIncomeModal: boolean;
  setShowExpenseModal: (show: boolean) => void;
  setShowGoalModal: (show: boolean) => void;
  setShowIncomeModal: (show: boolean) => void;
  onSignOut: () => Promise<void>;
}

const DashboardContent = ({
  profile,
  expenses,
  goals,
  showExpenseModal,
  showGoalModal,
  showIncomeModal,
  setShowExpenseModal,
  setShowGoalModal,
  setShowIncomeModal,
  onSignOut
}: DashboardContentProps) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalGoalAmount = goals.reduce((sum, goal) => sum + goal.target_amount, 0);
  const completedGoals = goals.filter(goal => goal.current_amount >= goal.target_amount).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100">
      {/* Mobile-optimized container with better spacing */}
      <div className="px-4 py-5 space-y-6 max-w-md mx-auto">
        <DashboardHeader 
          userName={profile?.name} 
          onSignOut={onSignOut} 
        />

        <StatsCards
          totalExpenses={totalExpenses}
          totalGoalAmount={totalGoalAmount}
          completedGoals={completedGoals}
          monthlyIncome={profile?.monthly_income || 0}
        />

        <QuickActions
          onAddExpenseClick={() => setShowExpenseModal(true)}
          onAddGoalClick={() => setShowGoalModal(true)}
          onAddIncomeClick={() => setShowIncomeModal(true)}
        />

        {/* Only show recent items if there are expenses */}
        {expenses.length > 0 && (
          <RecentItems expenses={expenses} goals={goals} />
        )}
      </div>

      {/* Modals */}
      <AddExpenseModal
        open={showExpenseModal}
        onOpenChange={setShowExpenseModal}
      />
      
      <AddGoalModal
        open={showGoalModal}
        onOpenChange={setShowGoalModal}
      />
      
      <AddIncomeModal
        open={showIncomeModal}
        onOpenChange={setShowIncomeModal}
      />
    </div>
  );
};

export default DashboardContent;
