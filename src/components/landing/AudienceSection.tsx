// import { GraduationCap, Plane, FileCheck, School } from "lucide-react";

// const audiences = [
//   { icon: GraduationCap, title: "International Students in Canada", desc: "Already in Canada and want to boost French skills for studies and daily life.", gradient: "from-primary to-navy-medium" },
//   { icon: Plane, title: "Planning to Study in Canada", desc: "Preparing French proficiency before arriving to hit the ground running.", gradient: "from-secondary to-amber-500" },
//   { icon: FileCheck, title: "PR Applicants", desc: "Need strong French for TEF/TCF scores to boost immigration applications.", gradient: "from-primary to-navy-medium" },
//   { icon: School, title: "School & College Students", desc: "Building French skills for academic excellence and personal growth.", gradient: "from-secondary to-amber-500" },
// ];

// const AudienceSection = () => (
//   <section className="py-20 md:py-28 gradient-navy relative overflow-hidden">
//     {/* Decorative dots */}
//     <div className="absolute inset-0 opacity-5" style={{
//       backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
//       backgroundSize: "30px 30px"
//     }} />

//     <div className="container relative z-10">
//       <div className="text-center space-y-4 mb-14">
//         <span className="inline-block text-secondary text-sm font-semibold uppercase tracking-widest">Our Students</span>
//         <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground">Who This Course Is For</h2>
//         <p className="text-primary-foreground/60 max-w-2xl mx-auto">Our programs are designed for learners at every stage of their Canadian journey.</p>
//       </div>

//       <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {audiences.map((a, i) => (
//           <div key={a.title} className="group bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-6 hover:bg-primary-foreground/10 transition-all duration-300 hover:-translate-y-2 text-center space-y-4">
//             <div className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br ${a.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
//               <a.icon className="text-primary-foreground" size={28} />
//             </div>
//             <h3 className="font-bold text-primary-foreground text-lg">{a.title}</h3>
//             <p className="text-primary-foreground/60 text-sm leading-relaxed">{a.desc}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   </section>
// );

// export default AudienceSection;


import { GraduationCap, Plane, FileCheck, School, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const audiences = [
  {
    icon: GraduationCap,
    title: "International Students in Canada",
    desc: "Already in Canada and want to boost French skills for studies and daily life.",
    gradient: "from-white to-white",
    // gradient: "from-secondary to-amber-500",
  },
  {
    icon: Plane,
    title: "Planning to Study in Canada",
    desc: "Preparing French proficiency before arriving to hit the ground running.",
    gradient: "from-secondary to-amber-500",
  },
  {
    icon: FileCheck,
    title: "PR Applicants",
    desc: "Need strong French for TEF/TCF scores to boost immigration applications.",
    // gradient: "from-primary to-navy-medium",
    gradient: "from-white to-white",
  },
  {
    icon: School,
    title: "School & College Students",
    desc: "Building French skills for academic excellence and personal growth.",
    gradient: "from-secondary to-amber-500",
  },
];

const AudienceSection = () => {
  const navigate = useNavigate();

  return (
    <section className="py-20 md:py-28 gradient-navy relative overflow-hidden">

      {/* Decorative dots */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="container relative z-10">
        <div className="text-center space-y-4 mb-14">
          <span className="inline-block text-secondary text-sm font-semibold uppercase tracking-widest">
            Our Students
          </span>

          <h2 className="text-3xl md:text-4xl font-extrabold text-primary-foreground">
            Who This Course Is For
          </h2>

          <p className="text-primary-foreground/60 max-w-2xl mx-auto">
            Our programs are designed for learners at every stage of their Canadian journey.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* {audiences.map((a) => (
            <div
              key={a.title}
              className="group bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-6 hover:bg-primary-foreground/10 transition-all duration-300 hover:-translate-y-2 text-center space-y-4"
            >
              <div
                className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br ${a.gradient} flex items-center justify-center shadow-lg shadow-white/20 group-hover:scale-110 group-hover:shadow-white/40 transition-all duration-300`}
              >
                <a.icon className="text-primary-foreground" size={28} />
              </div>

              <h3 className="font-bold text-primary-foreground text-lg">{a.title}</h3>

              <p className="text-primary-foreground/60 text-sm leading-relaxed">
                {a.desc}
              </p>
            </div>
          ))} */}
          {audiences.map((a, index) => (
            <div
              key={a.title}
              className="group bg-primary-foreground/5 backdrop-blur-sm border border-primary-foreground/10 rounded-2xl p-6 hover:bg-primary-foreground/10 transition-all duration-300 hover:-translate-y-2 text-center space-y-4"
            >
              <div
                className={`mx-auto w-16 h-16 rounded-2xl bg-gradient-to-br ${a.gradient} flex items-center justify-center shadow-lg shadow-white/20 group-hover:scale-110 group-hover:shadow-white/40 transition-all duration-300`}
              >
                <a.icon
                  className={`${index === 0 || index === 2 ? "navy-medium" : "text-primary-foreground"}`}
                  size={28}
                />
              </div>

              <h3 className="font-bold text-primary-foreground text-lg">
                {a.title}
              </h3>

              <p className="text-primary-foreground/60 text-sm leading-relaxed">
                {a.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Register Button */}
        <div
          className="flex justify-center mt-14 animate-fade-up"
          style={{ animationDelay: "0.3s" }}
        >
          <Button variant="gold" size="xl" className="shadow-gold cta-shimmer" onClick={() => navigate('/register')}>
            Register Now <ChevronRight size={18} />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AudienceSection;