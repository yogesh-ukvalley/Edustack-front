import { CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


const features = [
  "Expert French instructors with real-world teaching experience and practical learning approach",

  "Structured curriculum from A1 to B2 designed for step-by-step language improvement",

  "Flexible learning with recorded lessons and live interactive sessions for better understanding",

  "Focused preparation for TEF / TCF exams with guided practice and proven strategies",

  "Personal mentorship and continuous support to help you stay on track and improve faster",

  "Affordable French learning designed for students planning study or immigration abroad",
];

const WhySection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="why-choose"
      className="py-20 md:py-28 bg-background section-pattern"
    >
      <div className="container">

        {/* Heading */}
        <div className="text-center mb-16">
          <span className="inline-block text-secondary text-sm font-semibold uppercase tracking-widest mb-3">
            Why Edustack
          </span>

          <h2 className="text-3xl md:text-4xl  font-extrabold text-primary leading-tight">
            Why Students Choose Edustack
          </h2>

          <p className="text-muted-foreground max-w-2xl mx-auto mt-4 text-base md:text-md">
            We combine expert teaching, flexible learning, and strong mentorship
            to help students succeed in their French language journey.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {features.map((feature) => (
            <div
              key={feature}
              className="group bg-card border border-border/60 rounded-2xl p-6 md:p-7 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-start gap-4"
            >
              {/* Icon */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-secondary/15 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle2 className="text-secondary" size={20} />
              </div>

              {/* Text */}
              <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                {feature}
              </p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <div className="flex justify-center mt-16">
          <Button
            variant="gold"
            size="xl"
            className="shadow-gold cta-shimmer cta-hover px-8 py-6 text-lg"
            onClick={() => navigate('/register')}
          >
            Register Now <ChevronRight size={18} />
          </Button>
        </div>

      </div>
    </section>
  );
};

export default WhySection;