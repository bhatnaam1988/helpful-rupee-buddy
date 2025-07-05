
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PlusCircle } from "lucide-react";
import { useExpenses } from "@/hooks/useExpenses";

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

const categoryHindi = {
  "Food & Groceries": "भोजन और किराना",
  "Transport": "परिवहन",
  "Utilities": "उपयोगिताएं",
  "Rent/Housing": "किराया/आवास",
  "Entertainment": "मनोरंजन",
  "Healthcare": "स्वास्थ्य सेवा",
  "Shopping": "खरीदारी",
  "Education": "शिक्षा",
  "Other": "अन्य"
};

interface AddExpenseModalProps {
  children?: React.ReactNode;
}

const AddExpenseModal = ({ children }: AddExpenseModalProps) => {
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const { addExpense } = useExpenses();

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
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="h-16 bg-red-600 hover:bg-red-700 flex flex-col items-center justify-center space-y-1">
            <PlusCircle className="w-6 h-6" />
            <span className="text-sm">खर्च जोड़ें</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>नया खर्च जोड़ें</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="category">श्रेणी</Label>
            <Select value={category} onValueChange={setCategory} required>
              <SelectTrigger>
                <SelectValue placeholder="श्रेणी चुनें" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {categoryHindi[cat as keyof typeof categoryHindi]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="amount">राशि (₹)</Label>
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
            <Label htmlFor="date">तारीख</Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">विवरण (वैकल्पिक)</Label>
            <Input
              id="description"
              placeholder="यह खर्च किस लिए था?"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div className="flex space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              रद्द करें
            </Button>
            <Button type="submit" className="flex-1 bg-red-600 hover:bg-red-700">
              खर्च जोड़ें
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddExpenseModal;
