
import DashboardHeader from "./DashboardHeader";
import ModernStatsCards from "./ModernStatsCards";
import ModernRecentItems from "./ModernRecentItems";

import { Expense } from "@/hooks/useExpenses";
import { Goal } from "@/hooks/useGoals";
import { Profile } from "@/hooks/useProfile";

interface DashboardContentProps {
  profile: Profile | null;
  expenses: Expense[];
  goals: Goal[];
  onSignOut: () => Promise<void>;
}

const DashboardContent = ({
  profile,
  expenses,
  goals,
  onSignOut
}: DashboardContentProps) => {
  console.log("DashboardContent rendering - Blue-collar Worker Theme");
  
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalGoalAmount = goals.reduce((sum, goal) => sum + goal.target_amount, 0);
  const completedGoals = goals.filter(goal => goal.current_amount >= goal.target_amount).length;

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-optimized container with blue-collar worker styling */}
      <div className="mobile-container space-y-8">
        
        {/* Header with blue-collar worker styling */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-trust-blue/5 to-prosperity-gold/5 rounded-3xl blur-xl"></div>
          <div className="relative z-10">
            <DashboardHeader 
              userName={profile?.name} 
              onSignOut={onSignOut} 
            />
          </div>
        </div>

        {/* Hero Stats Section with worker-friendly design */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-trust-blue/8 to-success-green/8 rounded-3xl blur-2xl"></div>
          <div className="relative z-10">
            <ModernStatsCards
              totalExpenses={totalExpenses}
              totalGoalAmount={totalGoalAmount}
              completedGoals={completedGoals}
              monthlyIncome={profile?.monthly_income || 0}
            />
          </div>
        </div>

        {/* Recent Items with consistent styling */}
        {expenses.length > 0 && (
          <div className="animate-fade-in relative">
            <div className="absolute inset-0 bg-gradient-to-r from-trust-blue/3 to-prosperity-gold/3 rounded-3xl blur-xl"></div>
            <div className="relative z-10">
              <ModernRecentItems expenses={expenses} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardContent;
