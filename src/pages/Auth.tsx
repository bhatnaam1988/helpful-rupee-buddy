
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn, signUp, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        if (error) {
          toast({
            title: "त्रुटि",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "सफलता",
            description: "सफलतापूर्वक लॉगिन हो गए!"
          });
        }
      } else {
        const { error } = await signUp(email, password, name);
        if (error) {
          toast({
            title: "त्रुटि",
            description: error.message,
            variant: "destructive"
          });
        } else {
          toast({
            title: "सफलता",
            description: "खाता सफलतापूर्वक बनाया गया! कृपया अपने खाते को सत्यापित करने के लिए अपना ईमेल जांचें।"
          });
        }
      }
    } catch (error) {
      toast({
        title: "त्रुटि",
        description: "एक अप्रत्याशित त्रुटि हुई",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center font-bold text-white text-xl">
              ₹
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">
            {isLogin ? "वापस आपका स्वागत है" : "खाता बनाएं"}
          </CardTitle>
          <p className="text-gray-600">
            {isLogin ? "अपने पैसावाइज़ खाते में लॉगिन करें" : "आपके वित्त प्रबंधन के लिए पैसावाइज़ में शामिल हों"}
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  पूरा नाम
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="अपना पूरा नाम दर्ज करें"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required={!isLogin}
                />
              </div>
            )}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                ईमेल
              </label>
              <Input
                id="email"
                type="email"
                placeholder="अपना ईमेल दर्ज करें"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
                पासवर्ड
              </label>
              <Input
                id="password"
                type="password"
                placeholder="अपना पासवर्ड दर्ज करें"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "लोड हो रहा है..." : (isLogin ? "लॉगिन करें" : "साइन अप करें")}
            </Button>
          </form>
          <div className="mt-4 text-center">
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-600 hover:underline text-sm"
            >
              {isLogin ? "कोई खाता नहीं है? साइन अप करें" : "पहले से खाता है? लॉगिन करें"}
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
