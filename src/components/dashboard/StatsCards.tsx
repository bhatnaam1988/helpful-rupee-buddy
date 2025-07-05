
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Target, TrendingUp } from "lucide-react";

interface StatsCardsProps {
  totalExpenses: number;
  totalGoalAmount: number;
  completedGoals: number;
  monthlyIncome: number;
}

const StatsCards = ({ totalExpenses, totalGoalAmount, completedGoals, monthlyIncome }: StatsCardsProps) => {
  return (
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
            ₹{monthlyIncome.toLocaleString('hi-IN')}
          </div>
          <p className="text-xs text-muted-foreground">प्रति माह</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
