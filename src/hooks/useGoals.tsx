
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';
import { useToast } from './use-toast';

export interface Goal {
  id: string;
  user_id: string;
  name: string;
  target_amount: number;
  current_amount: number;
  timeline_months?: number;
  priority: 'High' | 'Medium' | 'Low';
  created_at: string;
  updated_at: string;
}

export const useGoals = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  const fetchGoals = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('goals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching goals:', error);
        return;
      }

      setGoals(data || []);
    } catch (error) {
      console.error('Error fetching goals:', error);
    } finally {
      setLoading(false);
    }
  };

  const addGoal = async (goal: Omit<Goal, 'id' | 'user_id' | 'created_at' | 'updated_at'>) => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('goals')
        .insert([{ ...goal, user_id: user.id }])
        .select()
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to add goal",
          variant: "destructive"
        });
        return;
      }

      setGoals(prev => [data, ...prev]);
      toast({
        title: "Success",
        description: "Goal added successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add goal",
        variant: "destructive"
      });
    }
  };

  const updateGoal = async (id: string, updates: Partial<Goal>) => {
    try {
      const { data, error } = await supabase
        .from('goals')
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        toast({
          title: "Error",
          description: "Failed to update goal",
          variant: "destructive"
        });
        return;
      }

      setGoals(prev => prev.map(goal => goal.id === id ? data : goal));
      toast({
        title: "Success",
        description: "Goal updated successfully"
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update goal",
        variant: "destructive"
      });
    }
  };

  useEffect(() => {
    fetchGoals();
  }, [user]);

  return {
    goals,
    loading,
    addGoal,
    updateGoal,
    refetch: fetchGoals
  };
};
