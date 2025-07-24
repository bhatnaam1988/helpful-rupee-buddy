import WorkerDashboardHeader from "./WorkerDashboardHeader";
import WorkerStatsCards from "./WorkerStatsCards";
import WorkerRecentItems from "./WorkerRecentItems";
import { Expense } from "@/hooks/useExpenses";
import { Goal } from "@/hooks/useGoals";
import { Profile } from "@/hooks/useProfile";

interface WorkerDashboardContentProps {
  profile: Profile | null;
  expenses: Expense[];
  goals: Goal[];
  onSignOut: () => Promise<void>;
}

const WorkerDashboardContent = ({
  profile,
  expenses,
  goals,
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

        {/* Recent Items */}
        {expenses.length > 0 && (
          <WorkerRecentItems expenses={expenses} />
        )}
      </div>
    </div>
  );
};

export default WorkerDashboardContent;