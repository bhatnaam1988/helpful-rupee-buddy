import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface ExpenseCategory {
  id: string;
  name_en: string;
  name_hi: string;
  icon_name: string;
  is_default: boolean;
  sort_order: number;
}

export const useExpenseCategories = () => {
  const [categories, setCategories] = useState<ExpenseCategory[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('expense_categories')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) {
        console.error('Error fetching expense categories:', error);
        // Fallback to default categories
        setCategories([
          { id: '1', name_en: 'Food & Groceries', name_hi: 'खाना और किराना', icon_name: 'ShoppingCart', is_default: true, sort_order: 1 },
          { id: '2', name_en: 'Transport', name_hi: 'यातायात', icon_name: 'Car', is_default: true, sort_order: 2 },
          { id: '3', name_en: 'Utilities', name_hi: 'बिजली/पानी/गैस', icon_name: 'Zap', is_default: true, sort_order: 3 },
          { id: '4', name_en: 'Rent/Housing', name_hi: 'किराया/मकान', icon_name: 'Home', is_default: true, sort_order: 4 },
          { id: '5', name_en: 'Healthcare', name_hi: 'स्वास्थ्य', icon_name: 'Heart', is_default: true, sort_order: 5 },
          { id: '6', name_en: 'Others', name_hi: 'अन्य', icon_name: 'MoreHorizontal', is_default: true, sort_order: 10 }
        ]);
      } else {
        setCategories(data || []);
      }
    } catch (error) {
      console.error('Error fetching expense categories:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return {
    categories,
    loading,
    refetch: fetchCategories
  };
};