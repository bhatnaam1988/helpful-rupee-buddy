
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
      bgStyle: { background: 'linear-gradient(to right, hsl(0 84% 60%), hsl(336 84% 70%))' },
      iconStyle: { background: 'linear-gradient(to right, hsl(0 84% 60%), hsl(336 84% 70%))' },
      textStyle: { color: 'hsl(0 73% 41%)' },
      subtitle: t('thisMonth')
    },
    {
      title: t('goalAmount'),
      value: totalGoalAmount,
      icon: Target,
      bgStyle: { background: 'linear-gradient(to right, hsl(248 78% 95%), hsl(253 91% 95%))' },
      iconStyle: { background: 'linear-gradient(to right, hsl(248 78% 62%), hsl(253 91% 68%))' },
      textStyle: { color: 'hsl(248 78% 62%)' },
      subtitle: `${completedGoals} ${t('goalsCompleted')}`
    },
    {
      title: t('monthlyIncome'),
      value: monthlyIncome,
      icon: TrendingUp,
      bgStyle: { background: 'linear-gradient(to right, hsl(158 64% 95%), hsl(158 64% 92%))' },
      iconStyle: { background: 'linear-gradient(to right, hsl(158 64% 52%), hsl(158 64% 62%))' },
      textStyle: { color: 'hsl(158 64% 52%)' },
      subtitle: t('perMonth')
    }
  ];

  return (
    <div className="relative z-10 space-y-4 debug-stats-cards">
      {stats.map((stat, index) => (
        <Card 
          key={stat.title}
          className="border-0 transition-all duration-300 animate-scale-in"
          style={{ 
            animationDelay: `${index * 0.1}s`,
            ...stat.bgStyle,
            boxShadow: '0 4px 20px -2px rgba(99, 102, 241, 0.1)'
          }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm font-medium mb-1" style={{ color: 'hsl(215 20% 55%)' }}>
                  {stat.title}
                </p>
                <div className="flex items-center mb-2">
                  <IndianRupee className="w-5 h-5 mr-1" style={{ color: 'hsl(220 26% 14%)' }} />
                  <span className="text-2xl font-bold" style={stat.textStyle}>
                    {formatCurrency(stat.value)}
                  </span>
                </div>
                <p className="text-xs font-medium" style={{ color: 'hsl(215 20% 65%)' }}>
                  {stat.subtitle}
                </p>
              </div>
              <div className="p-4 rounded-2xl shadow-lg" style={stat.iconStyle}>
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
