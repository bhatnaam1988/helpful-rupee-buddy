
import { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'en' | 'hi';

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
  };
}

const translations: Translations = {
  // Authentication & Onboarding
  hello: { en: 'Hello', hi: 'नमस्ते' },
  welcome: { en: 'Welcome', hi: 'स्वागत है' },
  logOut: { en: 'Log Out', hi: 'लॉग आउट' },
  loading: { en: 'Loading...', hi: 'लोड हो रहा है...' },
  
  // Navigation & Dashboard
  dashboard: { en: 'Dashboard', hi: 'डैशबोर्ड' },
  expenses: { en: 'Expenses', hi: 'खर्च' },
  investments: { en: 'Investments', hi: 'निवेश' },
  budget: { en: 'Budget', hi: 'बजट' },
  reports: { en: 'Reports', hi: 'रिपोर्ट्स' },
  aiSuggestions: { en: 'AI Suggestions', hi: 'AI सुझाव' },
  yourFinancialDashboard: { en: 'Your Financial Dashboard', hi: 'आपका वित्तीय डैशबोर्ड' },
  
  // Stats & Overview
  totalExpenses: { en: 'Total Expenses', hi: 'कुल खर्च' },
  goalAmount: { en: 'Goal Amount', hi: 'लक्ष्य राशि' },
  monthlyIncome: { en: 'Monthly Income', hi: 'मासिक आय' },
  thisMonth: { en: 'This Month', hi: 'इस महीने' },
  goalsCompleted: { en: 'Goals Completed', hi: 'लक्ष्य पूरे' },
  perMonth: { en: 'Per Month', hi: 'प्रति महीना' },
  
  // Quick Actions
  addExpense: { en: 'Add Expense', hi: 'खर्च जोड़ें' },
  setGoal: { en: 'Set Goal', hi: 'लक्ष्य निर्धारित करें' },
  updateIncome: { en: 'Update Income', hi: 'आय अपडेट करें' },
  recordNewExpense: { en: 'Record a new expense', hi: 'नया खर्च दर्ज करें' },
  createFinancialGoal: { en: 'Create a financial goal', hi: 'वित्तीय लक्ष्य बनाएं' },
  addMonthlyIncome: { en: 'Add monthly income', hi: 'मासिक आय जोड़ें' },
  addGoal: { en: 'Add Goal', hi: 'लक्ष्य जोड़ें' },
  addIncome: { en: 'Add Income', hi: 'आय जोड़ें' },
  
  // Recent Items
  recentExpenses: { en: 'Recent Expenses', hi: 'हाल के खर्च' },
  yourGoals: { en: 'Your Goals', hi: 'आपके लक्ष्य' },
  moreExpenses: { en: 'more expenses', hi: 'और खर्च' },
  
  // Forms & Modals
  category: { en: 'Category', hi: 'श्रेणी' },
  amount: { en: 'Amount', hi: 'राशि' },
  description: { en: 'Description', hi: 'विवरण' },
  date: { en: 'Date', hi: 'तारीख' },
  cancel: { en: 'Cancel', hi: 'रद्द करें' },
  save: { en: 'Save', hi: 'सेव करें' },
  
  // Goal Related
  goalName: { en: 'Goal Name', hi: 'लक्ष्य का नाम' },
  goalNamePlaceholder: { en: 'e.g., Emergency Fund', hi: 'जैसे, आपातकालीन फंड' },
  setFinancialGoal: { en: 'Set Financial Goal', hi: 'वित्तीय लक्ष्य निर्धारित करें' },
  currentAmount: { en: 'Current Amount', hi: 'वर्तमान राशि' },
  timeline: { en: 'Timeline (months)', hi: 'समयसीमा (महीने)' },
  priority: { en: 'Priority', hi: 'प्राथमिकता' },
  highPriority: { en: 'High', hi: 'उच्च' },
  mediumPriority: { en: 'Medium', hi: 'मध्यम' },
  lowPriority: { en: 'Low', hi: 'निम्न' },
  
  // Expense Categories
  'Food & Groceries': { en: 'Food & Groceries', hi: 'भोजन और किराना' },
  'Transport': { en: 'Transport', hi: 'परिवहन' },
  'Utilities': { en: 'Utilities', hi: 'उपयोगिताएं' },
  'Rent/Housing': { en: 'Rent/Housing', hi: 'किराया/आवास' },
  'Entertainment': { en: 'Entertainment', hi: 'मनोरंजन' },
  'Healthcare': { en: 'Healthcare', hi: 'स्वास्थ्य सेवा' },
  'Shopping': { en: 'Shopping', hi: 'शॉपिंग' },
  'Education': { en: 'Education', hi: 'शिक्षा' },
  'Other': { en: 'Other', hi: 'अन्य' },
  
  // Expense Management
  expenseManagement: { en: 'Expense Management', hi: 'खर्च प्रबंधन' },
  manageExpenses: { en: 'Track and manage your expenses', hi: 'अपने खर्चों को ट्रैक और प्रबंधित करें' },
  addNewExpense: { en: 'Add New Expense', hi: 'नया खर्च जोड़ें' },
  enterExpenseDetails: { en: 'Enter the details of your expense', hi: 'अपने खर्च का विवरण दर्ज करें' },
  selectCategory: { en: 'Select category', hi: 'श्रेणी चुनें' },
  optionalDescription: { en: 'Optional description', hi: 'वैकल्पिक विवरण' },
  allExpenses: { en: 'All Expenses', hi: 'सभी खर्च' },
  noExpensesFound: { en: 'No expenses found', hi: 'कोई खर्च नहीं मिला' },
  actions: { en: 'Actions', hi: 'कार्य' },
  
  // Financial Reports
  financialReports: { en: 'Financial Reports', hi: 'वित्तीय रिपोर्ट्स' },
  noReportsGenerated: { en: 'No reports generated yet', hi: 'अभी तक कोई रिपोर्ट नहीं बनी' },
  generateFirstReport: { en: 'Generate your first report above', hi: 'ऊपर अपनी पहली रिपोर्ट बनाएं' },
  recentReports: { en: 'Recent Reports', hi: 'हाल की रिपोर्ट्स' },
  
  // Budget
  totalMonthlyBudget: { en: 'Total Monthly Budget', hi: 'कुल मासिक बजट' },
  totalSpent: { en: 'Total Spent', hi: 'कुल खर्च' },
  usage: { en: 'Usage', hi: 'उपयोग' },
  
  // Error & Success Messages
  error: { en: 'Error', hi: 'त्रुटि' },
  success: { en: 'Success', hi: 'सफलता' },
  fillAllFields: { en: 'Please fill all required fields', hi: 'कृपया सभी आवश्यक फ़ील्ड भरें' },
  failedToDelete: { en: 'Failed to delete', hi: 'हटाने में असफल' },
  expenseDeleted: { en: 'Expense deleted successfully', hi: 'खर्च सफलतापूर्वक हटा दिया गया' },
  
  // AI Recommendations
  financialRecommendations: { en: 'Financial Recommendations', hi: 'वित्तीय सिफारिशें' },
  getPersonalizedAdvice: { en: 'Get personalized financial advice based on your spending patterns', hi: 'अपने खर्च के पैटर्न के आधार पर व्यक्तिगत वित्तीय सलाह पाएं' },
  getRecommendations: { en: 'Get Recommendations', hi: 'सिफारिशें प्राप्त करें' },
  gettingRecommendations: { en: 'Getting recommendations...', hi: 'सिफारिशें प्राप्त की जा रही हैं...' },
  noRecommendationsYet: { en: 'No recommendations yet', hi: 'अभी तक कोई सिफारिश नहीं' },
  clickButtonForAdvice: { en: 'Click the button above to get personalized financial advice', hi: 'व्यक्तिगत वित्तीय सलाह पाने के लिए ऊपर दिए गए बटन पर क्लिक करें' },
  yourRecommendations: { en: 'Your Recommendations', hi: 'आपकी सिफारिशें' },
  monthlyInvestmentSuggestion: { en: 'Monthly Investment Suggestion', hi: 'मासिक निवेश सुझाव' },
  recommendedInstruments: { en: 'Recommended Instruments', hi: 'सुझाए गए साधन' },
  aiAdvice: { en: 'AI Advice', hi: 'AI सलाह' },
  
  // Language Selection
  hindi: { en: 'Hindi', hi: 'हिंदी' },
  english: { en: 'English', hi: 'अंग्रेजी' },
  
  // Missing Translation Keys
  aiFinancialSuggestions: { en: 'AI Financial Suggestions', hi: 'AI वित्तीय सुझाव' },
  setMonthlyIncome: { en: 'Set Monthly Income', hi: 'मासिक आय सेट करें' },
  excellent: { en: 'Excellent', hi: 'उत्कृष्ट' },
  good: { en: 'Good', hi: 'अच्छा' },
  average: { en: 'Average', hi: 'औसत' },
  warning: { en: 'Needs Attention', hi: 'ध्यान देने की आवश्यकता' },
  getPersonalizedSuggestions: { en: 'Get personalized AI suggestions based on your financial data', hi: 'अपने वित्तीय डेटा के आधार पर व्यक्तिगत AI सुझाव प्राप्त करें' },
  monthlyIncomeAmount: { en: 'Monthly Income Amount', hi: 'मासिक आय राशि' },
  enterMonthlyIncome: { en: 'Enter your monthly income', hi: 'अपनी मासिक आय दर्ज करें' },
  
  // Investment Related
  totalInvestment: { en: 'Total Investment', hi: 'कुल निवेश' },
  currentValue: { en: 'Current Value', hi: 'वर्तमान मूल्य' },
  totalGain: { en: 'Total Gain', hi: 'कुल लाभ' },
  totalLoss: { en: 'Total Loss', hi: 'कुल हानि' },
  yourInvestments: { en: 'Your Investments', hi: 'आपके निवेश' },
  expectedReturn: { en: 'Expected Return', hi: 'अपेक्षित रिटर्न' },
  
  // AI Recommendations Related
  getAiSuggestions: { en: 'Get AI Suggestions', hi: 'AI सुझाव प्राप्त करें' },
  analyzing: { en: 'Analyzing...', hi: 'विश्लेषण हो रहा है...' },
  failedToGetAiSuggestions: { en: 'Failed to get AI suggestions', hi: 'AI सुझाव प्राप्त करने में असफल' }
};

interface LanguageContextType {
  currentLanguage: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  translateCategory: (category: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'en' || saved === 'hi') ? saved : 'en';
  });

  const setLanguage = (lang: Language) => {
    setCurrentLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    const translation = translations[key];
    if (!translation) {
      console.warn(`Translation missing for key: ${key}`);
      return key;
    }
    return translation[currentLanguage] || key;
  };

  const translateCategory = (category: string): string => {
    return t(category);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, setLanguage, t, translateCategory }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
