import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { LanguageSelector } from "@/components/ui/language-selector";
import { cn } from "@/lib/utils";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const navigation = [
    { name: t('nav.home'), href: "/" },
    { name: t('nav.staffRegistration'), href: "/inscription-staff" },
    { name: t('nav.business'), href: "/devis-entreprise" },
    { name: t('nav.weddings'), href: "/devis-mariage" },
    { name: t('nav.about'), href: "/a-propos" },
    { name: t('nav.contact'), href: "/contact" },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex h-20 md:h-24 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="/df0014d7-d697-4525-a5ee-71cf8fa774ab.png" 
              alt="Heavent People Agency" 
              className="h-16 w-auto md:h-20"
              style={{
                filter: 'brightness(0)'
              }}
            />
          </Link>

          {/* Desktop Navigation & Language Selector */}
          <div className="hidden md:flex items-center space-x-6">
            <nav className="flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive(item.href)
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <LanguageSelector />
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Button asChild variant="outline">
              <Link to="/auth">{t('nav.staffSpace')}</Link>
            </Button>
            <Button asChild variant="default" className="gold-shadow">
              <Link to="/inscription-staff">{t('nav.joinTeam')}</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border mt-4 pt-4 pb-4 animate-fade-in">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "text-sm font-medium transition-colors hover:text-primary",
                    isActive(item.href)
                      ? "text-primary"
                      : "text-muted-foreground"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-4 pt-4 border-t border-border">
                <LanguageSelector />
                <div className="flex space-x-4">
                  <Button asChild variant="outline" className="flex-1">
                    <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                      {t('nav.staffSpace')}
                    </Link>
                  </Button>
                  <Button asChild variant="default" className="flex-1">
                    <Link to="/inscription-staff" onClick={() => setIsMenuOpen(false)}>
                      {t('nav.joinTeam')}
                    </Link>
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;