
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target } from "lucide-react";
import { useBudgetCategories } from "@/hooks/useBudgetCategories";
import { budgetCategorySchema } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";

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
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { addCategory } = useBudgetCategories();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    if (!categoryName || !monthlyLimit) {
      setErrors({ general: 'All fields are required' });
      return;
    }

    try {
      const validatedData = budgetCategorySchema.parse({
        category_name: categoryName,
        monthly_limit: parseFloat(monthlyLimit)
      });

      await addCategory({
        category_name: validatedData.category_name,
        monthly_limit: validatedData.monthly_limit
      });

      // Reset form
      setCategoryName("");
      setMonthlyLimit("");
      setOpen(false);
      toast({
        title: "Success",
        description: "Budget category added successfully"
      });
    } catch (error: any) {
      if (error.errors) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ general: 'Failed to add budget category' });
      }
      toast({
        title: "Error",
        description: "Please check your input and try again",
        variant: "destructive"
      });
    }
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
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="worker-input-group">
            <Label htmlFor="category_name" className="worker-label">श्रेणी</Label>
            <Select value={categoryName} onValueChange={setCategoryName} required>
              <SelectTrigger className="h-12">
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
          <div className="worker-input-group">
            <Label htmlFor="monthly_limit" className="worker-label">मासिक सीमा (₹)</Label>
            <Input
              id="monthly_limit"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={monthlyLimit}
              onChange={(e) => setMonthlyLimit(e.target.value)}
              required
              className="h-12"
            />
          </div>
          <div className="flex space-x-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)} className="flex-1">
              रद्द करें
            </Button>
            <button type="submit" className="worker-button-primary flex-1">
              बजट जोड़ें
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddBudgetModal;
