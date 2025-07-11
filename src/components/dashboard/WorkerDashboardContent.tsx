import WorkerDashboardHeader from "./WorkerDashboardHeader";
import WorkerStatsCards from "./WorkerStatsCards";
import WorkerQuickActions from "./WorkerQuickActions";
import WorkerRecentItems from "./WorkerRecentItems";
import AddExpenseModal from "@/components/AddExpenseModal";
import AddGoalModal from "@/components/AddGoalModal";
import AddIncomeModal from "@/components/AddIncomeModal";
import { Expense } from "@/hooks/useExpenses";
import { Goal } from "@/hooks/useGoals";
import { Profile } from "@/hooks/useProfile";

interface WorkerDashboardContentProps {
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

const WorkerDashboardContent = ({
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
}: WorkerDashboardContentProps) => {
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalGoalAmount = goals.reduce((sum, goal) => sum + goal.target_amount, 0);
  const completedGoals = goals.filter(goal => goal.current_amount >= goal.target_amount).length;

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Mobile-first container */}
      <div className="mobile-container space-y-6 py-6">
        
        {/* Header */}
        <WorkerDashboardHeader 
          userName={profile?.name} 
          monthlyIncome={profile?.monthly_income || 0}
          onSignOut={onSignOut} 
        />

        {/* Stats Overview */}
        <WorkerStatsCards
          totalExpenses={totalExpenses}
          totalGoalAmount={totalGoalAmount}
          completedGoals={completedGoals}
          monthlyIncome={profile?.monthly_income || 0}
        />

        {/* Quick Actions */}
        <WorkerQuickActions
          onAddExpenseClick={() => setShowExpenseModal(true)}
          onAddGoalClick={() => setShowGoalModal(true)}
          onAddIncomeClick={() => setShowIncomeModal(true)}
        />

        {/* Recent Items */}
        {expenses.length > 0 && (
          <WorkerRecentItems expenses={expenses} />
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

export default WorkerDashboardContent;