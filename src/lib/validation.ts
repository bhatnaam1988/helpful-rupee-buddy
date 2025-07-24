import { z } from 'zod';

// Security utilities
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .replace(/javascript:/gi, '') // Remove javascript: protocol
    .replace(/on\w+=/gi, '') // Remove event handlers
    .trim();
};

export const validateAmount = (amount: number): boolean => {
  return amount > 0 && amount <= 10000000 && Number.isFinite(amount);
};

export const validateDate = (dateString: string): boolean => {
  const date = new Date(dateString);
  const now = new Date();
  return date instanceof Date && !isNaN(date.getTime()) && date <= now;
};

// Validation schemas
export const budgetCategorySchema = z.object({
  category_name: z.string()
    .min(1, 'Category name is required')
    .max(50, 'Category name too long')
    .transform(sanitizeInput),
  monthly_limit: z.number()
    .min(1, 'Monthly limit must be positive')
    .max(10000000, 'Monthly limit too high')
    .refine(validateAmount, 'Invalid amount')
});

export const investmentSchema = z.object({
  instrument_name: z.string()
    .min(1, 'Instrument name is required')
    .max(100, 'Instrument name too long')
    .transform(sanitizeInput),
  investment_type: z.enum(['SIP', 'Lump Sum', 'FD', 'Stocks', 'Bonds', 'PPF', 'EPF', 'Other']),
  amount: z.number()
    .min(1, 'Amount must be positive')
    .max(10000000, 'Amount too high')
    .refine(validateAmount, 'Invalid amount'),
  investment_date: z.string()
    .refine(validateDate, 'Invalid investment date'),
  maturity_date: z.string().optional()
    .refine((date) => !date || new Date(date) > new Date(), 'Maturity date must be in future'),
  expected_return_rate: z.number()
    .min(0, 'Return rate cannot be negative')
    .max(100, 'Return rate too high')
    .optional(),
  current_value: z.number()
    .min(0, 'Current value cannot be negative')
    .max(10000000, 'Current value too high')
    .optional()
});

export const expenseSchema = z.object({
  amount: z.number()
    .min(0.01, 'Amount must be positive')
    .max(1000000, 'Amount too high')
    .refine(validateAmount, 'Invalid amount'),
  category: z.string()
    .min(1, 'Category is required')
    .max(50, 'Category name too long')
    .transform(sanitizeInput),
  description: z.string()
    .max(200, 'Description too long')
    .transform(sanitizeInput)
    .optional(),
  expense_date: z.string()
    .refine(validateDate, 'Invalid expense date')
});

export const authSchema = z.object({
  email: z.string()
    .email('Invalid email format')
    .max(100, 'Email too long'),
  password: z.string()
    .min(8, 'Password must be at least 8 characters')
    .max(100, 'Password too long')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain uppercase, lowercase and number'),
  name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name too long')
    .transform(sanitizeInput)
    .optional()
});