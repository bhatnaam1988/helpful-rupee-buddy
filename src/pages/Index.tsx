
import { useAuth } from "@/hooks/useAuth";
import { useOnboarding } from "@/hooks/useOnboarding";
import { Navigate } from "react-router-dom";
import { useExpenses } from "@/hooks/useExpenses";
import { useGoals } from "@/hooks/useGoals";
import { useProfile } from "@/hooks/useProfile";
import { useState } from "react";
import NavigationTabs from "@/components/NavigationTabs";
import OnboardingSplash from "@/components/OnboardingSplash";
import DashboardContent from "@/components/dashboard/DashboardContent";

const Index = () => {
  const { user, signOut, loading: authLoading } = useAuth();
  const { shouldShowOnboarding, loading: onboardingLoading, completeOnboarding, skipOnboarding } = useOnboarding();
  const { expenses, loading: expensesLoading } = useExpenses();
  const { goals, loading: goalsLoading } = useGoals();
  const { profile, loading: profileLoading } = useProfile();
  
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showIncomeModal, setShowIncomeModal] = useState(false);

  if (authLoading || onboardingLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">लोड हो रहा है...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  // Show onboarding if needed
  if (shouldShowOnboarding) {
    return (
      <OnboardingSplash 
        onComplete={completeOnboarding}
        onSkip={skipOnboarding}
      />
    );
  }

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <NavigationTabs>
      <DashboardContent
        profile={profile}
        expenses={expenses}
        goals={goals}
        showExpenseModal={showExpenseModal}
        showGoalModal={showGoalModal}
        showIncomeModal={showIncomeModal}
        setShowExpenseModal={setShowExpenseModal}
        setShowGoalModal={setShowGoalModal}
        setShowIncomeModal={setShowIncomeModal}
        onSignOut={handleSignOut}
      />
    </NavigationTabs>
  );
};

export default Index;
