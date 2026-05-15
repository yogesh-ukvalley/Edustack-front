// import { Button } from "@/components/ui/button";
// import { ChevronRight, Star, Users, BookOpen } from "lucide-react";
// import heroImg from "@/assets/hero-students.jpg";
// import { useRegisterModal } from "@/context/RegisterModalContext";

// const stats = [
//   { icon: Users, value: "500+", label: "Students Enrolled" },
//   { icon: BookOpen, value: "4", label: "Course Levels" },
//   { icon: Star, value: "4.9", label: "Student Rating" },
// ];

// const HeroSection = () => {
//   const { openModal } = useRegisterModal();

//   // Hero section - id for Home navigation
//   return (
//     <section id="home" className="relative pt-24 pb-0 overflow-hidden gradient-hero">
//       {/* Background decorative elements */}
//       <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
//       <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

//       <div className="container relative z-10">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Left content */}
//           <div className="space-y-8 py-8 md:py-16">
//             <div className="inline-flex items-center gap-2 bg-secondary/15 border border-secondary/30 text-secondary-foreground text-sm font-semibold px-5 py-2 rounded-full animate-fade-up">
//               <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
//               🇫🇷 New Batch Starting Soon
//             </div>

//             <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] text-primary animate-fade-up" style={{ animationDelay: "0.1s" }}>
//               Master French with{" "}
//               <span className="relative inline-block">
//                 Confidence
//                 <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
//                   <path d="M2 8 C50 2, 150 2, 198 8" stroke="hsl(43, 100%, 52%)" strokeWidth="4" strokeLinecap="round" />
//                 </svg>
//               </span>
//               {" "}— Your Gateway to Canada
//             </h1>

//             <p className="text-lg text-muted-foreground max-w-lg leading-relaxed animate-fade-up" style={{ animationDelay: "0.2s" }}>
//               Edustack French Learning Institute helps international students and future immigrants build strong French language skills through structured online training, expert mentorship, and practical speaking practice.
//             </p>

//             <div className="flex flex-wrap gap-4 animate-fade-up w-full" style={{ animationDelay: "0.3s" }}>
//               <Button
//                 variant="gold"
//                 size="xl"
//                 className="shadow-gold w-full py-6 text-lg cta-shimmer"
//                 onClick={openModal}
//               >
//                 Register Now <ChevronRight size={24} />
//               </Button>
//             </div>

//             {/* Tagline */}
//             <p className="text-sm font-semibold text-muted-foreground tracking-wider uppercase animate-fade-up" style={{ animationDelay: "0.4s" }}>
//               Learn French · Build Your Future in Canada
//             </p>
//           </div>

//           {/* Right image */}
//           <div className="relative animate-fade-up" style={{ animationDelay: "0.3s" }}>
//             <div className="relative rounded-3xl overflow-hidden shadow-card-hover">
//               <img src={heroImg} alt="Students collaborating and learning French" className="w-full h-[400px] lg:h-[500px] object-cover" />
//               <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
//             </div>

//             {/* Floating badge */}
//             <div className="absolute -bottom-4 -left-4 md:left-4 bg-card rounded-2xl shadow-card-hover p-4 border animate-float">
//               <div className="flex items-center gap-3">
//                 <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center">
//                   <Star className="text-primary-foreground" size={18} />
//                 </div>
//                 <div>
//                   <p className="font-bold text-primary text-sm">Rated 4.9/5</p>
//                   <p className="text-xs text-muted-foreground">by 500+ students</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Stats bar */}
//         <div className="mt-12 lg:mt-16 gradient-navy rounded-2xl p-6 md:p-8 grid grid-cols-3 gap-4 relative overflow-hidden">
//           <div className="absolute inset-0 opacity-10" style={{
//             backgroundImage: "radial-gradient(circle, hsl(43 100% 52%) 1px, transparent 1px)",
//             backgroundSize: "24px 24px"
//           }} />
//           {stats.map((s) => (
//             <div key={s.label} className="text-center relative z-10">
//               <div className="flex justify-center mb-2">
//                 <s.icon className="text-secondary" size={24} />
//               </div>
//               <p className="stat-number">{s.value}</p>
//               <p className="text-primary-foreground/70 text-xs md:text-sm mt-1">{s.label}</p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Bottom wave */}
//       <div className="mt-12">
//         <svg viewBox="0 0 1440 80" fill="none" className="w-full">
//           <path d="M0 40 C360 80, 720 0, 1440 40 L1440 80 L0 80 Z" fill="hsl(0, 0%, 100%)" />
//         </svg>
//       </div>
//     </section>
//   );
// };

