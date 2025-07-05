
import { useState } from "react";
import { PlusCircle, Target, TrendingUp, User, Menu } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

// Sample data - will be replaced with Supabase data later
const sampleUser = {
  name: "राज कुमार",
  monthlyIncome: 35000,
  location: "गुड़गांव, हरियाणा"
};

const sampleExpenses = [
  { category: "Food & Groceries", amount: 8000, date: "2024-01-15", icon: "🍽️" },
  { category: "Transport", amount: 3000, date: "2024-01-14", icon: "🚌" },
  { category: "Utilities", amount: 2500, date: "2024-01-13", icon: "💡" },
  { category: "Rent/Housing", amount: 12000, date: "2024-01-01", icon: "🏠" }
];

const sampleGoals = [
  {
    name: "Emergency Fund",
    targetAmount: 150000,
    currentAmount: 25000,
    priority: "High",
    icon: "🛡️"
  },
  {
    name: "Child Education",
    targetAmount: 500000,
    currentAmount: 50000,
    priority: "Medium",
    icon: "🎓"
  }
];

const Index = () => {
  const [currentMonth] = useState("January 2024");
  
  const totalExpenses = sampleExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const availableSurplus = sampleUser.monthlyIncome - totalExpenses;
  const surplusPercentage = (availableSurplus / sampleUser.monthlyIncome) * 100;

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
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
              <h1 className="text-lg font-semibold">PaisaWise</h1>
              <p className="text-blue-100 text-sm">आपका वित्तीय साथी</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <User className="w-5 h-5" />
            <Menu className="w-5 h-5" />
          </div>
        </div>
      </header>

      {/* Welcome Section */}
      <div className="p-4">
        <div className="mb-6">
          <h2 className="text-xl font-semibold text-gray-800 mb-1">
            नमस्ते, {sampleUser.name}! 👋
          </h2>
          <p className="text-gray-600 text-sm">{currentMonth} का सारांश</p>
        </div>

        {/* Monthly Overview Card */}
        <Card className="mb-6 border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-gray-800">Monthly Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Income vs Expenses */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg border border-green-100">
                  <p className="text-sm text-green-600 mb-1">Total Income</p>
                  <p className="text-lg font-semibold text-green-700">
                    {formatCurrency(sampleUser.monthlyIncome)}
                  </p>
                </div>
                <div className="text-center p-3 bg-orange-50 rounded-lg border border-orange-100">
                  <p className="text-sm text-orange-600 mb-1">Total Expenses</p>
                  <p className="text-lg font-semibold text-orange-700">
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
                  Available for Investment
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
                    {surplusPercentage.toFixed(1)}% of income available
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button 
              size="lg" 
              className="h-16 bg-blue-600 hover:bg-blue-700 flex flex-col items-center justify-center space-y-1"
            >
              <PlusCircle className="w-6 h-6" />
              <span className="text-sm">Add Expense</span>
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="h-16 border-blue-200 hover:bg-blue-50 flex flex-col items-center justify-center space-y-1"
            >
              <Target className="w-6 h-6 text-blue-600" />
              <span className="text-sm text-blue-600">Set Goal</span>
            </Button>
          </div>
          <Button 
            size="lg" 
            variant="outline"
            className="w-full mt-3 h-12 border-green-200 hover:bg-green-50"
          >
            <TrendingUp className="w-5 h-5 text-green-600 mr-2" />
            <span className="text-green-600">View AI Recommendations</span>
          </Button>
        </div>

        {/* Goals Progress */}
        <Card className="mb-6 border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-gray-800">Your Goals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {sampleGoals.map((goal, index) => {
                const progressPercentage = (goal.currentAmount / goal.targetAmount) * 100;
                return (
                  <div key={index} className="border border-gray-100 rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">{goal.icon}</span>
                        <span className="font-medium text-gray-800">{goal.name}</span>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        goal.priority === 'High' 
                          ? 'bg-red-100 text-red-600' 
                          : 'bg-yellow-100 text-yellow-600'
                      }`}>
                        {goal.priority}
                      </span>
                    </div>
                    <div className="mb-2">
                      <Progress value={progressPercentage} className="h-2" />
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <span>{formatCurrency(goal.currentAmount)}</span>
                      <span>{formatCurrency(goal.targetAmount)}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {progressPercentage.toFixed(1)}% complete
                    </p>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Recent Expenses */}
        <Card className="border-0 shadow-md">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg text-gray-800">Recent Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {sampleExpenses.map((expense, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-100 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <span className="text-lg">{expense.icon}</span>
                    <div>
                      <p className="font-medium text-gray-800 text-sm">{expense.category}</p>
                      <p className="text-xs text-gray-500">{expense.date}</p>
                    </div>
                  </div>
                  <p className="font-semibold text-gray-800">
                    {formatCurrency(expense.amount)}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
