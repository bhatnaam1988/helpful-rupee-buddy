
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const useOnboarding = () => {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_onboarding')
          .select('has_completed_onboarding')
          .eq('user_id', user.id)
          .single();

        if (error && error.code === 'PGRST116') {
          // No onboarding record exists, show onboarding
          setShouldShowOnboarding(true);
        } else if (error) {
          console.error('Onboarding check error:', error.message);
          setShouldShowOnboarding(false);
        } else {
          setShouldShowOnboarding(!data?.has_completed_onboarding);
        }
      } catch (error) {
        console.error('Onboarding error:', error instanceof Error ? error.message : 'Unknown error');
        setShouldShowOnboarding(false);
      } finally {
        setLoading(false);
      }
    };

    checkOnboardingStatus();
  }, [user]);

  const completeOnboarding = async () => {
    if (!user) return;

    try {
      const { error } = await supabase
        .from('user_onboarding')
        .upsert({
          user_id: user.id,
          has_completed_onboarding: true,
          onboarding_version: 1
        });

      if (error) {
        console.error('Onboarding completion error:', error.message);
      } else {
        setShouldShowOnboarding(false);
      }
    } catch (error) {
      console.error('Onboarding error:', error instanceof Error ? error.message : 'Unknown error');
    }
  };

  const skipOnboarding = async () => {
    await completeOnboarding();
  };

  return {
    shouldShowOnboarding,
    loading,
    completeOnboarding,
    skipOnboarding
  };
};
