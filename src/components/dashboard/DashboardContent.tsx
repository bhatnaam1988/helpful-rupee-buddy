
import DashboardHeader from "./DashboardHeader";
import ModernStatsCards from "./ModernStatsCards";
import ModernRecentItems from "./ModernRecentItems";
import TailwindClassForcer from "@/components/TailwindClassForcer";
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
  console.log("DashboardContent rendering - Modern Fintech Theme v2.0");
  
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalGoalAmount = goals.reduce((sum, goal) => sum + goal.target_amount, 0);
  const completedGoals = goals.filter(goal => goal.current_amount >= goal.target_amount).length;

  return (
    <div 
      className="min-h-screen"
      style={{ 
        background: 'linear-gradient(to bottom right, hsl(210 40% 98%), hsl(0 0% 100%), hsl(210 40% 98% / 50%))'
      }}
    >
      <TailwindClassForcer />
      {/* Modern container with proper fintech styling */}
      <div className="px-4 py-6 space-y-8 max-w-md mx-auto">
        
        {/* Header with modern fintech styling */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-fintech-primary/5 to-fintech-accent/5 rounded-3xl blur-xl"></div>
          <div className="relative z-10">
            <DashboardHeader 
              userName={profile?.name} 
              onSignOut={onSignOut} 
            />
          </div>
        </div>

        {/* Hero Stats Section with enhanced fintech design */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-fintech-primary/8 to-fintech-secondary/8 rounded-3xl blur-2xl"></div>
          <div className="relative z-10">
            <ModernStatsCards
              totalExpenses={totalExpenses}
              totalGoalAmount={totalGoalAmount}
              completedGoals={completedGoals}
              monthlyIncome={profile?.monthly_income || 0}
            />
          </div>
        </div>

        {/* Recent Items with modern fintech styling */}
        {expenses.length > 0 && (
          <div className="animate-fade-in relative">
            <div className="absolute inset-0 bg-gradient-to-r from-fintech-primary/3 to-fintech-accent/3 rounded-3xl blur-xl"></div>
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
