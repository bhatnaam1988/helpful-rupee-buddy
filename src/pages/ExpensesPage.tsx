
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useExpenses } from "@/hooks/useExpenses";
import { useLanguage } from "@/hooks/useLanguage";
import { PlusCircle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

// Standard categories - stored in English in DB
const categories = [
  "Food & Groceries",
  "Transport",
  "Utilities",
  "Rent/Housing",
  "Entertainment",
  "Healthcare",
  "Shopping",
  "Education",
  "Other"
];

const ExpensesPage = () => {
  const { expenses, loading, addExpense, refetch } = useExpenses();
  const { t, translateCategory } = useLanguage();
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  
  const [newExpense, setNewExpense] = useState({
    category: "",
    amount: "",
    description: "",
    expense_date: new Date().toISOString().split('T')[0]
  });

  const handleAddExpense = async () => {
    if (!newExpense.category || !newExpense.amount) {
      toast({
        title: t('error'),
        description: t('fillAllFields'),
        variant: "destructive"
      });
      return;
    }

    await addExpense({
      category: newExpense.category,
      amount: parseFloat(newExpense.amount),
      description: newExpense.description,
      expense_date: newExpense.expense_date
    });

    setNewExpense({
      category: "",
      amount: "",
      description: "",
      expense_date: new Date().toISOString().split('T')[0]
    });
    setIsAddDialogOpen(false);
  };

  const handleDeleteExpense = async (expenseId: string) => {
    try {
      const { error } = await supabase
        .from('expenses')
        .delete()
        .eq('id', expenseId);

      if (error) {
        toast({
          title: t('error'),
          description: t('failedToDelete'),
          variant: "destructive"
        });
        return;
      }

      toast({
        title: t('success'),
        description: t('expenseDeleted')
      });
      
      refetch();
    } catch (error) {
      toast({
        title: t('error'),
        description: t('failedToDelete'),
        variant: "destructive"
      });
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('hi-IN');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">{t('loading')}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile-optimized layout */}
      <div className="worker-container space-y-4">
        {/* Mobile-first header with proper alignment */}
        <div className="space-y-3">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-primary">{t('expenseManagement')}</h1>
            <p className="text-muted-foreground text-sm mt-1">{t('manageExpenses')}</p>
          </div>
          
          {/* Mobile-optimized add button */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <button className="worker-button-primary w-full flex items-center justify-center">
                <PlusCircle className="w-5 h-5 mr-2" />
                {t('addExpense')}
              </button>
            </DialogTrigger>
            <DialogContent className="mx-4 max-w-sm">
              <DialogHeader>
                <DialogTitle>{t('addNewExpense')}</DialogTitle>
                <DialogDescription>{t('enterExpenseDetails')}</DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4">
                <div>
                  <Label htmlFor="category">{t('category')}</Label>
                  <Select value={newExpense.category} onValueChange={(value) => setNewExpense({...newExpense, category: value})}>
                    <SelectTrigger>
                      <SelectValue placeholder={t('selectCategory')} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {translateCategory(category)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="amount">{t('amount')}</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="0"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({...newExpense, amount: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="description">{t('description')}</Label>
                  <Input
                    id="description"
                    placeholder={t('optionalDescription')}
                    value={newExpense.description}
                    onChange={(e) => setNewExpense({...newExpense, description: e.target.value})}
                  />
                </div>
                
                <div>
                  <Label htmlFor="date">{t('date')}</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newExpense.expense_date}
                    onChange={(e) => setNewExpense({...newExpense, expense_date: e.target.value})}
                  />
                </div>
                
                <Button onClick={handleAddExpense} className="w-full h-12">
                  {t('addExpense')}
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        {/* Mobile-optimized expenses display */}
        <Card>
          <CardHeader className="text-center pb-4">
            <CardTitle className="text-lg">{t('allExpenses')}</CardTitle>
            <CardDescription className="text-base font-semibold">
              {t('totalExpenses')}: <span className="text-primary">₹{expenses.reduce((sum, expense) => sum + expense.amount, 0).toLocaleString('hi-IN')}</span>
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            {expenses.length === 0 ? (
              <div className="text-center py-8 px-4">
                <p className="text-gray-500">{t('noExpensesFound')}</p>
              </div>
            ) : (
              <div className="space-y-2">
                {/* Mobile-first: Card-based layout instead of table */}
                {expenses.map((expense) => (
                  <div key={expense.id} className="border-b last:border-b-0 p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900 text-left">
                            {translateCategory(expense.category)}
                          </h3>
                          <span className="text-lg font-bold text-red-600 ml-4">
                            ₹{expense.amount.toLocaleString('hi-IN')}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-gray-600">{formatDate(expense.expense_date)}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteExpense(expense.id)}
                            className="text-red-600 hover:text-red-700 p-1 h-auto ml-2"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                        {expense.description && (
                          <p className="text-sm text-gray-600 mt-2 text-left">
                            {expense.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ExpensesPage;
