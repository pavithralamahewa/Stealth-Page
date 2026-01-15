import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Circle, Layers, Target, Compass, Route } from "lucide-react";
import Lenis from "lenis";

const SECTIONS = [
  { id: "hero", numeral: "I", label: "Intro" },
  { id: "problem", numeral: "II", label: "Problem" },
  { id: "insight", numeral: "III", label: "Insight" },
  { id: "platform", numeral: "IV", label: "Platform" },
  { id: "agents", numeral: "V", label: "Agents" },
  { id: "builder", numeral: "VI", label: "Builder" },
  { id: "principles", numeral: "VII", label: "Principles" },
  { id: "audience", numeral: "VIII", label: "Audience" },
  { id: "status", numeral: "IX", label: "Status" },
];

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-12% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{ 
        duration: 0.7, 
        delay,
        ease: [0.25, 0.1, 0.25, 1] 
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggerContainer = ({
  children,
  className = "",
  staggerDelay = 0.08,
}: {
  children: React.ReactNode;
  className?: string;
  staggerDelay?: number;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        show: {
          opacity: 1,
          transition: { staggerChildren: staggerDelay }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggerItem = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      show: { 
        opacity: 1, 
        y: 0,
        transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }
      }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const ProgressIndicator = ({ activeSection }: { activeSection: string }) => {
  return (
    <div className="fixed left-6 lg:left-12 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col gap-6">
      {SECTIONS.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`group flex items-center gap-3 transition-all duration-300 ${
            activeSection === section.id 
              ? "opacity-100" 
              : "opacity-30 hover:opacity-60"
          }`}
        >
          <span className={`font-mono text-[10px] tracking-wider transition-colors ${
            activeSection === section.id ? "text-accent" : "text-muted-foreground"
          }`}>
            {section.numeral}
          </span>
          <span className={`text-[10px] uppercase tracking-widest overflow-hidden transition-all duration-300 ${
            activeSection === section.id 
              ? "w-16 opacity-100" 
              : "w-0 opacity-0 group-hover:w-16 group-hover:opacity-100"
          }`}>
            {section.label}
          </span>
        </a>
      ))}
    </div>
  );
};

