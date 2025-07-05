
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { PlusCircle, Target, TrendingUp } from "lucide-react";

interface QuickActionsProps {
  onAddExpenseClick: () => void;
  onAddGoalClick: () => void;
  onAddIncomeClick: () => void;
}

const QuickActions = ({ onAddExpenseClick, onAddGoalClick, onAddIncomeClick }: QuickActionsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">खर्च जोड़ें</CardTitle>
          <CardDescription>नया खर्च रिकॉर्ड करें</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onAddExpenseClick} className="w-full">
            <PlusCircle className="w-4 h-4 mr-2" />
            खर्च जोड़ें
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">लक्ष्य सेट करें</CardTitle>
          <CardDescription>वित्तीय लक्ष्य बनाएं</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onAddGoalClick} className="w-full" variant="outline">
            <Target className="w-4 h-4 mr-2" />
            लक्ष्य जोड़ें
          </Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">आय अपडेट करें</CardTitle>
          <CardDescription>मासिक आय जोड़ें</CardDescription>
        </CardHeader>
        <CardContent>
          <Button onClick={onAddIncomeClick} className="w-full" variant="secondary">
            <TrendingUp className="w-4 h-4 mr-2" />
            आय जोड़ें
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default QuickActions;
