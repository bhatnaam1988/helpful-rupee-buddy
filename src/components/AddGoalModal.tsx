
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target } from "lucide-react";
import { useGoals } from "@/hooks/useGoals";
import { useLanguage } from "@/hooks/useLanguage";

interface AddGoalModalProps {
  children?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AddGoalModal = ({ children, open, onOpenChange }: AddGoalModalProps) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const [name, setName] = useState("");
  const [targetAmount, setTargetAmount] = useState("");
  const [currentAmount, setCurrentAmount] = useState("");
  const [timelineMonths, setTimelineMonths] = useState("");
  const [priority, setPriority] = useState<"High" | "Medium" | "Low">("Medium");
  const { addGoal } = useGoals();
  const { t } = useLanguage();

  const isOpen = open !== undefined ? open : internalOpen;
  const setIsOpen = onOpenChange || setInternalOpen;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !targetAmount) return;

    await addGoal({
      name,
      target_amount: parseFloat(targetAmount),
      current_amount: parseFloat(currentAmount) || 0,
      timeline_months: timelineMonths ? parseInt(timelineMonths) : undefined,
      priority
    });

    // Reset form
    setName("");
    setTargetAmount("");
    setCurrentAmount("");
    setTimelineMonths("");
    setPriority("Medium");
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" className="h-16 border-blue-200 hover:bg-blue-50 flex flex-col items-center justify-center space-y-1">
            <Target className="w-6 h-6 text-blue-600" />
            <span className="text-sm text-blue-600">{t('setGoal')}</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{t('setFinancialGoal')}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="worker-input-group">
            <Label htmlFor="name" className="worker-label">{t('goalName')}</Label>
            <Input
              id="name"
              placeholder={t('goalNamePlaceholder')}
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="h-12"
            />
          </div>
          <div className="worker-input-group">
            <Label htmlFor="targetAmount" className="worker-label">{t('goalAmount')}</Label>
            <Input
              id="targetAmount"
              type="number"
              step="0.01"
              placeholder="100000"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              required
              className="h-12"
            />
          </div>
          <div className="worker-input-group">
            <Label htmlFor="currentAmount" className="worker-label">{t('currentAmount')}</Label>
            <Input
              id="currentAmount"
              type="number"
              step="0.01"
              placeholder="0"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.value)}
              className="h-12"
            />
          </div>
          <div className="worker-input-group">
            <Label htmlFor="timeline" className="worker-label">{t('timeline')}</Label>
            <Input
              id="timeline"
              type="number"
              placeholder="12"
              value={timelineMonths}
              onChange={(e) => setTimelineMonths(e.target.value)}
              className="h-12"
            />
          </div>
          <div className="worker-input-group">
            <Label htmlFor="priority" className="worker-label">{t('priority')}</Label>
            <Select value={priority} onValueChange={(value: "High" | "Medium" | "Low") => setPriority(value)}>
              <SelectTrigger className="h-12">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High">{t('highPriority')}</SelectItem>
                <SelectItem value="Medium">{t('mediumPriority')}</SelectItem>
                <SelectItem value="Low">{t('lowPriority')}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-2">
            <button type="button" className="worker-button-secondary flex-1" onClick={() => setIsOpen(false)}>
              {t('cancel')}
            </button>
            <button type="submit" className="worker-button-primary flex-1">
              {t('setGoal')}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGoalModal;
