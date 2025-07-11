
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrendingUp } from "lucide-react";
import { useInvestments } from "@/hooks/useInvestments";

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
  const { addInvestment } = useInvestments();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!instrumentName || !investmentType || !amount) return;

    await addInvestment({
      instrument_name: instrumentName,
      investment_type: investmentType as any,
      amount: parseFloat(amount),
      investment_date: investmentDate,
      maturity_date: maturityDate || undefined,
      expected_return_rate: expectedReturnRate ? parseFloat(expectedReturnRate) : undefined,
      current_value: currentValue ? parseFloat(currentValue) : 0,
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
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="instrument_name">निवेश साधन का नाम</Label>
            <Input
              id="instrument_name"
              placeholder="जैसे: HDFC Equity Fund, SBI FD"
              value={instrumentName}
              onChange={(e) => setInstrumentName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="investment_type">निवेश प्रकार</Label>
            <Select value={investmentType} onValueChange={setInvestmentType} required>
              <SelectTrigger>
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
            <Label htmlFor="investment_date">निवेश तारीख</Label>
            <Input
              id="investment_date"
              type="date"
              value={investmentDate}
              onChange={(e) => setInvestmentDate(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="maturity_date">परिपक्वता तारीख (वैकल्पिक)</Label>
            <Input
              id="maturity_date"
              type="date"
              value={maturityDate}
              onChange={(e) => setMaturityDate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="expected_return_rate">अपेक्षित रिटर्न दर (% वैकल्पिक)</Label>
            <Input
              id="expected_return_rate"
              type="number"
              step="0.01"
              placeholder="12.5"
              value={expectedReturnRate}
              onChange={(e) => setExpectedReturnRate(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="current_value">वर्तमान मूल्य (₹ वैकल्पिक)</Label>
            <Input
              id="current_value"
              type="number"
              step="0.01"
              placeholder="0.00"
              value={currentValue}
              onChange={(e) => setCurrentValue(e.target.value)}
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
