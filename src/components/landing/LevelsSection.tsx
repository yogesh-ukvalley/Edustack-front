// import studyImg from "@/assets/study-books.jpg";

// const levels = [
//   { level: "A1", name: "Beginner", desc: "Start from scratch — learn basic greetings, everyday vocabulary, and simple sentence structures to survive daily conversations.", tag: "Start Here" },
//   { level: "A2", name: "Elementary", desc: "Build on basics — understand common expressions, short conversations, and handle routine tasks with growing confidence.", tag: "Foundation" },
//   { level: "B1", name: "Intermediate", desc: "Gain independence — discuss familiar topics, handle travel situations, and express opinions with clarity and structure.", tag: "Popular" },
//   { level: "B2", name: "Advanced", desc: "Communicate fluently — engage in complex discussions, professional settings, and academic contexts with nuance.", tag: "Pro Level" },
// ];

// const LevelsSection = () => (
//   <section id="levels" className="py-20 md:py-28 bg-background section-pattern">
//     <div className="container">
//       <div className="text-center space-y-4 mb-14">
//         <span className="inline-block text-secondary text-sm font-semibold uppercase tracking-widest">Course Levels</span>
//         <h2 className="text-3xl md:text-4xl font-extrabold text-primary">French Levels We Teach</h2>
//         <p className="text-muted-foreground max-w-2xl mx-auto">From absolute beginner to advanced fluency — a clear path for your entire French learning journey.</p>
//       </div>

//       <div className="grid lg:grid-cols-2 gap-8 items-center">
//         {/* Cards */}
//         <div className="grid sm:grid-cols-2 gap-4">
//           {levels.map((l, i) => (
//             <div key={l.level} className="relative group bg-card rounded-2xl p-6 border shadow-card hover-lift space-y-3 overflow-hidden">
//               {/* Accent top border */}
//               <div className={`absolute top-0 left-0 right-0 h-1 ${i % 2 === 0 ? "gradient-gold" : "gradient-navy"}`} />

//               <div className="flex items-center justify-between">
//                 <span className={`text-3xl font-extrabold ${i % 2 === 0 ? "text-gradient-gold" : "text-gradient-navy"}`}>{l.level}</span>
//                 <span className={`text-xs font-semibold px-3 py-1 rounded-full ${i % 2 === 0 ? "bg-gold-light text-secondary-foreground" : "bg-navy-light text-primary"}`}>
//                   {l.tag}
//                 </span>
//               </div>
//               <h3 className="font-bold text-lg text-primary">{l.name}</h3>
//               <p className="text-muted-foreground text-sm leading-relaxed">{l.desc}</p>
//             </div>
//           ))}
//         </div>

//         {/* Image */}
//         <div className="hidden lg:block relative">
//           <div className="rounded-3xl overflow-hidden shadow-card-hover">
//             <img src={studyImg} alt="Student studying French" className="w-full h-[450px] object-cover" />
//           </div>
//           <div className="absolute -bottom-4 -left-4 w-32 h-32 border-4 border-secondary/20 rounded-3xl -z-10" />
//           <div className="absolute -top-4 -right-4 w-20 h-20 bg-secondary/20 rounded-2xl -z-10" />
//         </div>
//       </div>
//     </div>
//   </section>
// );

// export default LevelsSection;


import studyImg from "@/assets/study-books.jpg";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const levels = [
  {
    level: "A1",
    name: "Beginner",
    desc: "Start from scratch — learn basic greetings, everyday vocabulary, and simple sentence structures to survive daily conversations.",
    tag: "Start Here",
  },
  {
    level: "A2",
    name: "Elementary",
    desc: "Build on basics — understand common expressions, short conversations, and handle routine tasks with growing confidence.",
    tag: "Foundation",
  },
  {
    level: "B1",
    name: "Intermediate",
    desc: "Gain independence — discuss familiar topics, handle travel situations, and express opinions with clarity and structure.",
    tag: "Popular",
  },
  {
    level: "B2",
    name: "Advanced",
    desc: "Communicate fluently — engage in complex discussions, professional settings, and academic contexts with nuance.",
    tag: "Pro Level",
  },
];

const LevelsSection = () => {
  const navigate = useNavigate();

  return (
  <section id="levels" className="py-20 md:py-28 bg-background section-pattern">
    <div className="container">
      <div className="text-center space-y-4 mb-14">
        <span className="inline-block text-secondary text-sm font-semibold uppercase tracking-widest">
          Course Levels
        </span>

        <h2 className="text-3xl md:text-4xl font-extrabold text-primary">
          French Levels We Teach
        </h2>

        <p className="text-muted-foreground max-w-2xl mx-auto">
          From absolute beginner to advanced fluency — a clear path for your entire
          French learning journey.
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8 items-center">

        {/* Cards */}
        <div className="grid sm:grid-cols-2 gap-4">
          {levels.map((l, i) => (
            <div
              key={l.level}
              className="relative group bg-card rounded-2xl p-6 border shadow-card hover-lift space-y-3 overflow-hidden"
            >
              {/* Accent top border */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 ${i % 2 === 0 ? "gradient-gold" : "gradient-navy"
                  }`}
              />

              <div className="flex items-center justify-between">
                <span
                  className={`text-3xl font-extrabold ${i % 2 === 0 ? "text-gradient-gold" : "text-gradient-navy"
                    }`}
                >
                  {l.level}
                </span>

                <span
                  className={`text-xs font-semibold px-3 py-1 rounded-full ${i % 2 === 0
                      ? "bg-gold-light text-secondary-foreground"
                      : "bg-navy-light text-primary"
                    }`}
                >
                  {l.tag}
                </span>
              </div>

              <h3 className="font-bold text-lg text-primary">{l.name}</h3>

              <p className="text-muted-foreground text-sm leading-relaxed">
                {l.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Image */}
        <div className="hidden lg:block relative">
          <div className="rounded-3xl overflow-hidden shadow-card-hover">
            <img
              src={studyImg}
              alt="Student studying French"
              className="w-full h-[450px] object-cover"
            />
          </div>

          <div className="absolute -bottom-4 -left-4 w-32 h-32 border-4 border-secondary/20 rounded-3xl -z-10" />
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-secondary/20 rounded-2xl -z-10" />
        </div>
      </div>

      {/* Register Button */}
      <div
        className="flex justify-center mt-14 animate-fade-up"
        style={{ animationDelay: "0.3s" }}
      >
        <Button variant="gold" size="xl" className="shadow-gold cta-shimmer cta-hover" onClick={() => navigate('/register')}>
          Register Now <ChevronRight size={18} />
        </Button>
      </div>
    </div>
  </section>
  );
};

export default LevelsSection;