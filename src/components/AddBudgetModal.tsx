
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target } from "lucide-react";
import { useBudgetCategories } from "@/hooks/useBudgetCategories";

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

interface AddBudgetModalProps {
  children?: React.ReactNode;
}

const AddBudgetModal = ({ children }: AddBudgetModalProps) => {
  const [open, setOpen] = useState(false);
  const [categoryName, setCategoryName] = useState("");
  const [monthlyLimit, setMonthlyLimit] = useState("");
  const { addCategory } = useBudgetCategories();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!categoryName || !monthlyLimit) return;

    await addCategory({
      category_name: categoryName,
      monthly_limit: parseFloat(monthlyLimit)
    });

    // Reset form
    setCategoryName("");
    setMonthlyLimit("");
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button className="h-16 bg-purple-600 hover:bg-purple-700 flex flex-col items-center justify-center space-y-1">
            <Target className="w-6 h-6" />
            <span className="text-sm">बजट सेट करें</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>नई बजट श्रेणी जोड़ें</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="category_name">श्रेणी</Label>
            <Select value={categoryName} onValueChange={setCategoryName} required>
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
            <Label htmlFor="monthly_limit">मासिक सीमा (₹)</Label>
            <Input
              id="monthly_limit"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={monthlyLimit}
              onChange={(e) => setMonthlyLimit(e.target.value)}
              required
            />
          </div>
          <div className="flex space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              रद्द करें
            </Button>
            <Button type="submit" className="flex-1 bg-purple-600 hover:bg-purple-700">
              बजट जोड़ें
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBudgetModal;
