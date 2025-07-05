
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Target } from "lucide-react";
import { useGoals } from "@/hooks/useGoals";

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
            <span className="text-sm text-blue-600">लक्ष्य निर्धारित करें</span>
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>वित्तीय लक्ष्य निर्धारित करें</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">लक्ष्य का नाम</Label>
            <Input
              id="name"
              placeholder="उदा., आपातकालीन फंड, नई कार"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="targetAmount">लक्ष्य राशि (₹)</Label>
            <Input
              id="targetAmount"
              type="number"
              step="0.01"
              placeholder="100000"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="currentAmount">वर्तमान राशि (₹)</Label>
            <Input
              id="currentAmount"
              type="number"
              step="0.01"
              placeholder="0"
              value={currentAmount}
              onChange={(e) => setCurrentAmount(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="timeline">समयसीमा (महीने)</Label>
            <Input
              id="timeline"
              type="number"
              placeholder="12"
              value={timelineMonths}
              onChange={(e) => setTimelineMonths(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="priority">प्राथमिकता</Label>
            <Select value={priority} onValueChange={(value: "High" | "Medium" | "Low") => setPriority(value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="High">उच्च</SelectItem>
                <SelectItem value="Medium">मध्यम</SelectItem>
                <SelectItem value="Low">कम</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex space-x-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)} className="flex-1">
              रद्द करें
            </Button>
            <Button type="submit" className="flex-1 bg-blue-600 hover:bg-blue-700">
              लक्ष्य निर्धारित करें
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddGoalModal;
