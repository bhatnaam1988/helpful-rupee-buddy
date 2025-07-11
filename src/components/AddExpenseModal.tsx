
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { useExpenses } from "@/hooks/useExpenses";
import { useLanguage } from "@/hooks/useLanguage";

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

interface AddExpenseModalProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AddExpenseModal = ({ children, open, onOpenChange }: AddExpenseModalProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const { addExpense } = useExpenses();
  const { t, translateCategory } = useLanguage();

  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!category || !amount) return;

    await addExpense({
      category,
      amount: parseFloat(amount),
      description: description || undefined,
      expense_date: date
    });

    // Reset form
    setCategory("");
    setAmount("");
    setDescription("");
    setDate(new Date().toISOString().split('T')[0]);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="h-16 bg-red-600 hover:bg-red-700 flex flex-col items-center justify-center space-y-1">
            <PlusCircle className="w-6 h-6" />
            <span className="text-sm">{t('addExpense')}</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('addNewExpense')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="category">{t('category')}</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder={t('selectCategory')} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {translateCategory(cat)}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="amount">{t('amount')} (₹)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="date">{t('date')}</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">{t('description')} ({t('optionalDescription')})</Label>
            <Input
              id="description"
              placeholder={t('optionalDescription')}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <button type="button" className="worker-button-secondary flex-1" onClick={() => setIsOpen(false)}>
              {t('cancel')}
            </button>
            <button type="submit" className="worker-button-primary flex-1">
              {t('addExpense')}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseModal;
