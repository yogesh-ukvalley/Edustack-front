


// import { BookOpen, Users, Globe, CheckCircle2, ChevronRight } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import aboutImg from "@/assets/about-french.jpg";
// import { useRegisterModal } from "@/context/RegisterModalContext";

// const highlights = [
//   "Flexible recorded + live classes",
//   "Expert French language mentors",
//   "Immigration & exam focused",
//   "Learn from anywhere in the world",
// ];

// const AboutSection = () => {
//   const { openModal } = useRegisterModal();

//   return (
//   <section id="about" className="py-20 md:py-28 bg-background section-pattern">
//     <div className="container">
//       <div className="grid lg:grid-cols-2 gap-16 items-center">

//         {/* Image side */}
//         <div className="relative">
//           <div className="rounded-3xl overflow-hidden shadow-card-hover">
//             <img
//               src={aboutImg}
//               alt="Students learning in classroom"
//               className="w-full h-[350px] md:h-[420px] object-cover"
//             />
//           </div>

//           {/* Overlay card */}
//           <div className="absolute -bottom-6 -right-2 md:right-6 bg-card rounded-2xl shadow-card-hover p-5 border max-w-[220px]">
//             <div className="flex items-center gap-3 mb-2">
//               <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center">
//                 <Globe className="text-primary-foreground" size={20} />
//               </div>
//               <span className="font-bold text-primary text-sm">100% Online</span>
//             </div>
//             <p className="text-xs text-muted-foreground">
//               Learn from anywhere with full flexibility
//             </p>
//           </div>

//           {/* Decorative element */}
//           <div className="absolute -top-4 -left-4 w-24 h-24 border-4 border-secondary/30 rounded-3xl -z-10" />
//         </div>

//         {/* Text side */}
//         <div className="space-y-6">
//           <div className="inline-flex items-center gap-2 bg-gold-light text-secondary-foreground text-sm font-semibold px-4 py-1.5 rounded-full">
//             <BookOpen size={14} />
//             About Edustack
//           </div>

//           <h2 className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-primary leading-tight">
//             Your Trusted Partner for French Language Education
//           </h2>

//           <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
//             Edustack is an online French learning institute helping students master the French
//             language for education, career advancement, and immigration pathways in Canada.
//             With recorded lessons, live interactive sessions, and dedicated mentorship support,
//             we make French learning accessible, flexible, and effective.
//           </p>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
//             {highlights.map((h) => (
//               <div
//                 key={h}
//                 className="flex items-center gap-3 text-sm font-medium text-primary"
//               >
//                 <CheckCircle2 className="text-secondary shrink-0" size={18} />
//                 {h}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Center Button */}
//       <div
//         className="flex justify-center mt-14 animate-fade-up"
//         style={{ animationDelay: "0.3s" }}
//       >
//         <Button variant="gold" size="xl" className="shadow-gold cta-shimmer" onClick={openModal}>
//           Register Now <ChevronRight size={18} />
//         </Button>
//       </div>
//     </div>
//   </section>
//   );
// };

// export default AboutSection;



import { BookOpen, Globe, CheckCircle2, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import aboutImg from "@/assets/about-french.jpg";
import { useNavigate } from "react-router-dom";

const highlights = [
  "Flexible recorded + live classes",
  "Expert French language mentors",
  "Immigration & exam focused",
  "Learn from anywhere in the world",
];

const AboutSection = () => {
  const navigate = useNavigate();

  return (
    <section
      id="about"
      className="py-20 md:py-28 bg-background section-pattern"
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Image side */}
          <div className="relative">
            <div className="rounded-3xl overflow-hidden shadow-card-hover">
              <img
                src={aboutImg}
                alt="Students learning in classroom"
                className="w-full h-[350px] md:h-[420px] object-cover"
              />
            </div>

            {/* Overlay card */}
            <div className="absolute -bottom-6 -right-2 md:right-6 bg-card rounded-2xl shadow-card-hover p-5 border max-w-[220px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-xl gradient-gold flex items-center justify-center">
                  <Globe className="text-primary-foreground" size={20} />
                </div>
                <span className="font-bold text-primary text-sm">
                  100% Online
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Learn from anywhere with full flexibility
              </p>
            </div>

            {/* Decorative element */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-4 border-secondary/30 rounded-3xl -z-10" />
          </div>

          {/* Text side */}
          <div className="space-y-5 py-4 md:py-8">

            {/* Tag */}
            <div className="inline-flex items-center gap-2 bg-gold-light text-secondary-foreground text-sm font-semibold px-4 py-1.5 rounded-full">
              <BookOpen size={14} />
              About Edustack
            </div>

            <h2
              className="text-3xl md:text-4xl lg:text-[2.75rem] font-extrabold text-primary tracking-tight"
              style={{ wordSpacing: "0.15em", lineHeight: "2.7rem" }}
            >
              Your Trusted Partner for <br className="hidden md:block" />
              French Language Education
            </h2>

            {/* Description */}
            <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
              Edustack is an online French learning institute helping students
              master the French language for education, career advancement, and
              immigration pathways in Canada. With recorded lessons, live
              interactive sessions, and dedicated mentorship support, we make
              French learning accessible, flexible, and effective.
            </p>

            {/* Highlights */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
              {highlights.map((h) => (
                <div
                  key={h}
                  className="flex items-center gap-3 text-sm md:text-base font-medium text-primary"
                >
                  <CheckCircle2
                    className="text-secondary shrink-0"
                    size={18}
                  />
                  {h}
                </div>
              ))}
            </div>
          </div>
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

export default AboutSection;