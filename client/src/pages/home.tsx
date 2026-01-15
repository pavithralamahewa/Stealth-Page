import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

// --- UI COMPONENTS ---

const Section = ({
  children,
  className = "",
  id = "",
  noPadding = false,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
  noPadding?: boolean;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <section
      id={id}
      ref={ref}
      className={`relative w-full ${!noPadding ? "py-24 md:py-32" : ""} ${className}`}
    >
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </section>
  );
};

const Divider = () => (
  <div className="w-full h-[1px] bg-black/10 my-8" />
);

const VerticalLine = ({ className = "" }: { className?: string }) => (
  <div className={`w-[1px] bg-black/10 ${className}`} />
);

// --- MAIN PAGE ---

export default function Home() {
  const principlesRef = useRef(null);
  const principlesInView = useInView(principlesRef, { once: true, margin: "-10% 0px" });

  const cardsRef = useRef(null);
  const cardsInView = useInView(cardsRef, { once: true, margin: "-10% 0px" });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.6, 
        ease: [0.16, 1, 0.3, 1] as const 
      } 
    }
  };

  return (
    <div className="min-h-screen bg-background text-primary selection:bg-accent/10 selection:text-accent overflow-x-hidden">
      
      {/* HEADER / NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-6 md:px-12 py-6 mix-blend-multiply pointer-events-none">
        <div className="text-sm tracking-widest font-medium pointer-events-auto">VERICORA</div>
        <div className="hidden md:flex gap-8 text-sm text-muted-foreground pointer-events-auto">
          <a href="#problem" className="hover:text-primary transition-colors">Problem</a>
          <a href="#solution" className="hover:text-primary transition-colors">Solution</a>
          <a href="#principles" className="hover:text-primary transition-colors">Principles</a>
        </div>
        <a 
          href="mailto:hello@vericora.ai" 
          className="text-sm border border-black/10 px-4 py-2 rounded-sm hover:bg-black hover:text-white transition-colors pointer-events-auto"
        >
          Contact
        </a>
      </nav>

      {/* 1. HERO */}
      <div className="relative min-h-[90vh] flex flex-col justify-center px-6 md:px-12 pt-32">
        <div className="max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl md:text-8xl lg:text-9xl leading-[0.9] md:leading-[0.85] font-serif mb-12 tracking-tight"
          >
            The operating layer for <span className="italic font-light">agentic learning.</span>
          </motion.h1>

          <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start">
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="text-lg md:text-xl text-muted-foreground max-w-lg leading-relaxed"
            >
              Vericora is building an integrity-first platform to design, govern, and run learning agents across real environments, with human oversight built in.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6, duration: 1 }}
              className="flex flex-col gap-6"
            >
               <div className="flex gap-4">
                <button className="bg-primary text-background px-6 py-3 text-sm font-medium hover:opacity-90 transition-opacity cursor-pointer">
                  Request access
                </button>
                <button className="border border-black/10 px-6 py-3 text-sm font-medium hover:bg-black/5 transition-colors cursor-pointer">
                  Contact
                </button>
               </div>
               <p className="text-xs text-muted-foreground max-w-[200px]">
                 Built by a team with a decade of experience deploying learning systems in institutions and complex organizations.
               </p>
            </motion.div>
          </div>
        </div>
        
        {/* Subtle grid decoration */}
        <div className="absolute right-0 bottom-0 w-1/3 h-1/2 grid-pattern opacity-40 -z-10" />
      </div>

      <Divider />

      {/* 2. PROBLEM */}
      <Section id="problem" className="px-6 md:px-12">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="text-4xl md:text-5xl font-serif leading-tight">
              AI can generate content. Learning requires execution.
            </h2>
          </div>
          <div className="md:col-span-1 hidden md:block">
             <VerticalLine className="h-full mx-auto" />
          </div>
          <div className="md:col-span-7 flex flex-col justify-end pb-2">
            <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl">
              Learning systems fail when the hard parts are treated as an afterthought: context, policy, progress, accountability, and human judgment.
            </p>
            <p className="mt-8 text-lg text-primary max-w-2xl">
              Most AI experiences are impressive in a demo and fragile in deployment.<br/>
              Vericora exists to make learning agents operational.
            </p>
          </div>
        </div>
      </Section>

      <div className="px-6 md:px-12"><Divider /></div>

      {/* 3. INSIGHT */}
      <Section className="px-6 md:px-12 bg-black/[0.02]">
        <div className="max-w-4xl mx-auto text-center py-12">
          <h2 className="text-4xl md:text-6xl font-serif mb-8">
            What’s missing is not intelligence. <br/>
            It’s an <span className="italic text-accent">operating layer.</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            To scale responsibly, learning agents need a layer that separates what should happen (design), what’s allowed (governance), and what actually happens (execution).
            <br/><br/>
            That’s the layer Vericora is building.
          </p>
        </div>
      </Section>

      {/* 4. WHAT VERICORA IS */}
      <Section id="solution" className="px-6 md:px-12">
        <div className="mb-16">
          <span className="text-sm tracking-widest uppercase text-muted-foreground mb-4 block">Platform</span>
          <h2 className="text-5xl md:text-7xl font-serif">Vericora</h2>
          <p className="text-xl mt-4 text-muted-foreground">An integrity-first execution core for agentic learning systems.</p>
        </div>

        <div className="grid md:grid-cols-3 border-t border-black/10">
          {[
            { 
              title: "Design", 
              desc: "Define lessons, journeys, outcomes, and progression." 
            },
            { 
              title: "Govern", 
              desc: "Set policies, constraints, oversight, and auditability." 
            },
            { 
              title: "Execute", 
              desc: "Run agent behavior reliably across learners, cohorts, teams, and programs." 
            }
          ].map((item, i) => (
            <div key={i} className={`py-12 pr-8 ${i !== 2 ? "md:border-r border-black/10" : ""}`}>
              <h3 className="text-2xl font-serif mb-4">{item.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-8 pt-8 border-t border-black/10 text-sm text-muted-foreground font-mono">
          Model-agnostic. Delivery-agnostic. Built for institutional deployment.
        </div>
      </Section>

      {/* 5. WHAT IT ENABLES */}
      <Section className="px-6 md:px-12 bg-secondary/30">
        <div className="grid md:grid-cols-12 gap-16">
          <div className="md:col-span-4">
            <h2 className="text-4xl md:text-5xl font-serif sticky top-32">
              Learning agents that operate across domains.
            </h2>
            <p className="mt-8 text-lg text-muted-foreground sticky top-64">
              Vericora powers structured agent roles that show up wherever learning happens: education, workforce enablement, certification, and public programs.
            </p>
          </div>
          
          <div className="md:col-span-8">
            <motion.div 
              ref={cardsRef}
              variants={container}
              initial="hidden"
              animate={cardsInView ? "show" : "hidden"}
              className="grid sm:grid-cols-2 gap-6"
            >
              {[
                { title: "Instruction Agents", desc: "Deliver structured learning and guidance with pacing and context." },
                { title: "Evaluation Agents", desc: "Measure readiness, mastery, and progress with consistent criteria." },
                { title: "Guidance Agents", desc: "Support coaching, onboarding, and decision support within guardrails." },
                { title: "Pathway Agents", desc: "Assemble learning journeys and progression logic for roles and outcomes." },
              ].map((card, i) => (
                <motion.div variants={itemAnim} key={i} className="bg-white p-8 border border-black/5 shadow-sm hover:shadow-md transition-shadow duration-500 rounded-sm">
                  <h3 className="text-xl font-medium mb-3">{card.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                </motion.div>
              ))}
              <motion.div variants={itemAnim} className="sm:col-span-2 text-center pt-8">
                <span className="inline-block px-4 py-2 bg-black/5 rounded-full text-xs font-medium text-muted-foreground">
                  Not isolated chatbots. Orchestrated systems.
                </span>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </Section>

      {/* 6. NO-CODE BUILDER */}
      <Section className="px-6 md:px-12">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 relative aspect-square md:aspect-[4/3] bg-black/[0.02] border border-black/5 p-8 grid-pattern flex items-center justify-center">
             {/* Abstract representation of builder UI */}
             <div className="w-full max-w-sm space-y-4 opacity-60">
                <div className="h-8 bg-black/10 w-1/3 mb-8"></div>
                <div className="h-4 bg-black/5 w-full"></div>
                <div className="h-4 bg-black/5 w-full"></div>
                <div className="h-4 bg-black/5 w-2/3"></div>
                
                <div className="mt-8 pt-8 border-t border-black/10 flex gap-4">
                   <div className="h-12 w-12 rounded-full border border-black/10"></div>
                   <div className="flex-1 space-y-2">
                      <div className="h-3 bg-black/5 w-1/2"></div>
                      <div className="h-3 bg-black/5 w-1/3"></div>
                   </div>
                </div>
             </div>
          </div>
          
          <div className="order-1 md:order-2">
            <h2 className="text-4xl md:text-5xl font-serif mb-6">Build and deploy without code.</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Vericora includes a no-code builder to define agent behavior, lesson structure, evaluation logic, and guardrails. Teams can author learning flows once and deploy them consistently at scale.
            </p>
            
            <ul className="space-y-4">
              {[
                "Outcomes & mastery criteria",
                "Lesson structure & progression",
                "Policies & constraints",
                "Feedback & evaluation logic",
                "Delivery mode (async, live, hybrid)"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-sm font-medium">
                  <div className="h-1.5 w-1.5 bg-accent rounded-full" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* 7. PRINCIPLES */}
      <Section id="principles" className="px-6 md:px-12 bg-primary text-primary-foreground">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="text-4xl md:text-5xl font-serif text-white/90">
              Built on a few non-negotiables.
            </h2>
          </div>
          <div className="md:col-span-8">
            <motion.div 
              ref={principlesRef}
              variants={container}
              initial="hidden"
              animate={principlesInView ? "show" : "hidden"}
              className="grid sm:grid-cols-2 gap-x-12 gap-y-8"
            >
              {[
                "Integrity by design, not patchwork controls",
                "Human governance first, not autonomous guesswork",
                "Context-aware execution, not generic responses",
                "Separation of concerns: design, govern, execute",
                "Outcomes over output: mastery, not chatter",
                "Scale without compromise: trust and velocity together"
              ].map((item, i) => (
                <motion.div variants={itemAnim} key={i} className="flex gap-4 items-start border-t border-white/20 pt-4">
                  <span className="text-xs text-white/40 font-mono mt-1">0{i+1}</span>
                  <p className="text-lg text-white/80">{item}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </Section>

      {/* 8. WHO IT'S FOR */}
      <Section className="px-6 md:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Designed for environments where outcomes matter.</h2>
          <p className="text-lg text-muted-foreground">
            Vericora is built for organizations deploying AI for learning and capability development in high-accountability contexts, including:
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            "Education systems and institutions",
            "Enterprise training and enablement",
            "Workforce development and certification",
            "Public-sector programs"
          ].map((item, i) => (
            <div key={i} className="p-6 bg-secondary/50 border border-black/5 text-center flex items-center justify-center min-h-[160px] hover:bg-secondary/80 transition-colors">
              <span className="font-medium text-sm md:text-base">{item}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* 9. STATUS & FOOTER */}
      <Section className="px-6 md:px-12 pb-12 pt-0">
        <div className="border-t border-black/10 pt-24 grid md:grid-cols-2 gap-12">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-accent mb-4 block">Status</span>
            <h2 className="text-3xl font-serif mb-4">Currently in private development.</h2>
            <p className="text-muted-foreground max-w-md">
              We’re working with a small group of design partners. <br/>
              We’re intentionally quiet. We’re getting the core right.
            </p>
          </div>
          
          <div className="md:text-right">
             <span className="text-xs font-mono uppercase tracking-widest text-muted-foreground mb-4 block">Get in touch</span>
             <a href="mailto:hello@vericora.ai" className="text-3xl font-serif hover:text-accent transition-colors block mb-2">
               hello@vericora.ai
             </a>
             <p className="text-sm text-muted-foreground">We respond selectively.</p>
          </div>
        </div>
        
        <div className="mt-32 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground border-t border-black/5 pt-8">
          <p>© Vericora, Inc.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </Section>
      
    </div>
  );
}
