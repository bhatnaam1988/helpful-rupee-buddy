
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface BudgetCategory {
  id: string;
  user_id: string;
  category_name: string;
  monthly_limit: number;
  current_spent: number;
  created_at: string;
  updated_at: string;
}

export const useBudgetCategories = () => {
  const [categories, setCategories] = useState<BudgetCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchCategories = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('budget_categories')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching budget categories:', error);
        return;
      }

      setCategories(data || []);
    } catch (error) {
      console.error('Error fetching budget categories:', error);
    } finally {
      setLoading(false);
    }
  };

  const addCategory = async (category: Omit<BudgetCategory, 'id' | 'user_id' | 'created_at' | 'updated_at' | 'current_spent'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('budget_categories')
        .insert([{ ...category, user_id: user.id }])
        .select()
        .single();

      if (error) {
        toast({
          title: "त्रुटि",
          description: "बजट श्रेणी जोड़ने में असफल",
          variant: "destructive"
        });
        return;
      }

      setCategories(prev => [data, ...prev]);
      toast({
        title: "सफलता",
        description: "बजट श्रेणी सफलतापूर्वक जोड़ी गई"
      });
    } catch (error) {
      toast({
        title: "त्रुटि",
        description: "बजट श्रेणी जोड़ने में असफल",
        variant: "destructive"
      });
    }
  };

  const updateCategory = async (id: string, updates: Partial<BudgetCategory>) => {
    try {
      const { data, error } = await supabase
        .from('budget_categories')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        toast({
          title: "त्रुटि",
          description: "बजट श्रेणी अपडेट करने में असफल",
          variant: "destructive"
        });
        return;
      }

      setCategories(prev => prev.map(cat => cat.id === id ? data : cat));
      toast({
        title: "सफलता",
        description: "बजट श्रेणी सफलतापूर्वक अपडेट की गई"
      });
    } catch (error) {
      toast({
        title: "त्रुटि",
        description: "बजट श्रेणी अपडेट करने में असफल",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [user]);

  return {
    categories,
    loading,
    addCategory,
    updateCategory,
    refetch: fetchCategories
  };
};
