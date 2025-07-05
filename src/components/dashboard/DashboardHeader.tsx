
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";
import LanguageSelector from "../LanguageSelector";

interface DashboardHeaderProps {
  userName?: string;
  onSignOut: () => Promise<void>;
}

const DashboardHeader = ({ userName, onSignOut }: DashboardHeaderProps) => {
  const { t, currentLanguage } = useLanguage();

  return (
    <div className="space-y-4">
      {/* Mobile-optimized top bar */}
      <div className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm border">
        <LanguageSelector />
        <Button
          variant="outline"
          size="sm"
          onClick={onSignOut}
          className="flex items-center space-x-2 h-8 px-3"
        >
          <LogOut className="w-4 h-4" />
          <span className="text-sm">{t('logOut')}</span>
        </Button>
      </div>

      {/* Welcome section optimized for mobile */}
      <div className="px-1">
        <h1 className="text-2xl font-bold text-gray-900 leading-tight">
          {t('hello')}, {userName || (currentLanguage === 'hi' ? 'उपयोगकर्ता' : 'User')}!
        </h1>
        <p className="text-gray-600 text-sm mt-1">{t('yourFinancialDashboard')}</p>
      </div>
    </div>
  );
};

export default DashboardHeader;
