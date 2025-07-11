import { Button } from "@/components/ui/button";
import { LogOut, Settings } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageSelector from "../LanguageSelector";

interface WorkerDashboardHeaderProps {
  userName?: string;
  monthlyIncome?: number;
  onSignOut: () => Promise<void>;
}

const WorkerDashboardHeader = ({ userName, monthlyIncome, onSignOut }: WorkerDashboardHeaderProps) => {
  const { t, currentLanguage } = useLanguage();

  return (
    <div className="worker-card p-6 space-y-4">
      {/* Top row with language and sign out */}
      <div className="flex justify-between items-center">
        <LanguageSelector />
        <Button
          variant="outline"
          size="sm"
          onClick={onSignOut}
          className="touch-target text-sm"
        >
          <LogOut className="w-4 h-4 mr-2" />
          {t('logOut')}
        </Button>
      </div>

      {/* Welcome section - optimized for blue-collar workers */}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold text-trust-blue">
          {t('hello')}, {userName || (currentLanguage === 'hi' ? 'भाई साहब' : 'Friend')}!
        </h1>
        <p className="text-neutral-600 text-base">
          {currentLanguage === 'hi' ? 'आपका पैसा, आपका नियंत्रण' : 'Your money, your control'}
        </p>
        {monthlyIncome && (
          <div className="bg-prosperity-gold/10 rounded-lg p-3 mt-3">
            <p className="text-sm text-neutral-600">
              {currentLanguage === 'hi' ? 'मासिक आय' : 'Monthly Income'}
            </p>
            <p className="text-xl font-bold text-prosperity-gold">
              ₹{monthlyIncome.toLocaleString('en-IN')}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerDashboardHeader;