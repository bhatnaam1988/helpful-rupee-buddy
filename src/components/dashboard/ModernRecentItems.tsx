
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Expense } from "@/hooks/useExpenses";
import { useLanguage } from "@/hooks/useLanguage";
import { Calendar, IndianRupee, Clock } from "lucide-react";

interface ModernRecentItemsProps {
  expenses: Expense[];
}

const ModernRecentItems = ({ expenses }: ModernRecentItemsProps) => {
  const { t, translateCategory } = useLanguage();

  if (expenses.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('hi-IN', { 
      day: 'numeric', 
      month: 'short' 
    });
  };

  return (
    <Card className="bg-white border-0 shadow-fintech rounded-3xl overflow-hidden">
      <CardHeader className="pb-4 bg-gradient-to-r from-fintech-surface to-white">
        <CardTitle className="text-lg font-bold text-fintech-text-primary flex items-center">
          <div className="p-2 bg-fintech-primary/10 rounded-xl mr-3">
            <Clock className="w-5 h-5 text-fintech-primary" />
          </div>
          {t('recentExpenses')}
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        {expenses.slice(0, 3).map((expense, index) => (
          <div 
            key={expense.id} 
            className="flex justify-between items-center p-4 bg-gradient-to-r from-fintech-surface to-white rounded-2xl border border-gray-100/50 hover:shadow-md transition-all duration-300"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center mb-2">
                <div className="w-3 h-3 bg-gradient-to-r from-fintech-primary to-fintech-primary-light rounded-full mr-3"></div>
                <p className="font-bold text-fintech-text-primary text-sm truncate">
                  {translateCategory(expense.category)}
                </p>
              </div>
              {expense.description && (
                <p className="text-xs text-fintech-text-secondary truncate mb-2 ml-6">
                  {expense.description}
                </p>
              )}
              <div className="flex items-center ml-6">
                <Calendar className="w-3 h-3 text-fintech-text-tertiary mr-1" />
                <p className="text-xs text-fintech-text-tertiary">
                  {formatDate(expense.expense_date)}
                </p>
              </div>
            </div>
            <div className="flex items-center ml-4 bg-gradient-to-r from-red-50 to-pink-50 px-3 py-2 rounded-xl">
              <IndianRupee className="w-4 h-4 text-red-600 mr-1" />
              <span className="font-bold text-red-600 text-sm">
                {expense.amount.toLocaleString('hi-IN')}
              </span>
            </div>
          </div>
        ))}
        
        {expenses.length > 3 && (
          <div className="text-center pt-4">
            <div className="inline-flex items-center px-4 py-2 bg-fintech-primary/5 rounded-full">
              <span className="text-xs text-fintech-primary font-medium">
                +{expenses.length - 3} {t('moreExpenses')}
              </span>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default ModernRecentItems;
