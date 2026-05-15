import { Button } from "@/components/ui/button";
import { ChevronRight, Sparkles } from "lucide-react";
import eiffelImg from "@/assets/paris-eiffel.jpg";
import { useNavigate } from "react-router-dom";

const CTASection = () => {
  const navigate = useNavigate();

  return (
  <section className="py-20 md:py-28 relative overflow-hidden">
    {/* Background image */}
    <div className="absolute inset-0">
      <img src={eiffelImg} alt="" className="w-full h-full object-cover" />
      <div className="absolute inset-0 bg-primary/85" />
    </div>

    {/* Decorative shapes */}
    <div className="absolute top-10 right-20 w-40 h-40 border-2 border-secondary/20 rounded-full" />
    <div className="absolute bottom-10 left-20 w-60 h-60 border-2 border-secondary/10 rounded-full" />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />

    <div className="container text-center space-y-8 relative z-10">
      <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary text-sm font-semibold px-5 py-2 rounded-full mx-auto">
        <Sparkles size={14} />
        Limited Spots Available
      </div>

      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-primary-foreground leading-tight max-w-3xl mx-auto">
        Start Your French Learning Journey Today
      </h2>
      <p className="text-primary-foreground/70 max-w-xl mx-auto text-lg leading-relaxed">
        Join hundreds of students who are building their future in Canada through French fluency. Don't wait — the next batch starts soon.
      </p>
      <div className="flex flex-wrap justify-center gap-4 pt-4">
        <Button variant="gold" size="xl" className="shadow-gold cta-shimmer cta-hover" onClick={() => navigate('/register')}>
          Register Now <ChevronRight size={18} />
        </Button>
        {/* <Button size="xl" className="bg-primary-foreground/10 text-primary-foreground border border-primary-foreground/20 hover:bg-primary-foreground/20 shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
          Join Next Batch
        </Button> */}
      </div>
    </div>
  </section>
  );
};

export default CTASection;
