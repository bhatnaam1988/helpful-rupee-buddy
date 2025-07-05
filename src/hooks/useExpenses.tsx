
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface Expense {
  id: string;
  user_id: string;
  category: string;
  amount: number;
  description?: string;
  expense_date: string;
  created_at: string;
}

export const useExpenses = () => {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchExpenses = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('expenses')
        .select('*')
        .eq('user_id', user.id)
        .order('expense_date', { ascending: false });

      if (error) {
        console.error('Error fetching expenses:', error);
        return;
      }

      setExpenses(data || []);
    } catch (error) {
      console.error('Error fetching expenses:', error);
    } finally {
      setLoading(false);
    }
  };

  const addExpense = async (expense: Omit<Expense, 'id' | 'user_id' | 'created_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('expenses')
        .insert([{ ...expense, user_id: user.id }])
        .select()
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add expense",
          variant: "destructive"
        });
        return;
      }

      setExpenses(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Expense added successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add expense",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [user]);

  return {
    expenses,
    loading,
    addExpense,
    refetch: fetchExpenses
  };
};
