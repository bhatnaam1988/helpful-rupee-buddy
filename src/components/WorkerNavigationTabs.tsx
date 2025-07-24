import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Home, 
  Receipt, 
  Target, 
  PieChart, 
  Brain,
  TrendingUp
} from "lucide-react";
import AIRecommendations from "./AIRecommendations";
import InvestmentPortfolio from "./InvestmentPortfolio";

import ExpensesPage from "../pages/ExpensesPage";
import { useLanguage } from "@/hooks/useLanguage";

interface WorkerNavigationTabsProps {
  children: React.ReactNode;
}

const WorkerNavigationTabs = ({ children }: WorkerNavigationTabsProps) => {
  const [activeTab, setActiveTab] = useState('home');
  const { currentLanguage } = useLanguage();

  const tabs = [
    { 
      id: 'home', 
      label: currentLanguage === 'hi' ? 'होम' : 'Home', 
      icon: Home 
    },
    { 
      id: 'expenses', 
      label: currentLanguage === 'hi' ? 'खर्च' : 'Expenses', 
      icon: Receipt 
    },
    { 
      id: 'goals', 
      label: currentLanguage === 'hi' ? 'लक्ष्य' : 'Goals', 
      icon: Target 
    },
    { 
      id: 'invest', 
      label: currentLanguage === 'hi' ? 'निवेश' : 'Invest', 
      icon: TrendingUp 
    },
    { 
      id: 'advice', 
      label: currentLanguage === 'hi' ? 'सलाह' : 'Advice', 
      icon: Brain 
    },
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'home':
        return children;
      case 'expenses':
        return (
          <div className="min-h-screen bg-neutral-50">
            <ExpensesPage />
          </div>
        );
      case 'goals':
        return (
          <div className="min-h-screen bg-neutral-50 mobile-container py-6">
            <h1 className="text-2xl font-bold text-trust-blue mb-6">
              {currentLanguage === 'hi' ? 'आपके लक्ष्य' : 'Your Goals'}
            </h1>
            <p className="text-neutral-600 text-center py-8">
              {currentLanguage === 'hi' 
                ? 'लक्ष्य प्रबंधन जल्द ही आ रहा है...'
                : 'Goals management coming soon...'
              }
            </p>
          </div>
        );
      case 'invest':
        return (
          <div className="min-h-screen bg-neutral-50">
            <InvestmentPortfolio />
          </div>
        );
      case 'advice':
        return (
          <div className="min-h-screen bg-neutral-50">
            <AIRecommendations />
          </div>
        );
      default:
        return children;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Content area with bottom padding for navigation */}
      <div className="pb-20 min-h-screen">
        {renderTabContent()}
      </div>
      
      {/* Bottom Navigation - Mobile-first design */}
      <Card className="fixed bottom-0 left-0 right-0 border-t-2 border-neutral-200 rounded-none shadow-large z-50 bg-white">
        <CardContent className="p-2">
          <div className="flex justify-around items-center">
            {tabs.map(({ id, label, icon: Icon }) => (
              <Button
                key={id}
                variant={activeTab === id ? "default" : "ghost"}
                size="sm"
                onClick={() => setActiveTab(id)}
                className={`flex flex-col items-center justify-center space-y-1 h-auto py-3 px-3 min-w-0 flex-1 text-xs ${
                  activeTab === id 
                    ? 'bg-trust-blue text-white hover:bg-trust-blue-dark shadow-simple' 
                    : 'text-neutral-600 hover:text-trust-blue hover:bg-trust-blue/5'
                } rounded-xl transition-all duration-200`}
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

export default WorkerNavigationTabs;