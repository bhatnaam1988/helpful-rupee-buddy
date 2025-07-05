
-- Create investment tracking table
CREATE TABLE public.investments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  instrument_name TEXT NOT NULL,
  investment_type TEXT NOT NULL CHECK (investment_type IN ('SIP', 'Lump Sum', 'FD', 'Stocks', 'Bonds', 'PPF', 'EPF', 'Other')),
  amount DECIMAL(10,2) NOT NULL,
  investment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  maturity_date DATE,
  expected_return_rate DECIMAL(5,2),
  current_value DECIMAL(10,2) DEFAULT 0,
  status TEXT DEFAULT 'Active' CHECK (status IN ('Active', 'Matured', 'Closed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create budget categories table
CREATE TABLE public.budget_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  category_name TEXT NOT NULL,
  monthly_limit DECIMAL(10,2) NOT NULL,
  current_spent DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create financial reports table
CREATE TABLE public.financial_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  report_type TEXT NOT NULL CHECK (report_type IN ('Monthly', 'Quarterly', 'Yearly')),
  report_period TEXT NOT NULL,
  total_income DECIMAL(10,2) DEFAULT 0,
  total_expenses DECIMAL(10,2) DEFAULT 0,
  total_investments DECIMAL(10,2) DEFAULT 0,
  savings_rate DECIMAL(5,2) DEFAULT 0,
  report_data JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on all new tables
ALTER TABLE public.investments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.budget_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financial_reports ENABLE ROW LEVEL SECURITY;

-- RLS policies for investments
CREATE POLICY "Users can view own investments" ON public.investments
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own investments" ON public.investments
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own investments" ON public.investments
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own investments" ON public.investments
  FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for budget categories
CREATE POLICY "Users can view own budget categories" ON public.budget_categories
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own budget categories" ON public.budget_categories
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own budget categories" ON public.budget_categories
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own budget categories" ON public.budget_categories
  FOR DELETE USING (auth.uid() = user_id);

-- RLS policies for financial reports
CREATE POLICY "Users can view own financial reports" ON public.financial_reports
  FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own financial reports" ON public.financial_reports
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own financial reports" ON public.financial_reports
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own financial reports" ON public.financial_reports
  FOR DELETE USING (auth.uid() = user_id);

-- Function to update budget spent amounts when expenses are added
CREATE OR REPLACE FUNCTION update_budget_spent()
RETURNS TRIGGER AS $$
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
$$ LANGUAGE plpgsql;

-- Trigger to update budget when expenses are added
CREATE TRIGGER update_budget_on_expense
  AFTER INSERT OR UPDATE OR DELETE ON public.expenses
  FOR EACH ROW EXECUTE FUNCTION update_budget_spent();
