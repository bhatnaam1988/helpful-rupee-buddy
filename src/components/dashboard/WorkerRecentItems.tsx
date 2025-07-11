import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { Expense } from "@/hooks/useExpenses";
import { Receipt, Calendar } from "lucide-react";
import { format } from "date-fns";

interface WorkerRecentItemsProps {
  expenses: Expense[];
}

const WorkerRecentItems = ({ expenses }: WorkerRecentItemsProps) => {
  const { t, currentLanguage, translateCategory } = useLanguage();
  
  const recentExpenses = expenses.slice(0, 5);

  // Category icon mapping for blue-collar worker categories
  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: string } = {
      'Food & Groceries': '🍛',
      'Transport': '🚗',
      'Utilities': '⚡',
      'Rent/Housing': '🏠',
      'Healthcare': '💊',
      'Education': '📚',
      'Entertainment': '🎬',
      'Clothing': '👕',
      'Mobile/Internet': '📱',
      'Others': '📝'
    };
    return iconMap[category] || '📝';
  };

  return (
    <Card className="worker-card">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg flex items-center space-x-2">
          <Receipt className="w-5 h-5 text-trust-blue" />
          <span>{currentLanguage === 'hi' ? 'हाल के खर्च' : 'Recent Expenses'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentExpenses.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Receipt className="w-8 h-8 text-neutral-400" />
            </div>
            <p className="text-neutral-600 text-base">
              {currentLanguage === 'hi' 
                ? 'अभी तक कोई खर्च नहीं दर्ज किया गया'
                : 'No expenses recorded yet'
              }
            </p>
            <p className="text-sm text-neutral-500 mt-1">
              {currentLanguage === 'hi'
                ? 'ऊपर + बटन दबाकर खर्च जोड़ें'
                : 'Tap the + button above to add expenses'
              }
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {recentExpenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-3 bg-neutral-50 rounded-xl">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">
                    {getCategoryIcon(expense.category)}
                  </div>
                  <div>
                    <p className="font-medium text-neutral-900">
                      {translateCategory(expense.category)}
                    </p>
                    {expense.description && (
                      <p className="text-sm text-neutral-600">{expense.description}</p>
                    )}
                    <div className="flex items-center space-x-1 text-xs text-neutral-500 mt-1">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {format(new Date(expense.expense_date), 'dd MMM')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-error-red text-lg">
                    -₹{expense.amount.toLocaleString('en-IN')}
                  </p>
                </div>
              </div>
            ))}
            
            {expenses.length > 5 && (
              <div className="text-center pt-2">
                <p className="text-sm text-trust-blue font-medium">
                  +{expenses.length - 5} {currentLanguage === 'hi' ? 'और खर्च' : 'more expenses'}
                </p>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WorkerRecentItems;