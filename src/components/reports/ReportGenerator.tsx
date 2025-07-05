
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useLanguage } from "@/hooks/useLanguage";

interface ReportGeneratorProps {
  onGenerateReport: (reportType: 'Monthly' | 'Quarterly' | 'Yearly', period: string) => Promise<void>;
}

const ReportGenerator = ({ onGenerateReport }: ReportGeneratorProps) => {
  const { t } = useLanguage();
  const [reportType, setReportType] = useState<'Monthly' | 'Quarterly' | 'Yearly'>('Monthly');
  const [generating, setGenerating] = useState(false);

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
    
    await onGenerateReport(reportType, period);
    setGenerating(false);
  };

  return (
    <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
      <h4 className="font-semibold text-gray-800 mb-3">{t('generateNewReport')}</h4>
      <div className="space-y-3">
        <Select value={reportType} onValueChange={(value: any) => setReportType(value)}>
          <SelectTrigger>
            <SelectValue placeholder={t('selectReportType')} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Monthly">{t('monthlyReport')}</SelectItem>
            <SelectItem value="Quarterly">{t('quarterlyReport')}</SelectItem>
            <SelectItem value="Yearly">{t('yearlyReport')}</SelectItem>
          </SelectContent>
        </Select>
        <Button 
          onClick={handleGenerateReport} 
          disabled={generating}
          className="w-full bg-gray-600 hover:bg-gray-700"
        >
          {generating ? t('generating') : t('generateReport')}
        </Button>
      </div>
    </div>
  );
};

export default ReportGenerator;
