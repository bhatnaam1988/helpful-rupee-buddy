-- Phase 1: Critical Database Security Fixes

-- 1. Add missing DELETE policy for profiles table
CREATE POLICY "Users can delete own profile" 
ON public.profiles 
FOR DELETE 
USING (auth.uid() = id);

-- 2. Fix database function security vulnerabilities
-- Update handle_new_user function with proper security
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, name, monthly_income, age, preferred_language)
  VALUES (
    NEW.id, 
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    35000, -- Default income for blue-collar worker
    32,    -- Default age as per persona
    'hi'   -- Default to Hindi
  );
  RETURN NEW;
END;
$$;

-- Update create_user_onboarding function with proper security
CREATE OR REPLACE FUNCTION public.create_user_onboarding()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.user_onboarding (user_id)
  VALUES (NEW.id)
  ON CONFLICT (user_id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Update update_budget_spent function with proper security
CREATE OR REPLACE FUNCTION public.update_budget_spent()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  -- Update current_spent for matching budget category
  UPDATE public.budget_categories 
  SET current_spent = (
    SELECT COALESCE(SUM(amount), 0) 
    FROM public.expenses 
    WHERE user_id = NEW.user_id 
    AND category = NEW.category
    AND EXTRACT(MONTH FROM expense_date) = EXTRACT(MONTH FROM CURRENT_DATE)
    AND EXTRACT(YEAR FROM expense_date) = EXTRACT(YEAR FROM CURRENT_DATE)
  )
  WHERE user_id = NEW.user_id 
  AND category_name = NEW.category;
  
  RETURN NEW;
END;
$$;