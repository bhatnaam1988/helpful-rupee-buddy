
import { FileText } from "lucide-react";
import { useLanguage } from "@/hooks/useLanguage";

interface Report {
  id: string;
  report_type: string;
  report_period: string;
  total_income: number;
  total_expenses: number;
  total_investments: number;
  savings_rate: number;
  created_at: string;
}

interface ReportItemProps {
  report: Report;
}

const ReportItem = ({ report }: ReportItemProps) => {
  const { t } = useLanguage();

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('hi-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getReportTypeTranslated = (type: string) => {
    const typeMap: { [key: string]: string } = {
      'Monthly': t('monthly'),
      'Quarterly': t('quarterly'),
      'Yearly': t('yearly')
    };
    return typeMap[type] || type;
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <FileText className="w-4 h-4 text-gray-600" />
          <span className="font-medium text-gray-800">
            {getReportTypeTranslated(report.report_type)} {t('report')}
          </span>
        </div>
        <span className="text-sm text-gray-500">{report.report_period}</span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="text-center p-2 bg-green-50 rounded border border-green-100">
          <p className="text-xs text-green-600 mb-1">{t('totalIncome')}</p>
          <p className="text-sm font-semibold text-green-700">
            {formatCurrency(report.total_income)}
          </p>
        </div>
        <div className="text-center p-2 bg-red-50 rounded border border-red-100">
          <p className="text-xs text-red-600 mb-1">{t('totalExpenses')}</p>
          <p className="text-sm font-semibold text-red-700">
            {formatCurrency(report.total_expenses)}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center p-2 bg-blue-50 rounded border border-blue-100">
          <p className="text-xs text-blue-600 mb-1">{t('totalInvestments')}</p>
          <p className="text-sm font-semibold text-blue-700">
            {formatCurrency(report.total_investments)}
          </p>
        </div>
        <div className="text-center p-2 bg-purple-50 rounded border border-purple-100">
          <p className="text-xs text-purple-600 mb-1">{t('savingsRate')}</p>
          <p className="text-sm font-semibold text-purple-700">
            {report.savings_rate.toFixed(1)}%
          </p>
        </div>
      </div>
      
      <div className="mt-3 text-xs text-gray-500 text-right">
        {new Date(report.created_at).toLocaleDateString('hi-IN')} {t('createdOn')}
      </div>
    </div>
  );
};

export default ReportItem;
