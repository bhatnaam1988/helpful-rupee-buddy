import { useLocation } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="worker-card text-center max-w-md">
        <h1 className="text-4xl font-bold mb-4 text-primary">404</h1>
        <p className="text-xl text-muted-foreground mb-4">पेज नहीं मिला</p>
        <p className="text-muted-foreground mb-6">माफ करें, यह पेज उपलब्ध नहीं है।</p>
        <a href="/" className="worker-button-primary inline-block">
          होम पर वापस जाएं
        </a>
      </div>
    </div>
  );
};

export default NotFound;
