
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useBudgetCategories } from "@/hooks/useBudgetCategories";
import { AlertTriangle, CheckCircle, Target } from "lucide-react";

const BudgetTracker = () => {
  const { categories, loading } = useBudgetCategories();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('hi-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getCategoryIcon = (category: string) => {
    const iconMap: { [key: string]: string } = {
      "Food & Groceries": "🍽️",
      "Transport": "🚌",
      "Utilities": "💡",
      "Rent/Housing": "🏠",
      "Entertainment": "🎬",
      "Healthcare": "🏥",
      "Shopping": "🛍️",
      "Education": "📚",
      "Other": "📋"
    };
    return iconMap[category] || "📋";
  };

  const getCategoryHindi = (category: string) => {
    const hindiMap: { [key: string]: string } = {
      "Food & Groceries": "भोजन और किराना",
      "Transport": "परिवहन",
      "Utilities": "उपयोगिताएं",
      "Rent/Housing": "किराया/आवास",
      "Entertainment": "मनोरंजन",
      "Healthcare": "स्वास्थ्य सेवा",
      "Shopping": "खरीदारी",
      "Education": "शिक्षा",
      "Other": "अन्य"
    };
    return hindiMap[category] || category;
  };

  const totalBudget = categories.reduce((sum, cat) => sum + cat.monthly_limit, 0);
  const totalSpent = categories.reduce((sum, cat) => sum + cat.current_spent, 0);
  const overallProgress = totalBudget > 0 ? (totalSpent / totalBudget) * 100 : 0;

  if (loading) {
    return (
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-purple-800">बजट ट्रैकर</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500">लोड हो रहा है...</p>
        </CardContent>
      </Card>
    );
  }

  if (categories.length === 0) {
    return (
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-purple-800">बजट ट्रैकर</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500">अभी तक कोई बजट सेट नहीं किया गया</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg text-purple-800">बजट ट्रैकर</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Overall Budget Summary */}
        <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-100">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-purple-600">कुल मासिक बजट</span>
            <span className="font-semibold text-purple-700">{formatCurrency(totalBudget)}</span>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-purple-600">कुल खर्च</span>
            <span className="font-semibold text-purple-700">{formatCurrency(totalSpent)}</span>
          </div>
          <Progress value={overallProgress} className="h-2 mb-2" />
          <div className="flex items-center justify-center space-x-2">
            {overallProgress <= 80 ? (
              <CheckCircle className="w-4 h-4 text-green-600" />
            ) : overallProgress <= 100 ? (
              <AlertTriangle className="w-4 h-4 text-yellow-600" />
            ) : (
              <AlertTriangle className="w-4 h-4 text-red-600" />
            )}
            <span className={`text-xs font-medium ${
              overallProgress <= 80 ? 'text-green-600' : 
              overallProgress <= 100 ? 'text-yellow-600' : 'text-red-600'
            }`}>
              {overallProgress.toFixed(1)}% उपयोग
            </span>
          </div>
        </div>

        {/* Individual Categories */}
        <div className="space-y-4">
          <h4 className="font-semibold text-purple-800 mb-3">श्रेणी अनुसार बजट</h4>
          {categories.map((category) => {
            const progressPercentage = (category.current_spent / category.monthly_limit) * 100;
            const remaining = category.monthly_limit - category.current_spent;
            
            return (
              <div key={category.id} className="border border-purple-100 rounded-lg p-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{getCategoryIcon(category.category_name)}</span>
                    <span className="font-medium text-purple-800 text-sm">
                      {getCategoryHindi(category.category_name)}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    {progressPercentage <= 80 ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : progressPercentage <= 100 ? (
                      <AlertTriangle className="w-4 h-4 text-yellow-600" />
                    ) : (
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                </div>
                
                <div className="mb-2">
                  <Progress 
                    value={Math.min(progressPercentage, 100)} 
                    className={`h-2 ${
                      progressPercentage > 100 ? '[&>div]:bg-red-500' : 
                      progressPercentage > 80 ? '[&>div]:bg-yellow-500' : '[&>div]:bg-green-500'
                    }`}
                  />
                </div>
                
                <div className="flex justify-between text-xs text-purple-600 mb-1">
                  <span>खर्च: {formatCurrency(category.current_spent)}</span>
                  <span>सीमा: {formatCurrency(category.monthly_limit)}</span>
                </div>
                
                <div className="text-center">
                  <span className={`text-xs font-medium ${
                    remaining >= 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {remaining >= 0 
                      ? `${formatCurrency(remaining)} बचा है` 
                      : `${formatCurrency(Math.abs(remaining))} अधिक खर्च`
                    }
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default BudgetTracker;
