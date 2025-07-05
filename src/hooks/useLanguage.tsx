import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'hi' | 'en';

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translateCategory: (category: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Standard category mapping - English categories are stored in DB
const categoryTranslations = {
  'Food & Groceries': { hi: 'भोजन और किराना', en: 'Food & Groceries' },
  'Transport': { hi: 'परिवहन', en: 'Transport' },
  'Utilities': { hi: 'उपयोगिताएं', en: 'Utilities' },
  'Rent/Housing': { hi: 'किराया/आवास', en: 'Rent/Housing' },
  'Entertainment': { hi: 'मनोरंजन', en: 'Entertainment' },
  'Healthcare': { hi: 'स्वास्थ्य सेवा', en: 'Healthcare' },
  'Shopping': { hi: 'खरीदारी', en: 'Shopping' },
  'Education': { hi: 'शिक्षा', en: 'Education' },
  'Other': { hi: 'अन्य', en: 'Other' }
};

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
    
    // Recent Items
    recentExpenses: 'हाल के खर्च',
    yourGoals: 'आपके लक्ष्य',
    
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
    cancel: 'रद्द करें',
    
    // Budget Tracker
    budgetTracker: 'बजट ट्रैकर',
    totalMonthlyBudget: 'कुल मासिक बजट',
    totalSpent: 'कुल खर्च',
    usage: 'उपयोग',
    categoryWiseBudget: 'श्रेणी अनुसार बजट',
    noBudgetSet: 'अभी तक कोई बजट सेट नहीं किया गया',
    setBudgetFirst: 'पहले बजट सेट करें',
    remaining: 'बचा है',
    exceeded: 'अधिक खर्च',
    limit: 'सीमा',
    spent: 'खर्च',
    
    // Investment Portfolio
    investmentPortfolio: 'निवेश पोर्टफोलियो',
    totalInvestment: 'कुल निवेश',
    currentValue: 'वर्तमान मूल्य',
    totalGain: 'कुल लाभ',
    totalLoss: 'कुल हानि',
    yourInvestments: 'आपके निवेश',
    noInvestments: 'अभी तक कोई निवेश नहीं है',
    startInvestingToday: 'आज ही निवेश शुरू करें',
    expectedReturn: 'अपेक्षित रिटर्न',
    active: 'सक्रिय',
    matured: 'परिपक्व',
    closed: 'बंद',
    
    // Financial Reports
    financialReports: 'वित्तीय रिपोर्ट्स',
    generateNewReport: 'नई रिपोर्ट जेनरेट करें',
    selectReportType: 'रिपोर्ट प्रकार चुनें',
    monthlyReport: 'मासिक रिपोर्ट',
    quarterlyReport: 'त्रैमासिक रिपोर्ट',
    yearlyReport: 'वार्षिक रिपोर्ट',
    generateReport: 'रिपोर्ट जेनरेट करें',
    generating: 'जेनरेट हो रही है...',
    recentReports: 'हाल की रिपोर्ट्स',
    noReportsGenerated: 'अभी तक कोई रिपोर्ट नहीं बनाई गई',
    generateFirstReport: 'ऊपर से अपनी पहली रिपोर्ट जेनरेट करें',
    totalIncome: 'कुल आय',
    totalInvestments: 'कुल निवेश',
    savingsRate: 'बचत दर',
    createdOn: 'को बनाई गई',
    monthly: 'मासिक',
    quarterly: 'त्रैमासिक',
    yearly: 'वार्षिक',
    report: 'रिपोर्ट',
    
    // Categories - keeping original keys for backward compatibility
    foodGroceries: 'भोजन और किराना',
    transport: 'परिवहन',
    utilities: 'उपयोगिताएं',
    rentHousing: 'किराया/आवास',
    entertainment: 'मनोरंजन',
    healthcare: 'स्वास्थ्य सेवा',
    shopping: 'खरीदारी',
    education: 'शिक्षा',
    other: 'अन्य',
    
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
    
    // Recent Items
    recentExpenses: 'Recent Expenses',
    yourGoals: 'Your Goals',
    
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
    cancel: 'Cancel',
    
    // Budget Tracker
    budgetTracker: 'Budget Tracker',
    totalMonthlyBudget: 'Total Monthly Budget',
    totalSpent: 'Total Spent',
    usage: 'Usage',
    categoryWiseBudget: 'Category-wise Budget',
    noBudgetSet: 'No budget has been set yet',
    setBudgetFirst: 'Set budget first',
    remaining: 'remaining',
    exceeded: 'exceeded',
    limit: 'Limit',
    spent: 'Spent',
    
    // Investment Portfolio
    investmentPortfolio: 'Investment Portfolio',
    totalInvestment: 'Total Investment',
    currentValue: 'Current Value',
    totalGain: 'Total Gain',
    totalLoss: 'Total Loss',
    yourInvestments: 'Your Investments',
    noInvestments: 'No investments yet',
    startInvestingToday: 'Start investing today',
    expectedReturn: 'Expected Return',
    active: 'Active',
    matured: 'Matured',
    closed: 'Closed',
    
    // Financial Reports
    financialReports: 'Financial Reports',
    generateNewReport: 'Generate New Report',
    selectReportType: 'Select Report Type',
    monthlyReport: 'Monthly Report',
    quarterlyReport: 'Quarterly Report',
    yearlyReport: 'Yearly Report',
    generateReport: 'Generate Report',
    generating: 'Generating...',
    recentReports: 'Recent Reports',
    noReportsGenerated: 'No reports generated yet',
    generateFirstReport: 'Generate your first report from above',
    totalIncome: 'Total Income',
    totalInvestments: 'Total Investments',
    savingsRate: 'Savings Rate',
    createdOn: 'created on',
    monthly: 'Monthly',
    quarterly: 'Quarterly',
    yearly: 'Yearly',
    report: 'Report',
    
    // Categories - keeping original keys for backward compatibility
    foodGroceries: 'Food & Groceries',
    transport: 'Transport',
    utilities: 'Utilities',
    rentHousing: 'Rent/Housing',
    entertainment: 'Entertainment',
    healthcare: 'Healthcare',
    shopping: 'Shopping',
    education: 'Education',
    other: 'Other',
    
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

  const translateCategory = (category: string): string => {
    const categoryMap = categoryTranslations[category as keyof typeof categoryTranslations];
    if (categoryMap) {
      return categoryMap[currentLanguage];
    }
    return category; // fallback to original if not found
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, translateCategory }}>
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
