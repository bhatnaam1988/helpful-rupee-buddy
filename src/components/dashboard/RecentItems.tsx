
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Expense } from "@/hooks/useExpenses";
import { Goal } from "@/hooks/useGoals";

interface RecentItemsProps {
  expenses: Expense[];
  goals: Goal[];
}

const RecentItems = ({ expenses, goals }: RecentItemsProps) => {
  return (
    <>
      {/* Recent Expenses */}
      {expenses.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>हाल के खर्च</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {expenses.slice(0, 3).map((expense) => (
                <div key={expense.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">{expense.category}</p>
                    <p className="text-sm text-gray-600">{expense.description}</p>
                  </div>
                  <span className="font-bold text-red-600">₹{expense.amount}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Recent Goals */}
      {goals.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>आपके लक्ष्य</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {goals.slice(0, 3).map((goal) => (
                <div key={goal.id} className="flex justify-between items-center py-2 border-b last:border-b-0">
                  <div>
                    <p className="font-medium">{goal.name}</p>
                    <p className="text-sm text-gray-600">
                      ₹{goal.current_amount} / ₹{goal.target_amount}
                    </p>
                  </div>
                  <span className="text-sm font-medium text-blue-600">
                    {Math.round((goal.current_amount / goal.target_amount) * 100)}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
};

export default RecentItems;
