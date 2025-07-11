import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/hooks/useLanguage";
import { Plus, Target, Wallet, Receipt } from "lucide-react";

interface WorkerQuickActionsProps {
  onAddExpenseClick: () => void;
  onAddGoalClick: () => void;
  onAddIncomeClick: () => void;
}

const WorkerQuickActions = ({
  onAddExpenseClick,
  onAddGoalClick,
  onAddIncomeClick
}: WorkerQuickActionsProps) => {
  const { t, currentLanguage } = useLanguage();

  const actions = [
    {
      title: currentLanguage === 'hi' ? 'खर्च जोड़ें' : 'Add Expense',
      description: currentLanguage === 'hi' ? 'नया खर्च दर्ज करें' : 'Record new expense',
      icon: Receipt,
      onClick: onAddExpenseClick,
      buttonClass: 'worker-button-primary',
      bgClass: 'bg-trust-blue/5'
    },
    {
      title: currentLanguage === 'hi' ? 'लक्ष्य बनाएं' : 'Set Goal',
      description: currentLanguage === 'hi' ? 'नया लक्ष्य निर्धारित करें' : 'Create new goal',
      icon: Target,
      onClick: onAddGoalClick,
      buttonClass: 'worker-button-accent',
      bgClass: 'bg-prosperity-gold/5'
    },
    {
      title: currentLanguage === 'hi' ? 'आय अपडेट करें' : 'Update Income',
      description: currentLanguage === 'hi' ? 'मासिक आय बदलें' : 'Change monthly income',
      icon: Wallet,
      onClick: onAddIncomeClick,
      buttonClass: 'worker-button-secondary',
      bgClass: 'bg-success-green/5'
    }
  ];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-neutral-900">
        {currentLanguage === 'hi' ? 'त्वरित कार्य' : 'Quick Actions'}
      </h2>
      
      <div className="space-y-3">
        {actions.map((action, index) => (
          <Card key={index} className={`worker-card simple-hover ${action.bgClass} border-0`}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                    <action.icon className="w-5 h-5 text-neutral-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">{action.title}</h3>
                    <p className="text-sm text-neutral-600">{action.description}</p>
                  </div>
                </div>
                <Button
                  onClick={action.onClick}
                  className={`${action.buttonClass} rounded-full w-10 h-10 p-0`}
                >
                  <Plus className="w-5 h-5" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Helpful tip */}
      <Card className="worker-card bg-neutral-50 border-0">
        <CardContent className="p-4 text-center">
          <p className="text-sm text-neutral-600">
            {currentLanguage === 'hi'
              ? '💡 सुझाव: हर दिन खर्च दर्ज करने से आपको अपने पैसे पर बेहतर नियंत्रण मिलेगा।'
              : '💡 Tip: Recording expenses daily gives you better control over your money.'
            }
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkerQuickActions;