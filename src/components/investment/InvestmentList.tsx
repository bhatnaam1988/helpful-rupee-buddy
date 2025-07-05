
import { useLanguage } from "@/hooks/useLanguage";
import InvestmentItem from "./InvestmentItem";

interface Investment {
  id: string;
  investment_type: string;
  instrument_name: string;
  amount: number;
  current_value: number;
  investment_date: string;
  expected_return_rate?: number;
  status: string;
}

interface InvestmentListProps {
  investments: Investment[];
}

const InvestmentList = ({ investments }: InvestmentListProps) => {
  const { t } = useLanguage();

  return (
    <div className="space-y-3">
      <h4 className="font-semibold text-blue-800 mb-3">{t('yourInvestments')}</h4>
      {investments.slice(0, 5).map((investment) => (
        <InvestmentItem key={investment.id} investment={investment} />
      ))}
    </div>
  );
};

export default InvestmentList;
