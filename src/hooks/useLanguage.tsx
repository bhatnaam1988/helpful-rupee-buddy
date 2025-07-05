
import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'hi' | 'en';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  hi: {
    // Dashboard
    hello: 'नमस्ते',
    dashboard: 'डैशबोर्ड',
    yourFinancialDashboard: 'आपका वित्तीय डैशबोर्ड',
    logOut: 'लॉग आउट',
    totalExpenses: 'कुल खर्च',
    thisMonth: 'इस महीने',
    goalAmount: 'लक्ष्य राशि',
    goalsCompleted: 'लक्ष्य पूर्ण',
    monthlyIncome: 'मासिक आय',
    perMonth: 'प्रति माह',
    
    // Quick Actions
    addExpense: 'खर्च जोड़ें',
    recordNewExpense: 'नया खर्च रिकॉर्ड करें',
    setGoal: 'लक्ष्य सेट करें',
    createFinancialGoal: 'वित्तीय लक्ष्य बनाएं',
    addGoal: 'लक्ष्य जोड़ें',
    updateIncome: 'आय अपडेट करें',
    addMonthlyIncome: 'मासिक आय जोड़ें',
    addIncome: 'आय जोड़ें',
    
    // Navigation
    investments: 'निवेश',
    budget: 'बजट',
    reports: 'रिपोर्ट्स',
    aiSuggestions: 'AI सुझाव',
    expenses: 'खर्च',
    
    // Expense Management
    expenseManagement: 'खर्च प्रबंधन',
    manageExpenses: 'अपने सभी खर्चों को देखें और प्रबंधित करें',
    allExpenses: 'सभी खर्च',
    addNewExpense: 'नया खर्च जोड़ें',
    enterExpenseDetails: 'खर्च की विवरण दर्ज करें',
    category: 'श्रेणी',
    amount: 'राशि',
    description: 'विवरण',
    date: 'दिनांक',
    actions: 'कार्य',
    selectCategory: 'श्रेणी चुनें',
    optionalDescription: 'वैकल्पिक विवरण',
    noExpensesFound: 'कोई खर्च नहीं मिला',
    
    // Common
    loading: 'लोड हो रहा है...',
    error: 'त्रुटि',
    success: 'सफलता',
    fillAllFields: 'कृपया सभी आवश्यक फ़ील्ड भरें',
    failedToDelete: 'डिलीट करने में विफल',
    expenseDeleted: 'खर्च सफलतापूर्वक डिलीट किया गया',
    
    // Language
    language: 'भाषा',
    hindi: 'हिंदी',
    english: 'अंग्रेजी'
  },
  en: {
    // Dashboard
    hello: 'Hello',
    dashboard: 'Dashboard',
    yourFinancialDashboard: 'Your Financial Dashboard',
    logOut: 'Log Out',
    totalExpenses: 'Total Expenses',
    thisMonth: 'This Month',
    goalAmount: 'Goal Amount',
    goalsCompleted: 'Goals Completed',
    monthlyIncome: 'Monthly Income',
    perMonth: 'Per Month',
    
    // Quick Actions
    addExpense: 'Add Expense',
    recordNewExpense: 'Record New Expense',
    setGoal: 'Set Goal',
    createFinancialGoal: 'Create Financial Goal',
    addGoal: 'Add Goal',
    updateIncome: 'Update Income',
    addMonthlyIncome: 'Add Monthly Income',
    addIncome: 'Add Income',
    
    // Navigation
    investments: 'Investments',
    budget: 'Budget',
    reports: 'Reports',
    aiSuggestions: 'AI Suggestions',
    expenses: 'Expenses',
    
    // Expense Management
    expenseManagement: 'Expense Management',
    manageExpenses: 'View and manage all your expenses',
    allExpenses: 'All Expenses',
    addNewExpense: 'Add New Expense',
    enterExpenseDetails: 'Enter expense details',
    category: 'Category',
    amount: 'Amount',
    description: 'Description',
    date: 'Date',
    actions: 'Actions',
    selectCategory: 'Select Category',
    optionalDescription: 'Optional Description',
    noExpensesFound: 'No expenses found',
    
    // Common
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    fillAllFields: 'Please fill all required fields',
    failedToDelete: 'Failed to delete',
    expenseDeleted: 'Expense deleted successfully',
    
    // Language
    language: 'Language',
    hindi: 'Hindi',
    english: 'English'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>('hi');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'hi' || savedLanguage === 'en')) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[currentLanguage][key as keyof typeof translations['hi']] || key;
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
