// import { Play, Video, Mic, HeartHandshake, ArrowRight } from "lucide-react";

// const methods = [
//   { icon: Play, title: "Recorded Classes", desc: "Learn anytime with structured, pre-recorded lessons you can revisit at your pace. Perfect for busy schedules.", color: "bg-blue-50 text-blue-600" },
//   { icon: Video, title: "Live Online Sessions", desc: "Join interactive live classes for real-time doubt solving and deeper understanding with expert instructors.", color: "bg-amber-50 text-amber-600" },
//   { icon: Mic, title: "Speaking Practice", desc: "Improve your fluency and pronunciation through guided speaking exercises and conversation practice.", color: "bg-emerald-50 text-emerald-600" },
//   { icon: HeartHandshake, title: "Mentorship Support", desc: "Get personal guidance and motivation from expert mentors throughout the entire course journey.", color: "bg-purple-50 text-purple-600" },
// ];

// const MethodSection = () => (
//   <section id="method" className="py-20 md:py-28 bg-muted/50">
//     <div className="container">
//       <div className="text-center space-y-4 mb-14">
//         <span className="inline-block text-secondary text-sm font-semibold uppercase tracking-widest">How It Works</span>
//         <h2 className="text-3xl md:text-4xl font-extrabold text-primary">Our Learning Method</h2>
//         <p className="text-muted-foreground max-w-2xl mx-auto">A blended approach combining the best of self-paced and instructor-led learning for maximum results.</p>
//       </div>

//       <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {methods.map((m, i) => (
//           <div key={m.title} className="group bg-card rounded-2xl p-7 shadow-card hover-lift border relative overflow-hidden">
//             {/* Step number */}
//             <span className="absolute top-4 right-4 text-6xl font-extrabold text-muted/60 select-none">
//               {i + 1}
//             </span>

//             <div className={`w-14 h-14 rounded-2xl ${m.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
//               <m.icon size={26} />
//             </div>
//             <h3 className="font-bold text-primary text-lg mb-2">{m.title}</h3>
//             <p className="text-muted-foreground text-sm leading-relaxed mb-4">{m.desc}</p>
//             <div className="flex items-center text-secondary text-sm font-semibold gap-1 group-hover:gap-2 transition-all">
//               Learn more <ArrowRight size={14} />
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   </section>
// );

// export default MethodSection;


import { Play, Video, Mic, HeartHandshake, ArrowRight, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const methods = [
  {
    icon: Play,
    title: "Recorded Classes",
    desc: "Learn anytime with structured, pre-recorded lessons you can revisit at your pace. Perfect for busy schedules.",
    color: "bg-blue-50 text-blue-600",
  },
  {
    icon: Video,
    title: "Live Online Sessions",
    desc: "Join interactive live classes for real-time doubt solving and deeper understanding with expert instructors.",
    color: "bg-amber-50 text-amber-600",
  },
  {
    icon: Mic,
    title: "Speaking Practice",
    desc: "Improve your fluency and pronunciation through guided speaking exercises and conversation practice.",
    color: "bg-emerald-50 text-emerald-600",
  },
  {
    icon: HeartHandshake,
    title: "Mentorship Support",
    desc: "Get personal guidance and motivation from expert mentors throughout the entire course journey.",
    color: "bg-purple-50 text-purple-600",
  },
];

const MethodSection = () => {
  const navigate = useNavigate();

  return (
  <section id="method" className="py-20 md:py-28 bg-muted/50">
    <div className="container">
      <div className="text-center space-y-4 mb-14">
        <span className="inline-block text-secondary text-sm font-semibold uppercase tracking-widest">
          How It Works
        </span>

        <h2 className="text-3xl md:text-4xl font-extrabold text-primary">
          Our Learning Method
        </h2>

        <p className="text-muted-foreground max-w-2xl mx-auto">
          A blended approach combining the best of self-paced and instructor-led
          learning for maximum results.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {methods.map((m, i) => (
          <div
            key={m.title}
            className="group bg-card rounded-2xl p-7 shadow-card hover-lift border relative overflow-hidden"
          >
            {/* Step number */}
            <span className="absolute top-4 right-4 text-6xl font-extrabold text-muted/60 select-none">
              {i + 1}
            </span>

            <div
              className={`w-14 h-14 rounded-2xl ${m.color} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}
            >
              <m.icon size={26} />
            </div>

            <h3 className="font-bold text-primary text-lg mb-2">{m.title}</h3>

            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              {m.desc}
            </p>

            <div className="flex items-center text-secondary text-sm font-semibold gap-1 group-hover:gap-2 transition-all">
              Learn more <ArrowRight size={14} />
            </div>
          </div>
        ))}
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

export default MethodSection;