const SpineLine = () => (
  <div className="spine-line" />
);

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;
      
      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const section = document.getElementById(SECTIONS[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(SECTIONS[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      lenis.destroy();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <SpineLine />
      <ProgressIndicator activeSection={activeSection} />
      
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-background/80">
        <div className="container-grid flex justify-between items-center py-5">
          <div className="text-sm tracking-[0.2em] font-medium pl-8 lg:pl-16">VERICORA</div>
          <div className="hidden md:flex gap-10 text-[13px] text-muted-foreground">
            <a href="#problem" className="hover:text-foreground transition-colors">Problem</a>
            <a href="#platform" className="hover:text-foreground transition-colors">Platform</a>
            <a href="#principles" className="hover:text-foreground transition-colors">Principles</a>
          </div>
          <a 
            href="mailto:hello@vericora.ai" 
            className="text-[13px] text-muted-foreground hover:text-foreground transition-colors"
          >
            Contact
          </a>
        </div>
        <div className="hairline" />
      </nav>

      {/* HERO */}
      <section id="hero" className="min-h-screen flex flex-col justify-center pt-24 pb-32">
        <div className="container-grid pl-8 lg:pl-24">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
            className="max-w-5xl"
          >
            <h1 className="text-[clamp(3rem,8vw,7.5rem)] leading-[0.92] font-serif mb-16 tracking-[-0.02em]">
              The operating layer<br/>
              for <em className="font-light not-italic" style={{ fontStyle: 'italic' }}>agentic learning.</em>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="grid md:grid-cols-12 gap-12 mt-8"
          >
            <div className="md:col-span-5">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-lg">
                Vericora is building an integrity-first platform to design, govern, and run learning agents across real environments, with human oversight built in.
              </p>
            </div>
            
            <div className="md:col-span-7 flex flex-col md:flex-row md:items-start md:justify-end gap-8">
              <div className="flex items-center gap-4">
                <button className="group bg-primary text-primary-foreground px-7 py-3.5 text-sm font-medium rounded-sm hover:bg-primary/90 transition-all flex items-center gap-2 cursor-pointer">
                  Request access
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
                <a href="mailto:hello@vericora.ai" className="text-sm text-muted-foreground hover:text-foreground transition-colors underline underline-offset-4 decoration-border hover:decoration-foreground">
                  Contact
                </a>
              </div>
            </div>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="text-xs text-muted-foreground mt-16 max-w-sm"
          >
            Built by a team with a decade of experience deploying learning systems in institutions and complex organizations.
          </motion.p>
        </div>
      </section>

      <div className="container-grid"><div className="hairline" /></div>

      {/* PROBLEM */}
      <section id="problem" className="py-32 lg:py-40">
        <div className="container-grid pl-8 lg:pl-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <ScrollReveal className="lg:col-span-5">
              <span className="text-xs font-mono text-muted-foreground tracking-widest mb-6 block">02 — PROBLEM</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif leading-[1.1]">
                AI can generate content.<br/>
                <span className="text-muted-foreground">Learning requires execution.</span>
              </h2>
            </ScrollReveal>

            <div className="lg:col-span-1 hidden lg:flex justify-center">
              <div className="hairline-v h-full" />
            </div>

            <ScrollReveal className="lg:col-span-6 flex flex-col justify-end" delay={0.15}>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-8">
                Learning systems fail when the hard parts are treated as an afterthought: context, policy, progress, accountability, and human judgment.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                Most AI experiences are impressive in a demo and fragile in deployment.
                <br/><em className="text-accent">Vericora exists to make learning agents operational.</em>
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* INSIGHT */}
      <section id="insight" className="py-32 lg:py-40 framed-section bg-secondary/30">
        <div className="container-grid">
          <ScrollReveal className="max-w-4xl mx-auto text-center">
            <span className="text-xs font-mono text-muted-foreground tracking-widest mb-8 block">03 — INSIGHT</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif mb-10 leading-[1.1]">
              What's missing is not intelligence.<br/>
              It's an <em className="text-accent">operating layer.</em>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              To scale responsibly, learning agents need a layer that separates what should happen (design), what's allowed (governance), and what actually happens (execution).
            </p>
            <p className="text-lg text-foreground mt-8">
              That's the layer Vericora is building.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* PLATFORM - Design/Govern/Execute */}
      <section id="platform" className="py-32 lg:py-40">
        <div className="container-grid pl-8 lg:pl-24">
          <ScrollReveal className="mb-20">
            <span className="text-xs font-mono text-muted-foreground tracking-widest mb-6 block">04 — PLATFORM</span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif">Vericora</h2>
            <p className="text-xl text-muted-foreground mt-4 max-w-2xl">
              An integrity-first execution core for agentic learning systems.
            </p>
          </ScrollReveal>

          <StaggerContainer className="framed-section">
            <div className="grid md:grid-cols-3">
              {[
                { num: "01", title: "Design", desc: "Define lessons, journeys, outcomes, and progression." },
                { num: "02", title: "Govern", desc: "Set policies, constraints, oversight, and auditability." },
                { num: "03", title: "Execute", desc: "Run agent behavior reliably across learners, cohorts, teams, and programs." }
              ].map((item, i) => (
                <StaggerItem key={i} className={`py-12 px-8 ${i !== 2 ? "md:border-r border-border/50" : ""}`}>
                  <span className="text-xs font-mono text-accent tracking-widest mb-4 block">{item.num}</span>
                  <h3 className="text-2xl md:text-3xl font-serif mb-4">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
          
          <ScrollReveal delay={0.3}>
            <p className="mt-10 text-sm font-mono text-muted-foreground tracking-wide">
              Model-agnostic · Delivery-agnostic · Built for institutional deployment
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* AGENTS */}
      <section id="agents" className="py-32 lg:py-40 bg-secondary/20">
        <div className="container-grid pl-8 lg:pl-24">
          <div className="grid lg:grid-cols-12 gap-16">
            <ScrollReveal className="lg:col-span-4">
              <span className="text-xs font-mono text-muted-foreground tracking-widest mb-6 block">05 — AGENTS</span>
              <h2 className="text-4xl md:text-5xl font-serif leading-[1.1] lg:sticky lg:top-32">
                Learning agents that operate across domains.
              </h2>
              <p className="mt-8 text-lg text-muted-foreground lg:sticky lg:top-64">
                Vericora powers structured agent roles that show up wherever learning happens: education, workforce enablement, certification, and public programs.
              </p>
            </ScrollReveal>
            
            <div className="lg:col-span-8">
              <StaggerContainer className="grid sm:grid-cols-2 gap-5" staggerDelay={0.1}>
                {[
                  { icon: Layers, title: "Instruction Agents", desc: "Deliver structured learning and guidance with pacing and context." },
                  { icon: Target, title: "Evaluation Agents", desc: "Measure readiness, mastery, and progress with consistent criteria." },
                  { icon: Compass, title: "Guidance Agents", desc: "Support coaching, onboarding, and decision support within guardrails." },
                  { icon: Route, title: "Pathway Agents", desc: "Assemble learning journeys and progression logic for roles and outcomes." },
                ].map((card, i) => (
                  <StaggerItem key={i}>
                    <div className="group bg-background p-8 border border-border/60 rounded-md hover:border-border hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                      <div className="w-8 h-8 rounded-full border border-border/60 flex items-center justify-center mb-6 group-hover:border-accent/40 transition-colors">
                        <card.icon className="w-4 h-4 text-muted-foreground group-hover:text-accent transition-colors" />
                      </div>
                      <h3 className="text-lg font-medium mb-3">{card.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <ScrollReveal delay={0.4} className="mt-8 text-center">
                <span className="inline-block px-5 py-2.5 bg-background border border-border/60 rounded-full text-xs font-medium text-muted-foreground">
                  Not isolated chatbots. Orchestrated systems.
                </span>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* NO-CODE BUILDER */}
      <section id="builder" className="py-32 lg:py-40">
        <div className="container-grid pl-8 lg:pl-24">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="order-2 lg:order-1">
              <ScrollReveal>
                <div className="relative aspect-[4/3] bg-secondary/40 border border-border/60 rounded-md overflow-hidden">
                  <video 
                    autoPlay 
                    loop 
                    muted 
                    playsInline
                    className="w-full h-full object-cover"
                  >
                    <source src="/assets/studio_1_(2)_1768496011624.mp4" type="video/mp4" />
                  </video>
                </div>
              </ScrollReveal>
            </div>
            
            <div className="order-1 lg:order-2">
              <ScrollReveal>
                <span className="text-xs font-mono text-muted-foreground tracking-widest mb-6 block">06 — BUILDER</span>
                <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-[1.1]">Build and deploy without code.</h2>
                <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
                  Vericora includes a no-code builder to define agent behavior, lesson structure, evaluation logic, and guardrails. Teams can author learning flows once and deploy them consistently at scale.
                </p>
              </ScrollReveal>
              
              <StaggerContainer className="space-y-4" staggerDelay={0.06}>
                {[
                  "Outcomes & mastery criteria",
                  "Lesson structure & progression",
                  "Policies & constraints",
                  "Feedback & evaluation logic",
                  "Delivery mode (async, live, hybrid)"
                ].map((item, i) => (
                  <StaggerItem key={i} className="flex items-center gap-4 text-sm">
                    <div className="w-1.5 h-1.5 bg-accent rounded-full" />
                    <span className="font-medium">{item}</span>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPLES */}
      <section id="principles" className="py-32 lg:py-40 bg-primary text-primary-foreground">
        <div className="container-grid pl-8 lg:pl-24">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            <ScrollReveal className="lg:col-span-4">
              <span className="text-xs font-mono text-white/40 tracking-widest mb-6 block">07 — PRINCIPLES</span>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-white/90 leading-[1.1]">
                Built on a few non-negotiables.
              </h2>
            </ScrollReveal>

            <div className="lg:col-span-8">
              <StaggerContainer className="grid sm:grid-cols-2 gap-x-12 gap-y-10" staggerDelay={0.08}>
                {[
                  "Integrity by design, not patchwork controls",
                  "Human governance first, not autonomous guesswork",
                  "Context-aware execution, not generic responses",
                  "Separation of concerns: design, govern, execute",
                  "Outcomes over output: mastery, not chatter",
                  "Scale without compromise: trust and velocity together"
                ].map((item, i) => (
                  <StaggerItem key={i} className="border-t border-white/15 pt-6">
                    <div className="flex gap-4 items-start">
                      <span className="text-xs text-white/30 font-mono mt-1">0{i + 1}</span>
                      <p className="text-lg text-white/75 leading-relaxed">{item}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section id="audience" className="py-32 lg:py-40">
        <div className="container-grid">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-16">
            <span className="text-xs font-mono text-muted-foreground tracking-widest mb-6 block">08 — AUDIENCE</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-6 leading-[1.1]">Designed for environments where outcomes matter.</h2>
            <p className="text-lg text-muted-foreground">
              Vericora is built for organizations deploying AI for learning and capability development in high-accountability contexts, including:
            </p>
          </ScrollReveal>
          
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4" staggerDelay={0.08}>
            {[
              "Education systems and institutions",
              "Enterprise training and enablement",
              "Workforce development and certification",
              "Public-sector programs"
            ].map((item, i) => (
              <StaggerItem key={i}>
                <div className="p-8 bg-secondary/50 border border-border/50 text-center min-h-[180px] flex items-center justify-center rounded-md hover:bg-secondary/80 transition-colors">
                  <span className="font-medium text-sm leading-relaxed">{item}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* STATUS + FOOTER */}
      <section id="status" className="pt-32 lg:pt-40 pb-12">
        <div className="container-grid pl-8 lg:pl-24">
          <div className="framed-section py-20">
            <div className="grid lg:grid-cols-2 gap-16">
              <ScrollReveal>
                <span className="text-xs font-mono text-accent tracking-widest mb-6 block">09 — STATUS</span>
                <h2 className="text-3xl md:text-4xl font-serif mb-6">Currently in private development.</h2>
                <p className="text-muted-foreground max-w-md leading-relaxed">
                  We're working with a small group of design partners.<br/>
                  We're intentionally quiet. We're getting the core right.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={0.15} className="lg:text-right flex flex-col justify-end">
                <span className="text-xs font-mono text-muted-foreground tracking-widest mb-6 block">GET IN TOUCH</span>
                <a href="mailto:hello@vericora.ai" className="text-3xl md:text-4xl font-serif hover:text-accent transition-colors mb-3">
                  hello@vericora.ai
                </a>
                <p className="text-sm text-muted-foreground">We respond selectively.</p>
              </ScrollReveal>
            </div>
          </div>
          
          <div className="mt-20 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground border-t border-border/50 pt-8">
            <p>© Vericora, Inc.</p>
            <div className="flex gap-8 mt-4 md:mt-0">
              <span className="hover:text-foreground transition-colors cursor-pointer">Privacy</span>
              <span className="hover:text-foreground transition-colors cursor-pointer">Terms</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
