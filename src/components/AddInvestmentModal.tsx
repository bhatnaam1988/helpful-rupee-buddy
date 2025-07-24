
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp } from "lucide-react";
import { useInvestments } from "@/hooks/useInvestments";
import { investmentSchema } from "@/lib/validation";
import { useToast } from "@/hooks/use-toast";

const investmentTypes = [
  "SIP",
  "Lump Sum",
  "FD",
  "Stocks",
  "Bonds",
  "PPF",
  "EPF",
  "Other"
];

const investmentTypeHindi = {
  "SIP": "एसआईपी",
  "Lump Sum": "एकमुश्त",
  "FD": "सावधि जमा",
  "Stocks": "शेयर",
  "Bonds": "बॉन्ड",
  "PPF": "पीपीएफ",
  "EPF": "ईपीएफ",
  "Other": "अन्य"
};

interface AddInvestmentModalProps {
  children?: React.ReactNode;
}

const AddInvestmentModal = ({ children }: AddInvestmentModalProps) => {
  const [open, setOpen] = useState(false);
  const [instrumentName, setInstrumentName] = useState("");
  const [investmentType, setInvestmentType] = useState("");
  const [amount, setAmount] = useState("");
  const [investmentDate, setInvestmentDate] = useState(new Date().toISOString().split('T')[0]);
  const [maturityDate, setMaturityDate] = useState("");
  const [expectedReturnRate, setExpectedReturnRate] = useState("");
  const [currentValue, setCurrentValue] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { addInvestment } = useInvestments();
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    
    if (!instrumentName || !investmentType || !amount) {
      setErrors({ general: 'Required fields are missing' });
      return;
    }

    try {
      const validatedData = investmentSchema.parse({
        instrument_name: instrumentName,
        investment_type: investmentType,
        amount: parseFloat(amount),
        investment_date: investmentDate,
        maturity_date: maturityDate || undefined,
        expected_return_rate: expectedReturnRate ? parseFloat(expectedReturnRate) : undefined,
        current_value: currentValue ? parseFloat(currentValue) : 0
      });

      await addInvestment({
        instrument_name: validatedData.instrument_name,
        investment_type: validatedData.investment_type as any,
        amount: validatedData.amount,
        investment_date: validatedData.investment_date,
        maturity_date: validatedData.maturity_date,
        expected_return_rate: validatedData.expected_return_rate,
        current_value: validatedData.current_value || 0,
        status: 'Active'
      });

      // Reset form
      setInstrumentName("");
      setInvestmentType("");
      setAmount("");
      setInvestmentDate(new Date().toISOString().split('T')[0]);
      setMaturityDate("");
      setExpectedReturnRate("");
      setCurrentValue("");
      setOpen(false);
      
      toast({
        title: "Success",
        description: "Investment added successfully"
      });
    } catch (error: any) {
      if (error.errors) {
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        setErrors({ general: 'Failed to add investment' });
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
          <button className="worker-button-primary h-16 flex flex-col items-center justify-center space-y-1">
            <TrendingUp className="w-6 h-6" />
            <span className="text-sm">निवेश जोड़ें</span>
          </button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>नया निवेश जोड़ें</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="worker-input-group">
            <Label htmlFor="instrument_name" className="worker-label">निवेश साधन का नाम</Label>
            <Input
              id="instrument_name"
              placeholder="जैसे: HDFC Equity Fund, SBI FD"
              value={instrumentName}
              onChange={(e) => setInstrumentName(e.target.value)}
              required
              className="h-12"
            />
          </div>
          <div className="worker-input-group">
            <Label htmlFor="investment_type" className="worker-label">निवेश प्रकार</Label>
            <Select value={investmentType} onValueChange={setInvestmentType} required>
              <SelectTrigger className="h-12">
                <SelectValue placeholder="निवेश प्रकार चुनें" />
              </SelectTrigger>
              <SelectContent>
                {investmentTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {investmentTypeHindi[type as keyof typeof investmentTypeHindi]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="worker-input-group">
            <Label htmlFor="amount" className="worker-label">राशि (₹)</Label>
            <Input
              id="amount"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
              className="h-12"
            />
          </div>
          <div className="worker-input-group">
            <Label htmlFor="investment_date" className="worker-label">निवेश तारीख</Label>
            <Input
              id="investment_date"
              type="date"
              value={investmentDate}
              onChange={(e) => setInvestmentDate(e.target.value)}
              required
              className="h-12"
            />
          </div>
          <div className="worker-input-group">
            <Label htmlFor="maturity_date" className="worker-label">परिपक्वता तारीख (वैकल्पिक)</Label>
            <Input
              id="maturity_date"
              type="date"
              value={maturityDate}
              onChange={(e) => setMaturityDate(e.target.value)}
              className="h-12"
            />
          </div>
          <div className="worker-input-group">
            <Label htmlFor="expected_return_rate" className="worker-label">अपेक्षित रिटर्न दर (% वैकल्पिक)</Label>
            <Input
              id="expected_return_rate"
              type="number"
              step="0.01"
              placeholder="12.5"
              value={expectedReturnRate}
              onChange={(e) => setExpectedReturnRate(e.target.value)}
              className="h-12"
            />
          </div>
          <div className="worker-input-group">
            <Label htmlFor="current_value" className="worker-label">वर्तमान मूल्य (₹ वैकल्पिक)</Label>
            <Input
              id="current_value"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
              className="h-12"
            />
          </div>
          <div className="flex space-x-2">
            <button type="button" className="worker-button-secondary flex-1" onClick={() => setOpen(false)}>
              रद्द करें
            </button>
            <button type="submit" className="worker-button-primary flex-1">
              निवेश जोड़ें
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddInvestmentModal;
