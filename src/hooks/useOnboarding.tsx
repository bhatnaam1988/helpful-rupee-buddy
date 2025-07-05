
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from './useAuth';

export interface OnboardingStatus {
  id: string;
  user_id: string;
  has_completed_onboarding: boolean;
  last_onboarding_shown: string;
  onboarding_version: number;
  created_at: string;
  updated_at: string;
}

export const useOnboarding = () => {
  const [onboardingStatus, setOnboardingStatus] = useState<OnboardingStatus | null>(null);
  const [loading, setLoading] = useState(true);
  const [shouldShowOnboarding, setShouldShowOnboarding] = useState(false);
  const { user } = useAuth();

  const CURRENT_ONBOARDING_VERSION = 1;
  const REFRESH_INTERVAL_DAYS = 7;

  const fetchOnboardingStatus = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('user_onboarding')
        .select('*')
        .eq('user_id', user.id)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching onboarding status:', error);
        return;
      }

      if (!data) {
        // Create onboarding record if it doesn't exist
        const { data: newRecord, error: insertError } = await supabase
          .from('user_onboarding')
          .insert([{ user_id: user.id }])
          .select()
          .single();

        if (insertError) {
          console.error('Error creating onboarding record:', insertError);
          return;
        }

        setOnboardingStatus(newRecord);
        setShouldShowOnboarding(true);
      } else {
        setOnboardingStatus(data);
        
        // Check if we should show onboarding
        const lastShown = new Date(data.last_onboarding_shown);
        const now = new Date();
        const daysSinceLastShown = Math.floor((now.getTime() - lastShown.getTime()) / (1000 * 60 * 60 * 24));
        
        const shouldShow = !data.has_completed_onboarding || 
                          daysSinceLastShown >= REFRESH_INTERVAL_DAYS ||
                          data.onboarding_version < CURRENT_ONBOARDING_VERSION;
        
        setShouldShowOnboarding(shouldShow);
      }
    } catch (error) {
      console.error('Error in fetchOnboardingStatus:', error);
    } finally {
      setLoading(false);
    }
  };

  const completeOnboarding = async () => {
    if (!user || !onboardingStatus) return;

    try {
      const { error } = await supabase
        .from('user_onboarding')
        .update({
          has_completed_onboarding: true,
          last_onboarding_shown: new Date().toISOString(),
          onboarding_version: CURRENT_ONBOARDING_VERSION,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating onboarding status:', error);
        return;
      }

      setShouldShowOnboarding(false);
    } catch (error) {
      console.error('Error completing onboarding:', error);
    }
  };

  const skipOnboarding = async () => {
    if (!user || !onboardingStatus) return;

    try {
      const { error } = await supabase
        .from('user_onboarding')
        .update({
          last_onboarding_shown: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id);

      if (error) {
        console.error('Error updating onboarding status:', error);
        return;
      }

      setShouldShowOnboarding(false);
    } catch (error) {
      console.error('Error skipping onboarding:', error);
    }
  };

  useEffect(() => {
    fetchOnboardingStatus();
  }, [user]);

  return {
    shouldShowOnboarding,
    loading,
    completeOnboarding,
    skipOnboarding,
    onboardingStatus
  };
};
