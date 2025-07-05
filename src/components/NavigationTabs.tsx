
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Home, 
  TrendingUp, 
  Target, 
  PieChart, 
  FileText, 
  Settings,
  Brain
} from "lucide-react";
import AIRecommendations from "./AIRecommendations";
import InvestmentPortfolio from "./InvestmentPortfolio";
import BudgetTracker from "./BudgetTracker";
import FinancialReportsCard from "./FinancialReportsCard";

interface NavigationTabsProps {
  children: React.ReactNode;
}

const NavigationTabs = ({ children }: NavigationTabsProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const tabs = [
    { id: 'dashboard', label: 'डैशबोर्ड', icon: Home },
    { id: 'investments', label: 'निवेश', icon: TrendingUp },
    { id: 'budget', label: 'बजट', icon: Target },
    { id: 'reports', label: 'रिपोर्ट्स', icon: FileText },
    { id: 'ai', label: 'AI सुझाव', icon: Brain },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return children;
      case 'investments':
        return (
          <div className="space-y-6">
            <InvestmentPortfolio />
          </div>
        );
      case 'budget':
        return (
          <div className="space-y-6">
            <BudgetTracker />
          </div>
        );
      case 'reports':
        return (
          <div className="space-y-6">
            <FinancialReportsCard />
          </div>
        );
      case 'ai':
        return (
          <div className="space-y-6">
            <AIRecommendations />
          </div>
        );
      default:
        return children;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="pb-20">
        {renderTabContent()}
      </div>
      
      {/* Bottom Navigation */}
      <Card className="fixed bottom-0 left-0 right-0 border-t-2 border-gray-200 rounded-none shadow-lg">
        <CardContent className="p-2">
          <div className="flex justify-around items-center">
            {tabs.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={activeTab === id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(id)}
                className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 ${
                  activeTab === id 
                    ? 'bg-blue-600 text-white hover:bg-blue-700' 
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-xs font-medium">{label}</span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NavigationTabs;
