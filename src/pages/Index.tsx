
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
  console.log("Index component rendered");
  
  const { user, signOut, loading: authLoading } = useAuth();
  console.log("Auth state:", { user: !!user, authLoading });
  
  const { shouldShowOnboarding, loading: onboardingLoading, completeOnboarding, skipOnboarding } = useOnboarding();
  console.log("Onboarding state:", { shouldShowOnboarding, onboardingLoading });
  
  const { expenses, loading: expensesLoading } = useExpenses();
  console.log("Expenses state:", { expensesCount: expenses.length, expensesLoading });
  
  const { goals, loading: goalsLoading } = useGoals();
  console.log("Goals state:", { goalsCount: goals.length, goalsLoading });
  
  const { profile, loading: profileLoading } = useProfile();
  console.log("Profile state:", { hasProfile: !!profile, profileLoading });
  
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [showGoalModal, setShowGoalModal] = useState(false);
  const [showIncomeModal, setShowIncomeModal] = useState(false);

  console.log("All loading states:", { 
    authLoading, 
    onboardingLoading, 
    expensesLoading, 
    goalsLoading, 
    profileLoading 
  });

  if (authLoading || onboardingLoading) {
    console.log("Showing loading screen due to:", { authLoading, onboardingLoading });
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
    console.log("No user found, redirecting to auth");
    return <Navigate to="/auth" replace />;
  }

  // Show onboarding if needed
  if (shouldShowOnboarding) {
    console.log("Showing onboarding");
    return (
      <OnboardingSplash 
        onComplete={completeOnboarding}
        onSkip={skipOnboarding}
      />
    );
  }

  const handleSignOut = async () => {
    console.log("Signing out user");
    await signOut();
  };

  console.log("Rendering main dashboard");
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
