
import { Card, CardContent } from "@/components/ui/card";
import { Wallet, Target, TrendingUp, IndianRupee } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface ModernStatsCardsProps {
  totalExpenses: number;
  totalGoalAmount: number;
  completedGoals: number;
  monthlyIncome: number;
}

const ModernStatsCards = ({ 
  totalExpenses, 
  totalGoalAmount, 
  completedGoals, 
  monthlyIncome 
}: ModernStatsCardsProps) => {
  const { t, currentLanguage } = useLanguage();
  
  console.log("ModernStatsCards rendering with fintech theme");

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString(currentLanguage === 'hi' ? 'hi-IN' : 'en-IN');
  };

  const stats = [
    {
      title: t('totalExpenses'),
      value: totalExpenses,
      icon: Wallet,
      gradient: 'from-red-500 to-pink-500',
      bgGradient: 'from-red-50 to-pink-50',
      iconBg: 'bg-gradient-to-r from-red-500 to-pink-500',
      textColor: 'text-red-700',
      subtitle: t('thisMonth')
    },
    {
      title: t('goalAmount'),
      value: totalGoalAmount,
      icon: Target,
      gradient: 'from-fintech-primary to-fintech-primary-light',
      bgGradient: 'from-blue-50 to-purple-50',
      iconBg: 'bg-gradient-to-r from-fintech-primary to-fintech-primary-light',
      textColor: 'text-fintech-primary',
      subtitle: `${completedGoals} ${t('goalsCompleted')}`
    },
    {
      title: t('monthlyIncome'),
      value: monthlyIncome,
      icon: TrendingUp,
      gradient: 'from-fintech-secondary to-fintech-secondary-light',
      bgGradient: 'from-green-50 to-emerald-50',
      iconBg: 'bg-gradient-to-r from-fintech-secondary to-fintech-secondary-light',
      textColor: 'text-fintech-secondary',
      subtitle: t('perMonth')
    }
  ];

  return (
    <div className="relative z-10 space-y-4 debug-stats-cards">
      {stats.map((stat, index) => (
        <Card 
          key={stat.title}
          className={`bg-gradient-to-r ${stat.bgGradient} border-0 shadow-fintech hover:shadow-fintech-lg transition-all duration-300 animate-scale-in`}
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium text-fintech-text-secondary mb-1">
                  {stat.title}
                </p>
                <div className="flex items-center mb-2">
                  <IndianRupee className="w-5 h-5 text-fintech-text-primary mr-1" />
                  <span className={`text-2xl font-bold ${stat.textColor}`}>
                    {formatCurrency(stat.value)}
                  </span>
                </div>
                <p className="text-xs font-medium text-fintech-text-tertiary">
                  {stat.subtitle}
                </p>
              </div>
              <div className={`p-4 rounded-2xl ${stat.iconBg} shadow-lg`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ModernStatsCards;
