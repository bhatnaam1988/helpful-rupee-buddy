
import { useEffect } from "react";
import { User, Menu, TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useAuth } from "@/hooks/useAuth";
import { useProfile } from "@/hooks/useProfile";
import { useExpenses } from "@/hooks/useExpenses";
import { useGoals } from "@/hooks/useGoals";
import { useNavigate } from "react-router-dom";
import AddExpenseModal from "@/components/AddExpenseModal";
import AddGoalModal from "@/components/AddGoalModal";
import AddIncomeModal from "@/components/AddIncomeModal";

const Index = () => {
  const { user, signOut } = useAuth();
  const { profile } = useProfile();
  const { expenses } = useExpenses();
  const { goals } = useGoals();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/auth");
    }
  }, [user, navigate]);

  if (!user) {
    return null;
  }

  const currentMonth = new Date().toLocaleDateString('hi-IN', { month: 'long', year: 'numeric' });
  
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const monthlyIncome = profile?.monthly_income || 0;
  const availableSurplus = monthlyIncome - totalExpenses;
  const surplusPercentage = monthlyIncome > 0 ? (availableSurplus / monthlyIncome) * 100 : 0;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('hi-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: string } = {
      "Food & Groceries": "🍽️",
      "Transport": "🚌",
      "Utilities": "💡",
      "Rent/Housing": "🏠",
      "Entertainment": "🎬",
      "Healthcare": "🏥",
      "Shopping": "🛍️",
      "Education": "📚",
      "Other": "📋"
    };
    return iconMap[category] || "📋";
  };

  const getGoalIcon = (goalName: string) => {
    if (goalName.toLowerCase().includes('emergency')) return "🛡️";
    if (goalName.toLowerCase().includes('education')) return "🎓";
    if (goalName.toLowerCase().includes('car')) return "🚗";
    if (goalName.toLowerCase().includes('house') || goalName.toLowerCase().includes('home')) return "🏠";
    return "🎯";
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center font-bold text-lg">
              ₹
            </div>
            <div>
              <h1 className="text-lg font-semibold">पैसावाइज़</h1>
              <p className="text-blue-100 text-sm">आपका वित्तीय साथी</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <Button variant="ghost" size="sm" onClick={signOut} className="text-white hover:text-blue-100">
              लॉगआउट
            </Button>
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            नमस्ते, {profile?.name || 'उपयोगकर्ता'}! 👋
          </h2>
          <p className="text-gray-600 text-sm">{currentMonth} का सारांश</p>
        </div>

        {/* Monthly Overview Card */}
        <Card className="mb-6 border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-gray-800">मासिक सारांश</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Income vs Expenses */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg border border-green-100">
                  <p className="text-sm text-green-600 mb-1">कुल आय</p>
                  <p className="text-lg font-semibold text-green-700">
                    {formatCurrency(monthlyIncome)}
                  </p>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg border border-red-100">
                  <p className="text-sm text-red-600 mb-1">कुल खर्च</p>
                  <p className="text-lg font-semibold text-red-700">
                    {formatCurrency(totalExpenses)}
                  </p>
                </div>
              </div>

              {/* Surplus/Deficit */}
              <div className={`text-center p-4 rounded-lg border ${
                availableSurplus >= 0 
                  ? 'bg-blue-50 border-blue-100' 
                  : 'bg-red-50 border-red-100'
              }`}>
                <p className={`text-sm mb-1 ${
                  availableSurplus >= 0 ? 'text-blue-600' : 'text-red-600'
                }`}>
                  निवेश के लिए उपलब्ध
                </p>
                <p className={`text-xl font-bold ${
                  availableSurplus >= 0 ? 'text-blue-700' : 'text-red-700'
                }`}>
                  {formatCurrency(Math.abs(availableSurplus))}
                </p>
                <div className="mt-2">
                  <Progress 
                    value={Math.max(0, surplusPercentage)} 
                    className="h-2"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    आय का {surplusPercentage.toFixed(1)}% उपलब्ध
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">त्वरित कार्य</h3>
          <div className="space-y-3">
            <AddIncomeModal />
            <div className="grid grid-cols-2 gap-3">
              <AddExpenseModal />
              <AddGoalModal />
            </div>
            <Button 
              size="lg" 
              variant="outline"
              className="w-full h-12 border-green-200 hover:bg-green-50"
            >
              <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-green-600">AI सुझाव देखें</span>
            </Button>
          </div>
        </div>

        {/* Goals Progress */}
        {goals.length > 0 && (
          <Card className="mb-6 border-0 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gray-800">आपके लक्ष्य</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {goals.slice(0, 3).map((goal) => {
                  const progressPercentage = (goal.current_amount / goal.target_amount) * 100;
                  return (
                    <div key={goal.id} className="border border-blue-100 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg">{getGoalIcon(goal.name)}</span>
                          <span className="font-medium text-blue-800">{goal.name}</span>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          goal.priority === 'High' 
                            ? 'bg-red-100 text-red-600' 
                            : goal.priority === 'Medium'
                            ? 'bg-yellow-100 text-yellow-600'
                            : 'bg-green-100 text-green-600'
                        }`}>
                          {goal.priority === 'High' ? 'उच्च' : goal.priority === 'Medium' ? 'मध्यम' : 'कम'}
                        </span>
                      </div>
                      <div className="mb-2">
                        <Progress value={progressPercentage} className="h-2" />
                      </div>
                      <div className="flex justify-between text-sm text-blue-600">
                        <span>{formatCurrency(goal.current_amount)}</span>
                        <span>{formatCurrency(goal.target_amount)}</span>
                      </div>
                      <p className="text-xs text-blue-500 mt-1">
                        {progressPercentage.toFixed(1)}% पूर्ण
                      </p>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Recent Expenses */}
        {expenses.length > 0 && (
          <Card className="border-0 shadow-md">
            <CardHeader className="pb-3">
              <CardTitle className="text-lg text-gray-800">हाल के खर्च</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {expenses.slice(0, 5).map((expense) => (
                  <div key={expense.id} className="flex items-center justify-between p-3 border border-red-100 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <span className="text-lg">{getCategoryIcon(expense.category)}</span>
                      <div>
                        <p className="font-medium text-red-800 text-sm">{expense.category}</p>
                        <p className="text-xs text-red-500">{new Date(expense.expense_date).toLocaleDateString('hi-IN')}</p>
                        {expense.description && (
                          <p className="text-xs text-red-400">{expense.description}</p>
                        )}
                      </div>
                    </div>
                    <p className="font-semibold text-red-700">
                      {formatCurrency(expense.amount)}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {expenses.length === 0 && goals.length === 0 && (
          <Card className="border-0 shadow-md text-center py-8">
            <CardContent>
              <div className="text-gray-500 mb-4">
                <h3 className="text-lg font-semibold mb-2">पैसावाइज़ में आपका स्वागत है!</h3>
                <p className="text-sm">पहले अपनी मासिक आय निर्धारित करें, फिर खर्च जोड़ें या वित्तीय लक्ष्य निर्धारित करें।</p>
              </div>
              <div className="space-y-3 max-w-md mx-auto">
                <AddIncomeModal />
                <div className="grid grid-cols-2 gap-3">
                  <AddExpenseModal />
                  <AddGoalModal />
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;
