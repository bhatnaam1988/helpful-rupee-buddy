
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
  
  console.log("ModernStatsCards rendering with blue-collar worker theme");

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString(currentLanguage === 'hi' ? 'hi-IN' : 'en-IN');
  };

  const stats = [
    {
      title: t('totalExpenses'),
      value: totalExpenses,
      icon: Wallet,
      bgClass: 'bg-gradient-to-r from-error-red/10 to-error-red/5',
      iconClass: 'bg-gradient-to-r from-error-red to-error-red/80',
      textClass: 'text-error-red',
      subtitle: t('thisMonth')
    },
    {
      title: t('goalAmount'),
      value: totalGoalAmount,
      icon: Target,
      bgClass: 'bg-gradient-to-r from-prosperity-gold/10 to-prosperity-gold/5',
      iconClass: 'bg-gradient-to-r from-prosperity-gold to-prosperity-gold-light',
      textClass: 'text-prosperity-gold',
      subtitle: `${completedGoals} ${t('goalsCompleted')}`
    },
    {
      title: t('monthlyIncome'),
      value: monthlyIncome,
      icon: TrendingUp,
      bgClass: 'bg-gradient-to-r from-success-green/10 to-success-green/5',
      iconClass: 'bg-gradient-to-r from-success-green to-success-green-light',
      textClass: 'text-success-green',
      subtitle: t('perMonth')
    }
  ];

  return (
    <div className="relative z-10 space-y-4">
      {stats.map((stat, index) => (
        <Card 
          key={stat.title}
          className={`worker-card border-0 transition-all duration-300 animate-scale-in ${stat.bgClass}`}
          style={{ 
            animationDelay: `${index * 0.1}s`,
            boxShadow: 'var(--shadow-card)'
          }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium mb-1 text-neutral-600">
                  {stat.title}
                </p>
                <div className="flex items-center mb-2">
                  <IndianRupee className="w-5 h-5 mr-1 text-neutral-900" />
                  <span className={`text-2xl font-bold ${stat.textClass}`}>
                    {formatCurrency(stat.value)}
                  </span>
                </div>
                <p className="text-xs font-medium text-neutral-600">
                  {stat.subtitle}
                </p>
              </div>
              <div className={`p-4 rounded-2xl shadow-simple ${stat.iconClass}`}>
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
