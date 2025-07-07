
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Expense } from "@/hooks/useExpenses";
import { useLanguage } from "@/hooks/useLanguage";
import { Calendar, IndianRupee } from "lucide-react";

interface RecentItemsProps {
  expenses: Expense[];
}

const RecentItems = ({ expenses }: RecentItemsProps) => {
  const { t, translateCategory } = useLanguage();

  // Only show recent expenses
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
    <Card className="shadow-sm border-gray-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold text-gray-800 flex items-center">
          <Calendar className="w-5 h-5 mr-2 text-blue-600" />
          {t('recentExpenses')}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {expenses.slice(0, 3).map((expense) => (
          <div key={expense.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 text-sm truncate">
                {translateCategory(expense.category)}
              </p>
              {expense.description && (
                <p className="text-xs text-gray-600 truncate mt-1">
                  {expense.description}
                </p>
              )}
              <p className="text-xs text-gray-500 mt-1">
                {formatDate(expense.expense_date)}
              </p>
            </div>
            <div className="flex items-center ml-3">
              <IndianRupee className="w-4 h-4 text-red-600" />
              <span className="font-bold text-red-600 text-sm">
                {expense.amount.toLocaleString('hi-IN')}
              </span>
            </div>
          </div>
        ))}
        
        {expenses.length > 3 && (
          <div className="text-center pt-2">
            <p className="text-xs text-gray-500">
              +{expenses.length - 3} {t('andMoreExpenses')}
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentItems;
