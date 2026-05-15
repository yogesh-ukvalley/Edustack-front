import { Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { navLinks, scrollToSection } from "@/config/navigation";
import logo from "@/assets/EdustackLogo.png";

// How It Works steps - matches MethodSection
const howItWorksSteps = [
  { label: "Recorded Classes", href: "#method" },
  { label: "Live Sessions", href: "#method" },
  { label: "Speaking Practice", href: "#method" },
  { label: "Mentorship", href: "#method" },
];

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const onFooterNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/" + href);
    } else {
      scrollToSection(href);
    }
  };

  return (
  <footer className="bg-white pt-14 pb-8 relative overflow-hidden border-t">

    {/* Subtle pattern */}
    <div
      className="absolute inset-0 opacity-5"
      style={{
        backgroundImage: "radial-gradient(circle, #000 1px, transparent 1px)",
        backgroundSize: "30px 30px",
      }}
    />

    <div className="container relative z-10">

      {/* Grid */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-10 border-b border-gray-200">

        {/* Brand */}
        <div className="space-y-4">
          <img
            src={logo}
            alt="Edustack Logo"
            className="h-14 w-auto object-contain"
          />

          <p className="text-gray-600 text-sm leading-relaxed">
            Empowering students to master French and unlock opportunities in
            Canada through expert-led online education.
          </p>

          <div className="flex gap-3">
            {[Facebook, Instagram, Youtube, Linkedin].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center hover:bg-yellow-500 transition-colors group"
              >
                <Icon size={16} className="text-gray-600 group-hover:text-white" />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links - synced with Navbar */}
        <div>
          <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
            Quick Links
          </h4>

          <nav className="space-y-3">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={(e) => onFooterNavClick(e, l.href)}
                className="block text-gray-600 hover:text-yellow-600 transition-colors text-sm cursor-pointer"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Course Levels */}
        <div>
          <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
            Course Levels
          </h4>

          <nav className="space-y-3">
            {[
              { label: "Beginner (A1)", href: "#levels" },
              { label: "Elementary (A2)", href: "#levels" },
              { label: "Intermediate (B1)", href: "#levels" },
              { label: "Advanced (B2)", href: "#levels" },
            ].map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => onFooterNavClick(e, l.href)}
                className="block text-gray-600 hover:text-yellow-600 transition-colors text-sm cursor-pointer"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

        {/* How It Works */}
        <div>
          <h4 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wider">
            How It Works
          </h4>

          <nav className="space-y-3">
            {howItWorksSteps.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={(e) => onFooterNavClick(e, l.href)}
                className="block text-gray-600 hover:text-yellow-600 transition-colors text-sm cursor-pointer"
              >
                {l.label}
              </a>
            ))}
          </nav>
        </div>

      </div>

      {/* Bottom Copyright */}
      <div className="pt-6 text-center text-gray-500 text-xs">
        © {new Date().getFullYear()} Edustack French Learning Institute. All rights reserved.
      </div>

    </div>
  </footer>
  );
};

export default Footer;