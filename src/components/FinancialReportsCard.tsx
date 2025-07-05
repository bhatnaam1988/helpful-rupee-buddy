
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useFinancialReports } from "@/hooks/useFinancialReports";
import { BarChart3, FileText, TrendingUp } from "lucide-react";

const FinancialReportsCard = () => {
  const { reports, loading, generateReport } = useFinancialReports();
  const [reportType, setReportType] = useState<'Monthly' | 'Quarterly' | 'Yearly'>('Monthly');
  const [generating, setGenerating] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('hi-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const handleGenerateReport = async () => {
    setGenerating(true);
    const currentDate = new Date();
    let period = '';
    
    switch (reportType) {
      case 'Monthly':
        period = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;
        break;
      case 'Quarterly':
        const quarter = Math.ceil((currentDate.getMonth() + 1) / 3);
        period = `${currentDate.getFullYear()}-Q${quarter}`;
        break;
      case 'Yearly':
        period = `${currentDate.getFullYear()}`;
        break;
    }
    
    await generateReport(reportType, period);
    setGenerating(false);
  };

  const getReportTypeHindi = (type: string) => {
    const typeMap = {
      'Monthly': 'मासिक',
      'Quarterly': 'त्रैमासिक',
      'Yearly': 'वार्षिक'
    };
    return typeMap[type as keyof typeof typeMap] || type;
  };

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg text-gray-800 flex items-center space-x-2">
          <BarChart3 className="w-5 h-5" />
          <span>वित्तीय रिपोर्ट</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Report Generation */}
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
          <h4 className="font-semibold text-gray-800 mb-3">नई रिपोर्ट जेनरेट करें</h4>
          <div className="space-y-3">
            <Select value={reportType} onValueChange={(value: any) => setReportType(value)}>
              <SelectTrigger>
                <SelectValue placeholder="रिपोर्ट प्रकार चुनें" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Monthly">मासिक रिपोर्ट</SelectItem>
                <SelectItem value="Quarterly">त्रैमासिक रिपोर्ट</SelectItem>
                <SelectItem value="Yearly">वार्षिक रिपोर्ट</SelectItem>
              </SelectContent>
            </Select>
            <Button 
              onClick={handleGenerateReport} 
              disabled={generating}
              className="w-full bg-gray-600 hover:bg-gray-700"
            >
              {generating ? 'जेनरेट हो रही है...' : 'रिपोर्ट जेनरेट करें'}
            </Button>
          </div>
        </div>

        {/* Recent Reports */}
        {loading ? (
          <p className="text-center text-gray-500">लोड हो रहा है...</p>
        ) : reports.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">अभी तक कोई रिपोर्ट नहीं बनाई गई</p>
            <p className="text-sm text-gray-400 mt-1">ऊपर से अपनी पहली रिपोर्ट जेनरेट करें</p>
          </div>
        ) : (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 mb-3">हाल की रिपोर्ट्स</h4>
            {reports.slice(0, 3).map((report) => (
              <div key={report.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-2">
                    <FileText className="w-4 h-4 text-gray-600" />
                    <span className="font-medium text-gray-800">
                      {getReportTypeHindi(report.report_type)} रिपोर्ट
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">{report.report_period}</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div className="text-center p-2 bg-green-50 rounded border border-green-100">
                    <p className="text-xs text-green-600 mb-1">कुल आय</p>
                    <p className="text-sm font-semibold text-green-700">
                      {formatCurrency(report.total_income)}
                    </p>
                  </div>
                  <div className="text-center p-2 bg-red-50 rounded border border-red-100">
                    <p className="text-xs text-red-600 mb-1">कुल खर्च</p>
                    <p className="text-sm font-semibold text-red-700">
                      {formatCurrency(report.total_expenses)}
                    </p>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-2 bg-blue-50 rounded border border-blue-100">
                    <p className="text-xs text-blue-600 mb-1">कुल निवेश</p>
                    <p className="text-sm font-semibold text-blue-700">
                      {formatCurrency(report.total_investments)}
                    </p>
                  </div>
                  <div className="text-center p-2 bg-purple-50 rounded border border-purple-100">
                    <p className="text-xs text-purple-600 mb-1">बचत दर</p>
                    <p className="text-sm font-semibold text-purple-700">
                      {report.savings_rate.toFixed(1)}%
                    </p>
                  </div>
                </div>
                
                <div className="mt-3 text-xs text-gray-500 text-right">
                  {new Date(report.created_at).toLocaleDateString('hi-IN')} को बनाई गई
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FinancialReportsCard;
