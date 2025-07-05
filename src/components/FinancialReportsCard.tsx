
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useFinancialReports } from "@/hooks/useFinancialReports";
import { useLanguage } from "@/hooks/useLanguage";
import { BarChart3, FileText } from "lucide-react";
import ReportGenerator from "./reports/ReportGenerator";
import ReportItem from "./reports/ReportItem";

const FinancialReportsCard = () => {
  const { reports, loading, generateReport } = useFinancialReports();
  const { t } = useLanguage();

  if (loading) {
    return (
      <Card className="border-0 shadow-md">
        <CardHeader>
          <CardTitle className="text-lg text-gray-800 flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>{t('financialReports')}</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-500">{t('loading')}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-0 shadow-md">
      <CardHeader>
        <CardTitle className="text-lg text-gray-800 flex items-center space-x-2">
          <BarChart3 className="w-5 h-5" />
          <span>{t('financialReports')}</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ReportGenerator onGenerateReport={generateReport} />

        {reports.length === 0 ? (
          <div className="text-center py-8">
            <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">{t('noReportsGenerated')}</p>
            <p className="text-sm text-gray-400 mt-1">{t('generateFirstReport')}</p>
          </div>
        ) : (
          <div className="space-y-4">
            <h4 className="font-semibold text-gray-800 mb-3">{t('recentReports')}</h4>
            {reports.slice(0, 3).map((report) => (
              <ReportItem key={report.id} report={report} />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default FinancialReportsCard;
