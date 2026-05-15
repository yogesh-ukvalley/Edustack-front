import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { navLinks, scrollToSection } from "@/config/navigation";
import logo from "@/assets/EdustackLogo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const onNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setOpen(false);

    if (location.pathname !== "/") {
      navigate("/" + href);
    } else {
      scrollToSection(href);
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled
        ? "bg-background/95 backdrop-blur-md shadow-card border-b"
        : "bg-transparent"
        }`}
    >
      <div className="container flex items-center justify-between h-18 py-4">

        {/* LOGO */}
        <a
          href="#home"
          onClick={(e) => onNavClick(e, "#home")}
          className="flex items-center gap-2"
        >
          <img
            src={logo}
            alt="EduStack Logo"
            className="h-12 sm:h-14 md:h-16 lg:h-18 w-auto object-contain"
          />
        </a>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => onNavClick(e, l.href)}
              className="text-sm font-medium text-foreground/70 hover:text-primary transition-colors relative group"
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-secondary transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-3">
          <Button
            variant="gold"
            size="lg"
            className="cta-shimmer cta-hover"
            onClick={() => navigate('/register')}
          >
            Register Now <ChevronRight size={16} />
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-background/98 backdrop-blur-lg border-t animate-fade-in">
          <div className="container flex flex-col gap-1 py-4">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => onNavClick(e, l.href)}
                className="py-3 px-4 rounded-lg text-sm font-medium text-foreground/70 hover:text-primary hover:bg-muted transition-all"
              >
                {l.label}
              </a>
            ))}
            <div className="border-t my-2" />
            <Button
              variant="gold"
              size="lg"
              className="mt-2 cta-shimmer cta-hover"
              onClick={() => {
                setOpen(false);
                navigate('/register');
              }}
            >
              Register Now
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
