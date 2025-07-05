
import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProfile } from "@/hooks/useProfile";
import { useLanguage } from "@/hooks/useLanguage";

interface AddIncomeModalProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AddIncomeModal = ({ children, open, onOpenChange }: AddIncomeModalProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [income, setIncome] = useState("");
  const { updateProfile } = useProfile();
  const { t } = useLanguage();

  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!income || parseFloat(income) <= 0) {
      return;
    }

    await updateProfile({
      monthly_income: parseFloat(income)
    });

    setIncome("");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button 
            size="lg" 
            className="w-full h-12 bg-green-600 hover:bg-green-700 text-white"
          >
            <Plus className="w-5 h-5 mr-2" />
            {t('addMonthlyIncome')}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('setMonthlyIncome')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="income">{t('monthlyIncomeAmount')}</Label>
            <Input
              id="income"
              type="number"
              placeholder={t('enterMonthlyIncome')}
              value={income}
              onChange={(e) => setIncome(e.target.value)}
              min="0"
              step="0.01"
              required
            />
          </div>
          <div className="flex space-x-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={() => setIsOpen(false)}
            >
              {t('cancel')}
            </Button>
            <Button
              type="submit"
              className="flex-1 bg-green-600 hover:bg-green-700"
            >
              {t('saveIncome')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddIncomeModal;
