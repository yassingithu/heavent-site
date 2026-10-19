import Seo from "@/components/Seo";
import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search } from "lucide-react";
import { useTexte } from "@/i18n/textes";

const NotFound = () => {
  const x = useTexte();
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-background to-accent/30 px-4">
      <Seo noindex />
      <Card className="max-w-md w-full text-center animate-fade-in">
        <CardContent className="p-8">
          <div className="text-8xl font-bold text-primary mb-4">404</div>
          <h1 className="text-2xl font-serif font-bold mb-4">{x("Page non trouvée")}</h1>
          <p className="text-muted-foreground mb-8">
            {x("Désolé, la page que vous recherchez n'existe pas ou a été déplacée.")}
          </p>
          
          <div className="space-y-4">
            <Button asChild className="w-full gold-shadow">
              <Link to="/">
                <Home className="mr-2" size={20} />
                {x("Retour à l'accueil")}
              </Link>
            </Button>
            
            <div className="grid grid-cols-2 gap-2">
              <Button asChild variant="outline" size="sm">
                <Link to="/contact">
                  <Search className="mr-1" size={16} />
                  Contact
                </Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/a-propos">
                  <ArrowLeft className="mr-1" size={16} />
                  {x("À propos")}
                </Link>
              </Button>
            </div>
          </div>
          
          <p className="text-xs text-muted-foreground mt-6">
            {x("Route demandée :")} <code className="bg-muted px-1 rounded">{location.pathname}</code>
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotFound;
