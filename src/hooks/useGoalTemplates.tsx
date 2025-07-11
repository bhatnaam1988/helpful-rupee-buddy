import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface GoalTemplate {
  id: string;
  name_en: string;
  name_hi: string;
  description_en?: string;
  description_hi?: string;
  suggested_amount: number;
  suggested_timeline_months: number;
  priority: string;
  icon_name: string;
  is_popular: boolean;
}

export const useGoalTemplates = () => {
  const [templates, setTemplates] = useState<GoalTemplate[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTemplates = async () => {
    try {
      const { data, error } = await supabase
        .from('goal_templates')
        .select('*')
        .order('is_popular', { ascending: false });

      if (error) {
        console.error('Error fetching goal templates:', error);
        // Fallback to default templates
        setTemplates([
          {
            id: '1',
            name_en: 'Emergency Fund',
            name_hi: 'आपातकालीन फंड',
            description_en: '6 months of expenses for emergencies',
            description_hi: '6 महीने का खर्च आपातकाल के लिए',
            suggested_amount: 150000,
            suggested_timeline_months: 24,
            priority: 'High',
            icon_name: 'Shield',
            is_popular: true
          },
          {
            id: '2',
            name_en: 'Child Education',
            name_hi: 'बच्चों की शिक्षा',
            description_en: 'Save for your child\'s education',
            description_hi: 'अपने बच्चे की शिक्षा के लिए बचत',
            suggested_amount: 500000,
            suggested_timeline_months: 60,
            priority: 'High',
            icon_name: 'GraduationCap',
            is_popular: true
          },
          {
            id: '3',
            name_en: 'Vehicle Purchase',
            name_hi: 'वाहन खरीदना',
            description_en: 'Save for a two-wheeler or car',
            description_hi: 'दोपहिया या कार के लिए बचत',
            suggested_amount: 80000,
            suggested_timeline_months: 18,
            priority: 'Medium',
            icon_name: 'Car',
            is_popular: true
          }
        ]);
      } else {
        setTemplates(data || []);
      }
    } catch (error) {
      console.error('Error fetching goal templates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return {
    templates,
    loading,
    refetch: fetchTemplates
  };
};