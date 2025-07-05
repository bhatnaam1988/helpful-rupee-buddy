
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
    <div className="mb-6">
      {/* Top Bar with Language Selector and Sign Out */}
      <div className="flex justify-between items-center mb-4 p-2 bg-white rounded-lg shadow-sm border">
        <LanguageSelector />
        <Button
          variant="outline"
          size="sm"
          onClick={onSignOut}
          className="flex items-center space-x-2"
        >
          <LogOut className="w-4 h-4" />
          <span>{t('logOut')}</span>
        </Button>
      </div>

      {/* Welcome Section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          {t('hello')}, {userName || (currentLanguage === 'hi' ? 'उपयोगकर्ता' : 'User')}!
        </h1>
        <p className="text-gray-600">{t('yourFinancialDashboard')}</p>
      </div>
    </div>
  );
};

export default DashboardHeader;
