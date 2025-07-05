
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Wallet, 
  TrendingUp, 
  Target, 
  PieChart, 
  Brain,
  ChevronLeft,
  ChevronRight,
  ArrowRight
} from 'lucide-react';

interface OnboardingSplashProps {
  onComplete: () => void;
  onSkip: () => void;
}

const OnboardingSplash = ({ onComplete, onSkip }: OnboardingSplashProps) => {
  const [currentPage, setCurrentPage] = useState(0);

  const onboardingPages = [
    {
      title: "वित्तीय प्रबंधन में आपका स्वागत है",
      subtitle: "अपने पैसों को बेहतर तरीके से व्यवस्थित करें",
      icon: Wallet,
      features: [
        {
          icon: TrendingUp,
          title: "निवेश ट्रैकिंग",
          description: "अपने सभी निवेशों को एक जगह देखें और मॉनिटर करें"
        },
        {
          icon: Target,
          title: "बजट प्रबंधन",
          description: "मासिक खर्चों को नियंत्रित करें और बचत करें"
        },
        {
          icon: PieChart,
          title: "वित्तीय रिपोर्ट्स",
          description: "अपनी वित्तीय स्थिति की विस्तृत जानकारी पाएं"
        }
      ]
    },
    {
      title: "AI आधारित सुझाव पाएं",
      subtitle: "आपकी वित्तीय स्थिति के अनुसार व्यक्तिगत सलाह",
      icon: Brain,
      features: [
        {
          icon: TrendingUp,
          title: "निवेश सुझाव",
          description: "आपकी आय और लक्ष्यों के अनुसार निवेश के विकल्प"
        },
        {
          icon: Target,
          title: "बचत रणनीति",
          description: "बेहतर बचत के लिए व्यक्तिगत रणनीति बनाएं"
        },
        {
          icon: PieChart,
          title: "वित्तीय लक्ष्य",
          description: "अपने सपनों को पूरा करने के लिए योजना बनाएं"
        }
      ]
    },
    {
      title: "आसान नेवीगेशन",
      subtitle: "सभी फीचर्स को आसानी से एक्सेस करें",
      icon: PieChart,
      features: [
        {
          icon: Wallet,
          title: "डैशबोर्ड",
          description: "अपनी वित्तीय स्थिति की त्वरित झलक पाएं"
        },
        {
          icon: TrendingUp,
          title: "निवेश सेक्शन",
          description: "सभी निवेशों को व्यवस्थित रूप से देखें"
        },
        {
          icon: Brain,
          title: "AI सुझाव",
          description: "व्यक्तिगत वित्तीय सलाह पाने के लिए"
        }
      ]
    }
  ];

  const nextPage = () => {
    if (currentPage < onboardingPages.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      onComplete();
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const currentPageData = onboardingPages[currentPage];
  const IconComponent = currentPageData.icon;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 to-indigo-100 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md mx-auto shadow-2xl border-0">
        <CardContent className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">
              {currentPageData.title}
            </h1>
            <p className="text-gray-600 text-sm">
              {currentPageData.subtitle}
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4 mb-8">
            {currentPageData.features.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <FeatureIcon className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 text-xs">
                      {feature.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Progress Indicators */}
          <div className="flex justify-center space-x-2 mb-6">
            {onboardingPages.map((_, index) => (
              <div
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentPage ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              />
            ))}
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={prevPage}
              disabled={currentPage === 0}
              className="text-gray-500"
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              पिछला
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={onSkip}
              className="text-gray-500"
            >
              छोड़ें
            </Button>

            <Button
              onClick={nextPage}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              {currentPage === onboardingPages.length - 1 ? (
                <>
                  शुरू करें
                  <ArrowRight className="w-4 h-4 ml-1" />
                </>
              ) : (
                <>
                  आगे
                  <ChevronRight className="w-4 h-4 ml-1" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default OnboardingSplash;