// export default HeroSection;


import { Button } from "@/components/ui/button";
import { ChevronRight, Star } from "lucide-react";
import { FaUsers, FaBookOpen, FaStar } from "react-icons/fa";
import heroImg from "@/assets/hero-students.jpg";
import { useNavigate } from "react-router-dom";
import { GiCanada } from "react-icons/gi";
const stats = [
  { icon: FaUsers, value: "500+", label: "Students Enrolled" },
  { icon: FaBookOpen, value: "4", label: "Course Levels" },
  { icon: FaStar, value: "4.9", label: "Student Rating" },
];

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section id="home" className="relative pt-24 pb-0 overflow-hidden gradient-hero">
      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left content */}
          <div className="space-y-8 py-8 md:py-16">
            {/* <div className="inline-flex items-center gap-2 bg-secondary/15 border border-secondary/30 text-secondary-foreground text-sm font-semibold px-5 py-2 rounded-full animate-fade-up">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              🇫🇷 New Batch Starting Soon
            </div> */}
            <div className="inline-flex items-center gap-2 bg-secondary/15 border border-secondary/30 text-secondary-foreground text-sm font-semibold px-5 py-2 rounded-full animate-fade-up">
              {/* <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" /> */}

              {/* Canada Flag Icon */}
              <img
                src="https://flagcdn.com/w40/ca.png"
                alt="Canada"
                className="w-5 h-4 object-cover rounded-sm shadow-sm"
              />

              New Batch Starting Soon
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.1] text-primary animate-fade-up">
              Master French with{" "}
              <span className="relative inline-block">
                Confidence
                <svg className="absolute -bottom-2 left-0 w-full" viewBox="0 0 200 12" fill="none">
                  <path d="M2 8 C50 2, 150 2, 198 8" stroke="hsl(43, 100%, 52%)" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
              {" "}— Your Gateway to Canada
            </h1>

            <p className="text-lg text-muted-foreground max-w-lg leading-relaxed animate-fade-up">
              Edustack French Learning Institute helps international students and future immigrants build strong French language skills through structured online training.
            </p>

            <div className="flex flex-wrap gap-4 w-full">
              <Button
                variant="gold"
                size="xl"
                className="shadow-gold w-full py-6 text-lg cta-shimmer cta-hover"
                onClick={() => navigate('/register')}
              >
                Register Now <ChevronRight size={24} />
              </Button>
            </div>
            <p className="text-sm font-semibold text-muted-foreground tracking-wider uppercase">
              Learn French · Build Your Future in Canada
            </p>
          </div>

          {/* Right image */}
          <div className="relative animate-fade-up" style={{ animationDelay: "0.3s" }}>
            <div className="relative rounded-3xl overflow-hidden shadow-card-hover">
              <img src={heroImg} alt="Students collaborating and learning French" className="w-full h-[400px] lg:h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-4 -left-4 md:left-4 bg-card rounded-2xl shadow-card-hover p-4 border animate-float">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full gradient-gold flex items-center justify-center">
                  <Star className="text-primary-foreground" size={18} />
                </div>
                <div>
                  <p className="font-bold text-primary text-sm">Rated 4.9/5</p>
                  <p className="text-xs text-muted-foreground">by 500+ students</p>
                </div>
              </div>
            </div>
          </div>



        </div>

        {/* Stats bar */}
        <div className="mt-12 lg:mt-16 gradient-navy rounded-2xl p-6 md:p-8 grid grid-cols-3 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="flex justify-center mb-2">
                <s.icon className="text-secondary text-2xl" />
              </div>
              <p className="stat-number">{s.value}</p>
              <p className="text-primary-foreground/70 text-xs md:text-sm mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;