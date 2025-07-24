
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
  Brain,
  Receipt
} from "lucide-react";
import AIRecommendations from "./AIRecommendations";
import InvestmentPortfolio from "./InvestmentPortfolio";
import BudgetTracker from "./BudgetTracker";
import FinancialReportsCard from "./FinancialReportsCard";
import ExpensesPage from "../pages/ExpensesPage";
import { useLanguage } from "@/hooks/useLanguage";

interface NavigationTabsProps {
  children: React.ReactNode;
}

const NavigationTabs = ({ children }: NavigationTabsProps) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const { t } = useLanguage();

  const tabs = [
    { id: 'dashboard', label: t('dashboard'), icon: Home },
    { id: 'expenses', label: t('expenses'), icon: Receipt },
    { id: 'investments', label: t('investments'), icon: TrendingUp },
    { id: 'budget', label: t('budget'), icon: Target },
    { id: 'reports', label: t('reports'), icon: FileText },
    { id: 'ai', label: t('aiSuggestions'), icon: Brain },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return children;
      case 'expenses':
        return (
          <div className="space-y-4">
            <ExpensesPage />
          </div>
        );
      case 'investments':
        return (
          <div className="space-y-4">
            <InvestmentPortfolio />
          </div>
        );
      case 'budget':
        return (
          <div className="space-y-4">
            <BudgetTracker />
          </div>
        );
      case 'reports':
        return (
          <div className="space-y-4">
            <FinancialReportsCard />
          </div>
        );
      case 'ai':
        return (
          <div className="space-y-4">
            <AIRecommendations />
          </div>
        );
      default:
        return children;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Mobile-first content area - removed conflicting background */}
      <div className="pb-24 min-h-screen">
        {renderTabContent()}
      </div>
      
      {/* Mobile-optimized Bottom Navigation */}
      <Card className="fixed bottom-0 left-0 right-0 border-t-2 border-neutral-200 rounded-none shadow-card z-50 bg-white">
        <CardContent className="p-1">
          <div className="flex justify-around items-center">
            {tabs.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={activeTab === id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(id)}
                className={`flex flex-col items-center justify-center space-y-1 h-auto py-3 px-2 min-w-0 flex-1 text-xs ${
                  activeTab === id 
                    ? 'bg-trust-blue text-white hover:bg-trust-blue-dark' 
                    : 'text-neutral-600 hover:text-trust-blue hover:bg-trust-blue/10'
                }`}
              >
                <Icon className="w-5 h-5 mb-1" />
                <span className="text-xs font-medium leading-tight truncate w-full text-center">
                  {label}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NavigationTabs;
