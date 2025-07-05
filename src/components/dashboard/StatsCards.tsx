
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, Target, TrendingUp, IndianRupee } from "lucide-react";
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
    <div className="grid grid-cols-1 gap-4">
      {/* Total Expenses Card */}
      <Card className="bg-gradient-to-r from-red-50 to-red-100 border-red-200 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold text-red-800">{t('totalExpenses')}</CardTitle>
          <div className="p-2 bg-red-500 rounded-full">
            <Wallet className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <IndianRupee className="w-5 h-5 text-red-600 mr-1" />
            <span className="text-2xl font-bold text-red-700">{formatCurrency(totalExpenses)}</span>
          </div>
          <p className="text-xs text-red-600 mt-1 font-medium">{t('thisMonth')}</p>
        </CardContent>
      </Card>

      {/* Goal Amount Card */}
      <Card className="bg-gradient-to-r from-blue-50 to-blue-100 border-blue-200 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold text-blue-800">{t('goalAmount')}</CardTitle>
          <div className="p-2 bg-blue-500 rounded-full">
            <Target className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <IndianRupee className="w-5 h-5 text-blue-600 mr-1" />
            <span className="text-2xl font-bold text-blue-700">{formatCurrency(totalGoalAmount)}</span>
          </div>
          <p className="text-xs text-blue-600 mt-1 font-medium">
            {completedGoals} {t('goalsCompleted')}
          </p>
        </CardContent>
      </Card>

      {/* Monthly Income Card */}
      <Card className="bg-gradient-to-r from-green-50 to-green-100 border-green-200 shadow-sm">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-semibold text-green-800">{t('monthlyIncome')}</CardTitle>
          <div className="p-2 bg-green-500 rounded-full">
            <TrendingUp className="h-4 w-4 text-white" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <IndianRupee className="w-5 h-5 text-green-600 mr-1" />
            <span className="text-2xl font-bold text-green-700">{formatCurrency(monthlyIncome)}</span>
          </div>
          <p className="text-xs text-green-600 mt-1 font-medium">{t('perMonth')}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatsCards;
