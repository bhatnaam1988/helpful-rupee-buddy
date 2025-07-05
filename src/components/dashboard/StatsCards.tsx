
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
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t('totalExpenses')}</CardTitle>
          <Wallet className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">₹{formatCurrency(totalExpenses)}</div>
          <p className="text-xs text-muted-foreground">{t('thisMonth')}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t('goalAmount')}</CardTitle>
          <Target className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">₹{formatCurrency(totalGoalAmount)}</div>
          <p className="text-xs text-muted-foreground">{completedGoals} {t('goalsCompleted')}</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">{t('monthlyIncome')}</CardTitle>
          <TrendingUp className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            ₹{formatCurrency(monthlyIncome)}
          </div>
          <p className="text-xs text-muted-foreground">{t('perMonth')}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
