import { useAuth } from "@/hooks/useAuth";
import { useOnboarding } from "@/hooks/useOnboarding";
import { Navigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useExpenses } from "@/hooks/useExpenses";
import { useGoals } from "@/hooks/useGoals";
import { useProfile } from "@/hooks/useProfile";
import { PlusCircle, Target, TrendingUp, Wallet, LogOut } from "lucide-react";
import AddExpenseModal from "@/components/AddExpenseModal";
import AddGoalModal from "@/components/AddGoalModal";
import AddIncomeModal from "@/components/AddIncomeModal";
import { useState } from "react";
import NavigationTabs from "@/components/NavigationTabs";
import OnboardingSplash from "@/components/OnboardingSplash";

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

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const totalGoalAmount = goals.reduce((sum, goal) => sum + goal.target_amount, 0);
  const completedGoals = goals.filter(goal => goal.current_amount >= goal.target_amount).length;

  const handleSignOut = async () => {
    await signOut();
  };

  const dashboardContent = (
    <div className="min-h-screen bg-slate-50 p-4 pb-20">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            नमस्ते, {profile?.name || 'उपयोगकर्ता'}!
          </h1>
          <p className="text-gray-600">आपका वित्तीय डैशबोर्ड</p>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleSignOut}
          className="flex items-center space-x-2"
        >
          <LogOut className="w-4 h-4" />
          <span>लॉग आउट</span>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">कुल खर्च</CardTitle>
            <Wallet className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">₹{totalExpenses.toLocaleString('hi-IN')}</div>
            <p className="text-xs text-muted-foreground">इस महीने</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">लक्ष्य राशि</CardTitle>
            <Target className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">₹{totalGoalAmount.toLocaleString('hi-IN')}</div>
            <p className="text-xs text-muted-foreground">{completedGoals} लक्ष्य पूर्ण</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">मासिक आय</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              ₹{(profile?.monthly_income || 0).toLocaleString('hi-IN')}
            </div>
            <p className="text-xs text-muted-foreground">प्रति माह</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">खर्च जोड़ें</CardTitle>
            <CardDescription>नया खर्च रिकॉर्ड करें</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setShowExpenseModal(true)}
              className="w-full"
            >
              <PlusCircle className="w-4 h-4 mr-2" />
              खर्च जोड़ें
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">लक्ष्य सेट करें</CardTitle>
            <CardDescription>वित्तीय लक्ष्य बनाएं</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setShowGoalModal(true)}
              className="w-full"
              variant="outline"
            >
              <Target className="w-4 h-4 mr-2" />
              लक्ष्य जोड़ें
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">आय अपडेट करें</CardTitle>
            <CardDescription>मासिक आय जोड़ें</CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setShowIncomeModal(true)}
              className="w-full"
              variant="secondary"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              आय जोड़ें
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent Expenses */}
      {expenses.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>हाल के खर्च</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {expenses.slice(0, 3).map((expense) => (
                <div key={expense.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">{expense.category}</p>
                    <p className="text-sm text-gray-600">{expense.description}</p>
                  </div>
                  <span className="font-bold text-red-600">₹{expense.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Goals */}
      {goals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>आपके लक्ष्य</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {goals.slice(0, 3).map((goal) => (
                <div key={goal.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">{goal.name}</p>
                    <p className="text-sm text-gray-600">
                      ₹{goal.current_amount} / ₹{goal.target_amount}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-blue-600">
                    {Math.round((goal.current_amount / goal.target_amount) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

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

  return (
    <NavigationTabs>
      {dashboardContent}
    </NavigationTabs>
  );
};

export default Index;
