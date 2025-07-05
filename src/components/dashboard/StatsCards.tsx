
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Target, TrendingUp } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface StatsCardsProps {
  totalExpenses: number;
  totalGoalAmount: number;
  completedGoals: number;
  monthlyIncome: number;
}

const StatsCards = ({ totalExpenses, totalGoalAmount, completedGoals, monthlyIncome }: StatsCardsProps) => {
  const { t, currentLanguage } = useLanguage();

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString(currentLanguage === 'hi' ? 'hi-IN' : 'en-IN');
  };

  return (
    <div className="grid grid-cols-1 gap-3">
      {/* Mobile-first: Stack cards vertically for better readability */}
      <Card className="border-l-4 border-l-red-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">{t('totalExpenses')}</CardTitle>
          <Wallet className="h-5 w-5 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">₹{formatCurrency(totalExpenses)}</div>
          <p className="text-xs text-muted-foreground mt-1">{t('thisMonth')}</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-blue-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">{t('goalAmount')}</CardTitle>
          <Target className="h-5 w-5 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">₹{formatCurrency(totalGoalAmount)}</div>
          <p className="text-xs text-muted-foreground mt-1">{completedGoals} {t('goalsCompleted')}</p>
        </CardContent>
      </Card>

      <Card className="border-l-4 border-l-green-500">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">{t('monthlyIncome')}</CardTitle>
          <TrendingUp className="h-5 w-5 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            ₹{formatCurrency(monthlyIncome)}
          </div>
          <p className="text-xs text-muted-foreground mt-1">{t('perMonth')}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
