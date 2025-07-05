
import { Button } from "@/components/ui/button";
import { LogOut } from "lucide-react";

interface DashboardHeaderProps {
  userName?: string;
  onSignOut: () => Promise<void>;
}

const DashboardHeader = ({ userName, onSignOut }: DashboardHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">
          नमस्ते, {userName || 'उपयोगकर्ता'}!
        </h1>
        <p className="text-gray-600">आपका वित्तीय डैशबोर्ड</p>
      </div>
      <Button
        variant="outline"
        size="sm"
        onClick={onSignOut}
        className="flex items-center space-x-2"
      >
        <LogOut className="w-4 h-4" />
        <span>लॉग आउट</span>
      </Button>
    </div>
  );
};

export default DashboardHeader;
