
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface Investment {
  id: string;
  user_id: string;
  instrument_name: string;
  investment_type: 'SIP' | 'Lump Sum' | 'FD' | 'Stocks' | 'Bonds' | 'PPF' | 'EPF' | 'Other';
  amount: number;
  investment_date: string;
  maturity_date?: string;
  expected_return_rate?: number;
  current_value: number;
  status: 'Active' | 'Matured' | 'Closed';
  created_at: string;
  updated_at: string;
}

export const useInvestments = () => {
  const [investments, setInvestments] = useState<Investment[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchInvestments = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('investments')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching investments:', error);
        return;
      }

      setInvestments(data || []);
    } catch (error) {
      console.error('Error fetching investments:', error);
    } finally {
      setLoading(false);
    }
  };

  const addInvestment = async (investment: Omit<Investment, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('investments')
        .insert([{ ...investment, user_id: user.id }])
        .select()
        .single();

      if (error) {
        toast({
          title: "त्रुटि",
          description: "निवेश जोड़ने में असफल",
          variant: "destructive"
        });
        return;
      }

      setInvestments(prev => [data, ...prev]);
      toast({
        title: "सफलता",
        description: "निवेश सफलतापूर्वक जोड़ा गया"
      });
    } catch (error) {
      toast({
        title: "त्रुटि",
        description: "निवेश जोड़ने में असफल",
        variant: "destructive"
      });
    }
  };

  const updateInvestment = async (id: string, updates: Partial<Investment>) => {
    try {
      const { data, error } = await supabase
        .from('investments')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        toast({
          title: "त्रुटि",
          description: "निवेश अपडेट करने में असफल",
          variant: "destructive"
        });
        return;
      }

      setInvestments(prev => prev.map(inv => inv.id === id ? data : inv));
      toast({
        title: "सफलता",
        description: "निवेश सफलतापूर्वक अपडेट किया गया"
      });
    } catch (error) {
      toast({
        title: "त्रुटि",
        description: "निवेश अपडेट करने में असफल",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchInvestments();
  }, [user]);

  return {
    investments,
    loading,
    addInvestment,
    updateInvestment,
    refetch: fetchInvestments
  };
};
