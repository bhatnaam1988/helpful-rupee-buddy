
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface FinancialReport {
  id: string;
  user_id: string;
  report_type: 'Monthly' | 'Quarterly' | 'Yearly';
  report_period: string;
  total_income: number;
  total_expenses: number;
  total_investments: number;
  savings_rate: number;
  report_data?: any;
  created_at: string;
}

export const useFinancialReports = () => {
  const [reports, setReports] = useState<FinancialReport[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchReports = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('financial_reports')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching financial reports:', error);
        return;
      }

      // Type cast the data to match our FinancialReport interface
      const typedData = (data || []).map(item => ({
        ...item,
        report_type: item.report_type as FinancialReport['report_type'],
        total_income: item.total_income || 0,
        total_expenses: item.total_expenses || 0,
        total_investments: item.total_investments || 0,
        savings_rate: item.savings_rate || 0
      }));

      setReports(typedData);
    } catch (error) {
      console.error('Error fetching financial reports:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async (reportType: 'Monthly' | 'Quarterly' | 'Yearly', period: string) => {
    if (!user) return;

    try {
      // Calculate totals from existing data
      const { data: expensesData } = await supabase
        .from('expenses')
        .select('amount')
        .eq('user_id', user.id);

      const { data: investmentsData } = await supabase
        .from('investments')
        .select('amount')
        .eq('user_id', user.id);

      const { data: profileData } = await supabase
        .from('profiles')
        .select('monthly_income')
        .eq('id', user.id)
        .single();

      const totalExpenses = expensesData?.reduce((sum, exp) => sum + exp.amount, 0) || 0;
      const totalInvestments = investmentsData?.reduce((sum, inv) => sum + inv.amount, 0) || 0;
      const totalIncome = profileData?.monthly_income || 0;
      const savingsRate = totalIncome > 0 ? ((totalIncome - totalExpenses) / totalIncome) * 100 : 0;

      const { data, error } = await supabase
        .from('financial_reports')
        .insert([{
          user_id: user.id,
          report_type: reportType,
          report_period: period,
          total_income: totalIncome,
          total_expenses: totalExpenses,
          total_investments: totalInvestments,
          savings_rate: savingsRate,
          report_data: {
            expenses_breakdown: expensesData,
            investments_breakdown: investmentsData
          }
        }])
        .select()
        .single();

      if (error) {
        toast({
          title: "त्रुटि",
          description: "रिपोर्ट जेनरेट करने में असफल",
          variant: "destructive"
        });
        return;
      }

      // Type cast the returned data
      const typedData = {
        ...data,
        report_type: data.report_type as FinancialReport['report_type'],
        total_income: data.total_income || 0,
        total_expenses: data.total_expenses || 0,
        total_investments: data.total_investments || 0,
        savings_rate: data.savings_rate || 0
      };

      setReports(prev => [typedData, ...prev]);
      toast({
        title: "सफलता",
        description: "रिपोर्ट सफलतापूर्वक जेनरेट की गई"
      });
    } catch (error) {
      toast({
        title: "त्रुटि",
        description: "रिपोर्ट जेनरेट करने में असफल",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchReports();
  }, [user]);

  return {
    reports,
    loading,
    generateReport,
    refetch: fetchReports
  };
};
