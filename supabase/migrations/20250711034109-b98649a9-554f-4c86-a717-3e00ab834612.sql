-- Comprehensive DB refactor for blue-collar worker persona (Fixed)

-- First, add missing columns to profiles table to align with spec
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS phone TEXT,
ADD COLUMN IF NOT EXISTS occupation TEXT DEFAULT 'Worker',
ADD COLUMN IF NOT EXISTS family_size INTEGER DEFAULT 1,
ADD COLUMN IF NOT EXISTS preferred_language TEXT DEFAULT 'hi';

-- Update existing profiles to have better defaults for blue-collar workers
UPDATE public.profiles 
SET monthly_income = COALESCE(monthly_income, 35000)
WHERE monthly_income IS NULL;

-- Create expense categories specific to blue-collar workers
CREATE TABLE IF NOT EXISTS public.expense_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en TEXT NOT NULL UNIQUE,
  name_hi TEXT NOT NULL,
  icon_name TEXT NOT NULL,
  is_default BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert blue-collar specific expense categories
INSERT INTO public.expense_categories (name_en, name_hi, icon_name, sort_order) VALUES
('Food & Groceries', 'खाना और किराना', 'ShoppingCart', 1),
('Transport', 'यातायात', 'Car', 2),
('Utilities', 'बिजली/पानी/गैस', 'Zap', 3),
('Rent/Housing', 'किराया/मकान', 'Home', 4),
('Healthcare', 'स्वास्थ्य', 'Heart', 5),
('Education', 'शिक्षा', 'BookOpen', 6),
('Entertainment', 'मनोरंजन', 'Tv', 7),
('Clothing', 'कपड़े', 'Shirt', 8),
('Mobile/Internet', 'मोबाइल/इंटरनेट', 'Smartphone', 9),
('Others', 'अन्य', 'MoreHorizontal', 10)
ON CONFLICT (name_en) DO NOTHING;

-- Create goal templates for blue-collar workers
CREATE TABLE IF NOT EXISTS public.goal_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name_en TEXT NOT NULL UNIQUE,
  name_hi TEXT NOT NULL,
  description_en TEXT,
  description_hi TEXT,
  suggested_amount NUMERIC DEFAULT 0,
  suggested_timeline_months INTEGER DEFAULT 12,
  priority TEXT DEFAULT 'Medium',
  icon_name TEXT DEFAULT 'Target',
  is_popular BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert goal templates specific to blue-collar workers
INSERT INTO public.goal_templates (name_en, name_hi, description_en, description_hi, suggested_amount, suggested_timeline_months, priority, icon_name, is_popular) VALUES
('Emergency Fund', 'आपातकालीन फंड', '6 months of expenses for emergencies', '6 महीने का खर्च आपातकाल के लिए', 150000, 24, 'High', 'Shield', true),
('Child Education', 'बच्चों की शिक्षा', 'Save for your child''s education', 'अपने बच्चे की शिक्षा के लिए बचत', 500000, 60, 'High', 'GraduationCap', true),
('Vehicle Purchase', 'वाहन खरीदना', 'Save for a two-wheeler or car', 'दोपहिया या कार के लिए बचत', 80000, 18, 'Medium', 'Car', true),
('House Down Payment', 'घर की अग्रिम राशि', 'Save for home down payment', 'घर की अग्रिम राशि के लिए बचत', 300000, 36, 'High', 'Home', true),
('Festival Expenses', 'त्योहार का खर्च', 'Save for festivals and celebrations', 'त्योहार और उत्सव के लिए बचत', 25000, 12, 'Medium', 'Gift', false),
('Medical Insurance', 'मेडिकल बीमा', 'Health insurance for family', 'परिवार के लिए स्वास्थ्य बीमा', 15000, 6, 'High', 'Heart', true),
('Skill Development', 'कौशल विकास', 'Learn new skills or get certification', 'नए कौशल सीखें या प्रमाणन प्राप्त करें', 20000, 12, 'Medium', 'BookOpen', false)
ON CONFLICT (name_en) DO NOTHING;

-- Create simplified investment recommendations table
CREATE TABLE IF NOT EXISTS public.investment_advice (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  monthly_surplus NUMERIC NOT NULL,
  suggested_investment_amount NUMERIC NOT NULL,
  risk_level TEXT NOT NULL CHECK (risk_level IN ('Low', 'Medium', 'High')),
  time_horizon TEXT NOT NULL CHECK (time_horizon IN ('Short', 'Medium', 'Long')),
  recommended_instruments JSONB,
  advice_text_en TEXT,
  advice_text_hi TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.expense_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goal_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_advice ENABLE ROW LEVEL SECURITY;

-- RLS policies for expense_categories (read-only for all authenticated users)
CREATE POLICY "Everyone can view expense categories" ON public.expense_categories
  FOR SELECT TO authenticated USING (true);

-- RLS policies for goal_templates (read-only for all authenticated users)  
CREATE POLICY "Everyone can view goal templates" ON public.goal_templates
  FOR SELECT TO authenticated USING (true);

-- RLS policies for investment_advice
CREATE POLICY "Users can view own investment advice" ON public.investment_advice
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own investment advice" ON public.investment_advice
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own investment advice" ON public.investment_advice
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own investment advice" ON public.investment_advice
  FOR DELETE USING (auth.uid() = user_id);

-- Update profile creation trigger to include blue-collar defaults
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql;