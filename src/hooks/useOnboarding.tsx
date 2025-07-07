
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export const useOnboarding = () => {
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  console.log("useOnboarding hook called, user:", !!user);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      console.log("Checking onboarding status for user:", !!user);
      
      if (!user) {
        console.log("No user, setting loading to false");
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_onboarding')
          .select('has_completed_onboarding')
          .eq('user_id', user.id)
          .single();

        console.log("Onboarding check result:", { data, error });

        if (error && error.code === 'PGRST116') {
          // No onboarding record exists, show onboarding
          console.log("No onboarding record found, showing onboarding");
          setShouldShowOnboarding(true);
        } else if (error) {
          console.error('Error checking onboarding status:', error);
          setShouldShowOnboarding(false);
        } else {
          console.log("Onboarding completed:", data?.has_completed_onboarding);
          setShouldShowOnboarding(!data?.has_completed_onboarding);
        }
      } catch (error) {
        console.error('Error in onboarding check:', error);
        setShouldShowOnboarding(false);
      } finally {
        console.log("Setting onboarding loading to false");
        setLoading(false);
      }
    };

    checkOnboardingStatus();
  }, [user]);

  const completeOnboarding = async () => {
    console.log("Completing onboarding for user:", !!user);
    
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
        console.error('Error completing onboarding:', error);
      } else {
        console.log("Onboarding completed successfully");
        setShouldShowOnboarding(false);
      }
    } catch (error) {
      console.error('Error in completeOnboarding:', error);
    }
  };

  const skipOnboarding = async () => {
    console.log("Skipping onboarding");
    await completeOnboarding();
  };

  console.log("useOnboarding state:", { shouldShowOnboarding, loading });

  return {
    shouldShowOnboarding,
    loading,
    completeOnboarding,
    skipOnboarding
  };
};
