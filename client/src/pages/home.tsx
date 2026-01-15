import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Layers, Target, Compass, Route } from "lucide-react";
import Lenis from "lenis";
import vericoraLogo from "../assets/vericora-logo.png";
import heroVisual from "../assets/hero-visual.png";

const SECTIONS = [
  { id: "hero", numeral: "I", label: "VERICORA" },
  { id: "problem", numeral: "II", label: "PROBLEM" },
  { id: "insight", numeral: "III", label: "INSIGHT" },
  { id: "platform", numeral: "IV", label: "PLATFORM" },
  { id: "agents", numeral: "V", label: "AGENTS" },
  { id: "builder", numeral: "VI", label: "BUILDER" },
  { id: "principles", numeral: "VII", label: "PRINCIPLES" },
  { id: "audience", numeral: "VIII", label: "CONTEXTS" },
  { id: "status", numeral: "IX", label: "STATUS" },
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
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
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
  const isInView = useInView(ref, { once: true, margin: "-8% 0px" });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "show" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: staggerDelay } }
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
      hidden: { opacity: 0, y: 16 },
      show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } }
    }}
    className={className}
  >
    {children}
  </motion.div>
);

const OperatingLayerSpine = ({ 
  activeSection, 
  isDarkSection,
}: { 
  activeSection: string;
  isDarkSection: boolean;
}) => {
  const activeData = SECTIONS.find(s => s.id === activeSection) || SECTIONS[0];
  
  return (
    <div className="fixed left-0 top-0 z-40 hidden lg:flex items-start" style={{ paddingTop: '180px', paddingLeft: 'var(--gutter)' }}>
      {/* Minimal Section Indicator */}
      <div className="flex items-center gap-3 transition-all duration-500">
        {/* Roman numeral */}
        <span 
          className="text-[11px] font-serif italic transition-colors duration-500"
          style={{ color: isDarkSection ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,0.35)' }}
        >
          {activeData.numeral}
        </span>
        
        {/* Small dot */}
        <div 
          className="w-1.5 h-1.5 rounded-full transition-colors duration-500"
          style={{ background: isDarkSection ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.25)' }}
        />
        
        {/* Horizontal line */}
        <div 
          className="w-8 h-[1px] transition-colors duration-500"
          style={{ background: isDarkSection ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.12)' }}
        />
        
        {/* Current section label */}
        <motion.span 
          key={activeSection}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-[10px] tracking-[0.2em] uppercase transition-colors duration-500"
          style={{ color: isDarkSection ? 'rgba(255,255,255,0.6)' : 'rgba(0,0,0,0.45)' }}
        >
          {activeData.label}
        </motion.span>
      </div>
    </div>
  );
};


const MobileProgressBar = ({ scrollProgress }: { scrollProgress: number }) => (
  <div className="fixed top-0 left-0 right-0 h-[2px] z-50 lg:hidden bg-black/5">
    <motion.div 
      className="h-full bg-accent"
      style={{ width: `${scrollProgress * 100}%` }}
    />
  </div>
);

export default function Home() {
  const [activeSection, setActiveSection] = useState("hero");
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const isDarkSection = activeSection === 'principles';

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
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(Math.min(1, window.scrollY / totalHeight));
      
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
      <OperatingLayerSpine 
        activeSection={activeSection} 
        isDarkSection={isDarkSection}
      />
      <MobileProgressBar scrollProgress={scrollProgress} />
      
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-background/80">
        <div className="container-grid flex justify-between items-center py-5">
          <div className="lg:pl-[calc(var(--spine-offset)+48px)]">
            <img src={vericoraLogo} alt="VERICORA" className="h-5 w-auto" />
          </div>
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

      {/* HERO with micro-grid */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20 pb-20 overflow-hidden">
        {/* Micro-grid background that fades */}
        <div className="absolute inset-0 micro-grid opacity-100" style={{ 
          maskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 0%, black 60%, transparent 100%)'
        }} />
        
        <div className="container-grid relative z-10 w-full">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            {/* Left: Text Content */}
            <div className="content-offset">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <h1 className="text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] font-serif mb-10 tracking-[-0.02em]">
                  The operating layer<br/>
                  for <em className="italic font-light">agentic learning.</em>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mb-10">
                  Vericora is building an integrity-first platform to design, govern, and run learning agents across real environments, with human oversight built in.
                </p>
                
                <div className="flex items-center gap-4 mb-12">
                  <button className="group bg-accent text-white px-7 py-3.5 text-sm font-medium rounded-[4px] hover:bg-accent/90 transition-all flex items-center gap-2 cursor-pointer">
                    Request access
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" strokeWidth={1.5} />
                  </button>
                  <button className="px-6 py-3.5 text-sm font-medium border border-black/15 rounded-[4px] hover:border-black/30 hover:bg-black/[0.02] transition-all cursor-pointer">
                    Contact
                  </button>
                </div>

                <p className="text-xs text-muted-foreground max-w-sm">
                  Built by a team with a decade of experience deploying learning systems in institutions and complex organizations.
                </p>
              </motion.div>
            </div>

            {/* Right: Hero Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="hidden lg:flex justify-center items-center"
            >
              <img 
                src={heroVisual} 
                alt="Platform visualization" 
                className="w-full max-w-md object-contain"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* PROBLEM - with branch line */}
      <section id="problem" className="py-36 lg:py-44">
        <div className="container-grid content-offset">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <ScrollReveal className="lg:col-span-5 branch-line">
              <span className="text-[10px] font-mono text-muted-foreground tracking-[0.25em] mb-8 block">II — PROBLEM</span>
              <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif leading-[1.05]">
                AI can generate content.<br/>
                <span className="text-muted-foreground">Learning requires execution.</span>
              </h2>
            </ScrollReveal>

            <div className="lg:col-span-1 hidden lg:flex justify-center">
              <div className="hairline-v h-full" />
            </div>

            <ScrollReveal className="lg:col-span-6 flex flex-col justify-end" delay={0.12}>
              <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed mb-10">
                Learning systems fail when the hard parts are treated as an afterthought: context, policy, progress, accountability, and human judgment.
              </p>
              <p className="text-lg text-foreground leading-relaxed">
                Most AI experiences are impressive in a demo and fragile in deployment.
                <br/><em className="text-accent italic">Vericora exists to make learning agents operational.</em>
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* INSIGHT - breathing room, centered */}
      <section id="insight" className="py-44 lg:py-56 framed-module bg-secondary/20">
        <div className="container-grid">
          <ScrollReveal className="max-w-4xl mx-auto text-center">
            <span className="text-[10px] font-mono text-muted-foreground tracking-[0.25em] mb-10 block">III — INSIGHT</span>
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif mb-12 leading-[1.05]">
              What's missing is not intelligence.<br/>
              It's an <em className="text-accent italic">operating layer.</em>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              To scale responsibly, learning agents need a layer that separates what should happen (design), what's allowed (governance), and what actually happens (execution).
            </p>
            <p className="text-lg text-foreground mt-10">
              That's the layer Vericora is building.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* PLATFORM - Iconic framed module */}
      <section id="platform" className="py-36 lg:py-44">
        <div className="container-grid content-offset">
          <ScrollReveal className="mb-20 branch-line">
            <span className="text-[10px] font-mono text-muted-foreground tracking-[0.25em] mb-8 block">IV — PLATFORM</span>
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif">Vericora</h2>
            <p className="text-xl text-muted-foreground mt-6 max-w-2xl">
              An integrity-first execution core for agentic learning systems.
            </p>
          </ScrollReveal>

          <StaggerContainer className="framed-module" staggerDelay={0.15}>
            <div className="grid md:grid-cols-3">
              {[
                { num: "01", title: "Design", desc: "Define lessons, journeys, outcomes, and progression." },
                { num: "02", title: "Govern", desc: "Set policies, constraints, oversight, and auditability." },
                { num: "03", title: "Execute", desc: "Run agent behavior reliably across learners, cohorts, teams, and programs." }
              ].map((item, i) => (
                <StaggerItem key={i} className={`py-14 px-10 ${i !== 2 ? "md:border-r border-black/8" : ""}`}>
                  <span className="text-[10px] font-mono text-accent tracking-[0.2em] mb-5 block">{item.num}</span>
                  <h3 className="text-2xl md:text-3xl font-serif mb-5">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </StaggerItem>
              ))}
            </div>
          </StaggerContainer>
          
          <ScrollReveal delay={0.4}>
            <p className="mt-12 text-[11px] font-mono text-muted-foreground tracking-[0.15em]">
              Model-agnostic · Delivery-agnostic · Built for institutional deployment
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* AGENTS */}
      <section id="agents" className="py-36 lg:py-44 bg-secondary/15">
        <div className="container-grid content-offset">
          <div className="grid lg:grid-cols-12 gap-20">
            <ScrollReveal className="lg:col-span-4 branch-line">
              <span className="text-[10px] font-mono text-muted-foreground tracking-[0.25em] mb-8 block">V — AGENTS</span>
              <h2 className="text-4xl md:text-5xl font-serif leading-[1.05] lg:sticky lg:top-36">
                Learning agents that operate across domains.
              </h2>
              <p className="mt-10 text-lg text-muted-foreground lg:sticky lg:top-72">
                Vericora powers structured agent roles that show up wherever learning happens.
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
                    <div className="group bg-background p-10 border border-black/6 rounded-md hover:border-black/12 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                      <div className="w-2 h-2 rounded-full border border-black/15 mb-8 group-hover:border-accent group-hover:bg-accent transition-colors" />
                      <h3 className="text-lg font-medium mb-4">{card.title}</h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">{card.desc}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>

              <ScrollReveal delay={0.4} className="mt-10 text-center">
                <span className="inline-block px-5 py-2.5 bg-background border border-black/6 rounded-full text-[11px] font-medium text-muted-foreground tracking-wide">
                  Not isolated chatbots. Orchestrated systems.
                </span>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* NO-CODE BUILDER */}
      <section id="builder" className="py-36 lg:py-44">
        <div className="container-grid content-offset">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="order-2 lg:order-1">
              <ScrollReveal>
                <div className="relative aspect-[4/3] bg-secondary/30 border border-black/6 rounded-md overflow-hidden">
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
              <ScrollReveal className="branch-line">
                <span className="text-[10px] font-mono text-muted-foreground tracking-[0.25em] mb-8 block">VI — BUILDER</span>
                <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-[1.05]">Build and deploy without code.</h2>
                <p className="text-lg text-muted-foreground mb-12 leading-relaxed">
                  Vericora includes a no-code builder to define agent behavior, lesson structure, evaluation logic, and guardrails. Teams can author learning flows once and deploy them consistently at scale.
                </p>
              </ScrollReveal>
              
              <StaggerContainer className="space-y-5" staggerDelay={0.06}>
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

      {/* PRINCIPLES - Dark section with inverted spine */}
      <section id="principles" className="py-36 lg:py-44 bg-primary text-primary-foreground">
        <div className="container-grid content-offset">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <ScrollReveal className="lg:col-span-4">
              <span className="text-[10px] font-mono text-white/30 tracking-[0.25em] mb-8 block">VII — PRINCIPLES</span>
              <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-serif text-white/90 leading-[1.05]">
                Built on a few non-negotiables.
              </h2>
            </ScrollReveal>

            <div className="lg:col-span-8">
              <StaggerContainer className="grid sm:grid-cols-2 gap-x-14 gap-y-12" staggerDelay={0.08}>
                {[
                  "Integrity by design, not patchwork controls",
                  "Human governance first, not autonomous guesswork",
                  "Context-aware execution, not generic responses",
                  "Separation of concerns: design, govern, execute",
                  "Outcomes over output: mastery, not chatter",
                  "Scale without compromise: trust and velocity together"
                ].map((item, i) => (
                  <StaggerItem key={i} className="border-t border-white/12 pt-6">
                    <div className="flex gap-5 items-start">
                      <span className="text-[10px] text-white/25 font-mono mt-1.5">0{i + 1}</span>
                      <p className="text-lg text-white/70 leading-relaxed">{item}</p>
                    </div>
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section id="audience" className="py-36 lg:py-44">
        <div className="container-grid">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-20">
            <span className="text-[10px] font-mono text-muted-foreground tracking-[0.25em] mb-8 block">VIII — CONTEXTS</span>
            <h2 className="text-4xl md:text-5xl font-serif mb-8 leading-[1.05]">Designed for environments where outcomes matter.</h2>
            <p className="text-lg text-muted-foreground">
              Vericora is built for organizations deploying AI for learning and capability development in high-accountability contexts, including:
            </p>
          </ScrollReveal>
          
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5" staggerDelay={0.08}>
            {[
              "Education systems and institutions",
              "Enterprise training and enablement",
              "Workforce development and certification",
              "Public-sector programs"
            ].map((item, i) => (
              <StaggerItem key={i}>
                <div className="p-10 bg-secondary/40 border border-black/5 text-center min-h-[200px] flex items-center justify-center rounded-md hover:bg-secondary/60 transition-colors">
                  <span className="font-medium text-sm leading-relaxed">{item}</span>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* STATUS + FOOTER */}
      <section id="status" className="pt-36 lg:pt-44 pb-16">
        <div className="container-grid content-offset">
          <div className="framed-module py-24">
            <div className="grid lg:grid-cols-2 gap-20">
              <ScrollReveal>
                <span className="text-[10px] font-mono text-accent tracking-[0.25em] mb-8 block">IX — STATUS</span>
                <h2 className="text-3xl md:text-4xl font-serif mb-8">Currently in private development.</h2>
                <p className="text-muted-foreground max-w-md leading-relaxed">
                  We're working with a small group of design partners.<br/>
                  We're intentionally quiet. We're getting the core right.
                </p>
              </ScrollReveal>
              
              <ScrollReveal delay={0.12} className="lg:text-right flex flex-col justify-end">
                <span className="text-[10px] font-mono text-muted-foreground tracking-[0.25em] mb-8 block">GET IN TOUCH</span>
                <a href="mailto:hello@vericora.ai" className="text-3xl md:text-4xl font-serif hover:text-accent transition-colors mb-4">
                  hello@vericora.ai
                </a>
                <p className="text-sm text-muted-foreground">We respond selectively.</p>
              </ScrollReveal>
            </div>
          </div>
          
          <div className="mt-24 flex flex-col md:flex-row justify-between items-center text-xs text-muted-foreground border-t border-black/6 pt-10">
            <p>© Vericora, Inc.</p>
            <div className="flex gap-10 mt-4 md:mt-0">
              <span className="hover:text-foreground transition-colors cursor-pointer">Privacy</span>
              <span className="hover:text-foreground transition-colors cursor-pointer">Terms</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
