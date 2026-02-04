import React, { useRef, useEffect, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Layers, Target, Compass, Route } from "lucide-react";
import Lenis from "lenis";
import vericoraLogo from "../assets/vericora-logo.png";

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

const MobileProgressBar = ({ scrollProgress }: { scrollProgress: number }) => (
  <div className="fixed top-0 left-0 right-0 h-[2px] z-50 lg:hidden bg-black/5">
    <motion.div 
      className="h-full bg-accent"
      style={{ width: `${scrollProgress * 100}%` }}
    />
  </div>
);


const ScrollIndicator = () => (
  <motion.div 
    className="absolute bottom-8 lg:bottom-12 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden md:flex"
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2, duration: 0.6 }}
  >
    <span className="text-[9px] font-mono text-muted-foreground/40 tracking-widest">SCROLL</span>
    <motion.div 
      className="w-[1px] h-6 bg-black/10"
      animate={{ scaleY: [1, 0.5, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    />
  </motion.div>
);

const AgentWireframe = ({ type }: { type: string }) => {
  const wireframes: Record<string, React.ReactNode> = {
    instruction: (
      <svg viewBox="0 0 280 180" className="w-full h-full" fill="none">
        <rect x="20" y="20" width="240" height="140" rx="4" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <rect x="30" y="35" width="100" height="8" rx="2" fill="currentColor" opacity="0.4" />
        <rect x="30" y="55" width="180" height="4" rx="1" fill="currentColor" opacity="0.2" />
        <rect x="30" y="65" width="160" height="4" rx="1" fill="currentColor" opacity="0.2" />
        <rect x="30" y="75" width="140" height="4" rx="1" fill="currentColor" opacity="0.2" />
        <rect x="30" y="100" width="80" height="30" rx="4" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <rect x="120" y="100" width="80" height="30" rx="4" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <circle cx="50" cy="115" r="6" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <circle cx="140" cy="115" r="6" fill="currentColor" opacity="0.4" />
      </svg>
    ),
    evaluation: (
      <svg viewBox="0 0 280 180" className="w-full h-full" fill="none">
        <rect x="20" y="20" width="240" height="140" rx="4" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <circle cx="140" cy="80" r="35" stroke="currentColor" strokeWidth="2" opacity="0.4" />
        <path d="M120 80 L135 95 L165 65" stroke="currentColor" strokeWidth="2" opacity="0.6" />
        <rect x="40" y="130" width="40" height="20" rx="2" fill="currentColor" opacity="0.2" />
        <rect x="90" y="130" width="40" height="20" rx="2" fill="currentColor" opacity="0.3" />
        <rect x="140" y="130" width="40" height="20" rx="2" fill="currentColor" opacity="0.2" />
        <rect x="190" y="130" width="40" height="20" rx="2" fill="currentColor" opacity="0.2" />
      </svg>
    ),
    guidance: (
      <svg viewBox="0 0 280 180" className="w-full h-full" fill="none">
        <rect x="20" y="20" width="240" height="140" rx="4" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <circle cx="60" cy="60" r="20" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <rect x="90" y="45" width="120" height="6" rx="2" fill="currentColor" opacity="0.3" />
        <rect x="90" y="60" width="80" height="4" rx="1" fill="currentColor" opacity="0.2" />
        <rect x="30" y="100" width="200" height="40" rx="4" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <rect x="40" y="110" width="140" height="4" rx="1" fill="currentColor" opacity="0.2" />
        <rect x="40" y="120" width="100" height="4" rx="1" fill="currentColor" opacity="0.2" />
      </svg>
    ),
    pathway: (
      <svg viewBox="0 0 280 180" className="w-full h-full" fill="none">
        <rect x="20" y="20" width="240" height="140" rx="4" stroke="currentColor" strokeWidth="1" opacity="0.3" />
        <circle cx="60" cy="90" r="15" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <circle cx="140" cy="60" r="15" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <circle cx="140" cy="120" r="15" stroke="currentColor" strokeWidth="1.5" opacity="0.5" />
        <circle cx="220" cy="90" r="15" fill="currentColor" opacity="0.3" />
        <line x1="75" y1="85" x2="125" y2="65" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="75" y1="95" x2="125" y2="115" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="155" y1="65" x2="205" y2="85" stroke="currentColor" strokeWidth="1" opacity="0.4" />
        <line x1="155" y1="115" x2="205" y2="95" stroke="currentColor" strokeWidth="1" opacity="0.4" />
      </svg>
    ),
  };
  return wireframes[type] || null;
};

const AgentIcon = ({ type }: { type: string }) => {
  const icons: Record<string, React.ReactNode> = {
    instruction: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M4 6h16M4 12h16M4 18h10" />
      </svg>
    ),
    evaluation: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="9" />
        <path d="M9 12l2 2 4-4" />
      </svg>
    ),
    guidance: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="8" r="4" />
        <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
      </svg>
    ),
    pathway: (
      <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="6" r="3" />
        <circle cx="18" cy="18" r="3" />
        <path d="M9 11l6-4M9 13l6 4" />
      </svg>
    ),
  };
  return icons[type] || null;
};

const HorizontalScrollAgents = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsAreaRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const x = useTransform(scrollYProgress, [0, 1], [0, scrollRange]);
  
  // Calculate scroll range dynamically based on actual DOM measurements
  useEffect(() => {
    const updateScrollRange = () => {
      if (trackRef.current && cardsAreaRef.current) {
        const trackWidth = trackRef.current.scrollWidth;
        const containerWidth = cardsAreaRef.current.getBoundingClientRect().width;
        const overflow = trackWidth - containerWidth;
        setScrollRange(overflow > 0 ? -overflow : 0);
      }
    };
    
    updateScrollRange();
    const resizeObserver = new ResizeObserver(updateScrollRange);
    if (trackRef.current) resizeObserver.observe(trackRef.current);
    if (cardsAreaRef.current) resizeObserver.observe(cardsAreaRef.current);
    
    return () => resizeObserver.disconnect();
  }, []);
  
  const agents = [
    { 
      type: "instruction",
      title: "Instruction", 
      desc: "Deliver structured learning and guidance with pacing and context.",
      image: "/assets/agent-instruction.png",
    },
    { 
      type: "evaluation",
      title: "Evaluation", 
      desc: "Measure readiness, mastery, and progress with consistent criteria.",
      image: "/assets/agent-evaluation.png",
    },
    { 
      type: "guidance",
      title: "Guidance", 
      desc: "Support coaching, onboarding, and decision support within guardrails.",
      image: "/assets/agent-guidance.png",
    },
    { 
      type: "pathway",
      title: "Pathway", 
      desc: "Assemble learning journeys and progression logic for roles and outcomes.",
      image: "/assets/agent-pathway.png",
    },
  ];

  const sectionHeight = "200vh";

  return (
    <section id="agents" ref={containerRef} className="relative" style={{ height: sectionHeight }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col" style={{ backgroundColor: '#28281F' }}>
        {/* Top header area with title - uses container-grid for consistent margins */}
        <div className="container-grid pt-16 pb-8">
          {/* Section label */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
            <div className="w-6 h-[1px] bg-white/20" />
            <span className="text-[10px] font-mono text-white/50 tracking-[0.25em]">V — AGENTS</span>
          </motion.div>
          
          {/* Title and subtitle row */}
          <div className="flex items-end justify-between gap-8">
            <motion.h2 
              className="text-[clamp(2rem,4vw,3.5rem)] font-serif text-white/90 leading-[1.1] max-w-[600px]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              Learning agents that operate across domains.
            </motion.h2>
            
            <p className="text-white/40 text-sm leading-relaxed max-w-[320px] hidden lg:block">
              Vericora powers structured agent roles that show up wherever learning happens.
            </p>
          </div>
        </div>
        
        {/* Cards area - uses container-grid left margin, overflow visible for scroll */}
        <div ref={cardsAreaRef} className="flex-1 flex items-center overflow-hidden container-grid !max-w-none !pr-0">
          <motion.div 
            ref={trackRef}
            className="flex gap-8 items-end"
            style={{ x }}
          >
            {agents.map((agent, i) => (
              <motion.div
                key={i}
                className="flex-shrink-0 group cursor-pointer"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
              >
                {/* Card frame - sized by image, no overflow clipping */}
                <div className="relative rounded-2xl shadow-[0_8px_40px_rgba(0,0,0,0.2),0_30px_80px_rgba(0,0,0,0.25)] group-hover:shadow-[0_12px_50px_rgba(0,0,0,0.25),0_40px_100px_rgba(0,0,0,0.3)] transition-all duration-700 ease-out">
                  {/* Subtle border overlay */}
                  <div className="absolute inset-0 rounded-2xl border border-white/15 pointer-events-none z-10" />
                  {/* Screenshot - fixed height, auto width, fully visible */}
                  <img 
                    src={agent.image} 
                    alt={`${agent.title} agent interface`}
                    className="h-[55vh] w-auto rounded-2xl transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                  />
                </div>
                
                {/* Card label below */}
                <div className="mt-4 flex items-center gap-3">
                  <div className="text-white/40">
                    <AgentIcon type={agent.type} />
                  </div>
                  <span className="text-white/60 text-sm font-medium">{agent.title}</span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
        
        {/* Bottom tagline - uses container-grid for consistent margins */}
        <div className="container-grid pb-8">
          <span className="inline-block px-4 py-2 border border-white/10 rounded-full text-[10px] font-medium text-white/35 tracking-wide">
            Not isolated chatbots. Orchestrated systems.
          </span>
        </div>
      </div>
    </section>
  );
};

const SiteSpine = ({ activeSection, isDarkSection }: { activeSection: string; isDarkSection: boolean }) => {
  const activeIndex = SECTIONS.findIndex(s => s.id === activeSection);
  
  return (
    <div className="fixed left-6 lg:left-10 top-0 bottom-0 z-40 hidden lg:flex flex-col items-start pointer-events-none">
      <div 
        className="absolute left-[6px] top-20 bottom-20 w-[1px] transition-colors duration-500"
        style={{ background: isDarkSection ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.06)' }}
      />
      
      <div className="relative h-full flex flex-col justify-between py-28">
        {SECTIONS.map((section, i) => (
          <div key={section.id} className="flex items-center gap-2">
            <span 
              className="text-[10px] font-serif italic transition-colors duration-500 w-5 text-right"
              style={{ 
                color: activeIndex === i 
                  ? (isDarkSection ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.6)') 
                  : (isDarkSection ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)')
              }}
            >
              {section.numeral}
            </span>
            <motion.div 
              className="rounded-full transition-colors duration-300"
              initial={false}
              animate={{ 
                scale: activeIndex === i ? 1 : 0.6,
                width: activeIndex === i ? 6 : 4,
                height: activeIndex === i ? 6 : 4,
              }}
              style={{ 
                background: activeIndex === i 
                  ? 'hsl(192 15% 42%)' 
                  : (isDarkSection ? 'rgba(255,255,255,0.15)' : 'rgba(0,0,0,0.1)')
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  
  const isDarkSection = activeSection === 'principles' || activeSection === 'agents';

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
    handleScroll();
    
    return () => {
      lenis.destroy();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden relative">
      <SiteSpine activeSection={activeSection} isDarkSection={isDarkSection} />
      <MobileProgressBar scrollProgress={scrollProgress} />
      
      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 backdrop-blur-sm bg-background/80">
        <div className="container-grid flex justify-between items-center py-5">
          <img src={vericoraLogo} alt="VERICORA" className="h-7 w-auto" />
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
          <div className="relative">
            {/* Left: Text Content */}
            <div className="lg:max-w-[50%]">
              <motion.div 
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-[1px] bg-black/15" />
                  <span className="text-[10px] font-mono text-muted-foreground tracking-[0.25em]">I — VERICORA</span>
                </div>
                <h1 className="text-[clamp(2.8rem,6vw,5.5rem)] leading-[0.95] font-serif mb-10 tracking-[-0.02em]">
                  The execution<br/>
                  layer for<br/>
                  <em className="italic font-light">agentic learning.</em>
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.7 }}
              >
                <p className="text-lg text-muted-foreground leading-relaxed max-w-lg mb-10">
                  Vericora is building an integrity-first platform to design, govern, and execute learning agents across real learning environments, with human oversight built in.
                </p>
                
                <div className="flex items-center gap-4">
                  <button className="group bg-accent text-white px-7 py-3.5 text-sm font-medium rounded-[4px] hover:bg-accent/90 hover:shadow-[0_4px_20px_rgba(0,106,255,0.25)] transition-all duration-300 flex items-center gap-2 cursor-pointer">
                    Request access
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" strokeWidth={1.5} />
                  </button>
                  <button className="px-6 py-3.5 text-sm font-medium border border-black/15 rounded-[4px] hover:border-black/30 hover:bg-black/[0.02] transition-all duration-300 cursor-pointer">
                    Contact
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Right: Hero Image - positioned to extend beyond viewport */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
              className="hidden lg:block absolute right-0 top-1/2 -translate-y-1/2 w-[65%] pointer-events-none"
              style={{ 
                right: '-12%', 
                mixBlendMode: 'multiply',
                maskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to bottom, black 0%, black 75%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 20%, black 80%, transparent 100%), linear-gradient(to bottom, black 0%, black 75%, transparent 100%)',
                maskComposite: 'intersect',
                WebkitMaskComposite: 'source-in'
              }}
            >
              <img 
                src="/assets/hero-stack.png" 
                alt="Vericora platform visualization"
                className="w-full object-contain"
              />
            </motion.div>
          </div>
        </div>
        
        <ScrollIndicator />
      </section>
      
      {/* PROBLEM - Balanced editorial section */}
      <section id="problem" className="py-24 lg:py-32 overflow-hidden">
        <div className="container-grid">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
            {/* Left: Headline */}
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.5 }}
                className="flex items-center gap-3 mb-8"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                <div className="w-8 h-[1px] bg-black/15" />
                <span className="text-[10px] font-mono text-muted-foreground tracking-[0.25em]">II — PROBLEM</span>
              </motion.div>
              
              <motion.h2 
                className="text-[clamp(2.5rem,5vw,4.5rem)] leading-[1] font-serif tracking-[-0.02em]"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              >
                AI can generate content.
                <br/>
                <span className="text-muted-foreground/60">Learning requires </span>
                <em className="italic text-foreground">execution.</em>
              </motion.h2>
            </div>

            {/* Right: Supporting content */}
            <div className="lg:col-span-6 flex flex-col justify-end">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.7, delay: 0.15 }}
              >
                <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                  Learning systems fail when the hard parts are treated as an afterthought: 
                  <span className="text-foreground"> context, policy, progress, accountability, adaptation,</span> and 
                  <span className="text-foreground"> human judgment.</span>
                </p>
                
                <div className="relative">
                  <div className="bg-white/50 backdrop-blur-sm border border-white/70 shadow-[0_4px_30px_rgba(0,0,0,0.04)] rounded-lg p-6">
                    <p className="text-muted-foreground leading-relaxed mb-4">
                      Most AI experiences are impressive in a demo and fragile in real-world deployment.
                    </p>
                    <p className="text-lg font-serif italic text-accent">
                      Vericora exists to make learning agents operational at scale.
                    </p>
                  </div>
                  {/* Extending hairline */}
                  <div className="absolute -left-4 top-1/2 w-8 h-[1px] bg-gradient-to-r from-transparent via-black/10 to-black/10" />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* INSIGHT - breathing room, centered */}
      <section id="insight" className="py-32 lg:py-40 bg-secondary/20 relative overflow-hidden">
        {/* Glow backgrounds */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-accent/8 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-blue-400/6 rounded-full blur-[100px]" />
        </div>
        {/* Fine mesh overlay */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        <div className="container-grid relative z-10">
          <ScrollReveal className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-10">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <div className="w-8 h-[1px] bg-black/15" />
              <span className="text-[10px] font-mono text-muted-foreground tracking-[0.25em]">III — INSIGHT</span>
            </div>
            <h2 className="text-[clamp(2.2rem,4.5vw,4rem)] font-serif mb-12 leading-[1.05]">
              What's missing is not intelligence.<br/>
              It's an <em className="text-accent italic">execution layer.</em>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              To scale responsibly, learning agents need a layer that separates what should happen (design), what's allowed (governance), and what actually happens in practice (execution).
            </p>
            <p className="text-lg text-foreground mt-10">
              That's the layer Vericora is building.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* PLATFORM - Iconic framed module */}
      <section id="platform" className="py-28 lg:py-36 relative overflow-hidden">
        {/* Subtle glow accent */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-accent/5 rounded-full blur-[100px]" />
        </div>
        <div className="container-grid relative z-10">
          <ScrollReveal className="mb-20">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <div className="w-8 h-[1px] bg-black/15" />
              <span className="text-[10px] font-mono text-muted-foreground tracking-[0.25em]">IV — PLATFORM</span>
            </div>
            <h2 className="text-[clamp(2.8rem,6vw,5rem)] font-serif">Vericora</h2>
            <p className="text-xl text-muted-foreground mt-6 max-w-2xl">
              An integrity-first execution core for agentic learning systems.
            </p>
          </ScrollReveal>

          <StaggerContainer className="grid md:grid-cols-3 gap-4" staggerDelay={0.15}>
            {[
              { num: "01", title: "Design", desc: "Define lessons, journeys, outcomes, and progression." },
              { num: "02", title: "Govern", desc: "Set policies, constraints, oversight, and auditability." },
              { num: "03", title: "Execute", desc: "Execute agent behavior reliably across learners, cohorts, teams, and programs." }
            ].map((item, i) => (
              <StaggerItem key={i} className="relative">
                <div className="bg-white/50 backdrop-blur-sm border border-white/70 shadow-[0_4px_30px_rgba(0,0,0,0.04)] rounded-lg p-10 h-full hover:bg-white/70 hover:shadow-[0_8px_40px_rgba(0,106,255,0.06)] transition-all duration-300">
                  <span className="text-[10px] font-mono text-accent tracking-[0.2em] mb-5 block">{item.num}</span>
                  <h3 className="text-2xl md:text-3xl font-serif mb-5">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.desc}</p>
                </div>
                {/* Extending hairline */}
                <div className="absolute -bottom-4 left-1/2 w-[1px] h-8 bg-gradient-to-b from-black/10 to-transparent" />
              </StaggerItem>
            ))}
          </StaggerContainer>
          
          <ScrollReveal delay={0.4}>
            <p className="mt-12 text-[11px] font-mono text-muted-foreground tracking-[0.15em]">
              Model-agnostic · Delivery-agnostic · Built for institutional deployment
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* AGENTS - Dark horizontal scroll section */}
      <HorizontalScrollAgents />

      {/* NO-CODE BUILDER */}
      <section id="builder" className="py-24 lg:py-32">
        <div className="container-grid">
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
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <div className="w-8 h-[1px] bg-black/15" />
                  <span className="text-[10px] font-mono text-muted-foreground tracking-[0.25em]">VI — BUILDER</span>
                </div>
                <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-serif mb-8 leading-[1.05]">Build and deploy without code.</h2>
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
      <section id="principles" className="py-28 lg:py-36 bg-primary text-primary-foreground">
        <div className="container-grid">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-20">
            <ScrollReveal className="lg:col-span-4">
              <div className="flex items-center gap-3 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                <div className="w-8 h-[1px] bg-white/20" />
                <span className="text-[10px] font-mono text-white/40 tracking-[0.25em]">VII — PRINCIPLES</span>
              </div>
              <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-serif text-white/90 leading-[1.05]">
                Built on a few non-negotiables.
              </h2>
            </ScrollReveal>

            <div className="lg:col-span-8">
              <StaggerContainer className="grid sm:grid-cols-2 gap-4" staggerDelay={0.08}>
                {[
                  "Integrity by design, not patchwork controls",
                  "Human governance first, not autonomous guesswork",
                  "Context-aware execution, not generic responses",
                  "Separation of concerns: design, govern, execute",
                  "Outcomes over output: mastery, not chatter",
                  "Scale without compromise: trust and velocity together"
                ].map((item, i) => (
                  <StaggerItem key={i} className="relative">
                    <div className="bg-white/[0.03] backdrop-blur-sm border border-white/10 rounded-lg p-6 h-full hover:bg-white/[0.06] hover:border-white/15 transition-all duration-300">
                      <div className="flex gap-5 items-start">
                        <span className="text-[10px] text-white/30 font-mono mt-1.5">0{i + 1}</span>
                        <p className="text-[15px] text-white/70 leading-relaxed">{item}</p>
                      </div>
                    </div>
                    {/* Extending hairline */}
                    <div className="absolute -left-2 top-1/2 w-4 h-[1px] bg-gradient-to-r from-transparent to-white/15" />
                  </StaggerItem>
                ))}
              </StaggerContainer>
            </div>
          </div>
        </div>
      </section>

      {/* AUDIENCE */}
      <section id="audience" className="py-28 lg:py-36 relative overflow-hidden">
        {/* Glow backgrounds */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/3 left-1/6 w-[450px] h-[450px] bg-accent/6 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/6 w-[350px] h-[350px] bg-teal-400/5 rounded-full blur-[100px]" />
        </div>
        {/* Fine mesh overlay */}
        <div className="absolute inset-0 opacity-[0.025] pointer-events-none" style={{
          backgroundImage: 'linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }} />
        <div className="container-grid relative z-10">
          <ScrollReveal className="max-w-3xl mx-auto text-center mb-20">
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="w-1.5 h-1.5 rounded-full bg-accent" />
              <div className="w-8 h-[1px] bg-black/15" />
              <span className="text-[10px] font-mono text-muted-foreground tracking-[0.25em]">VIII — CONTEXTS</span>
            </div>
            <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-serif mb-8 leading-[1.05]">Designed for environments where outcomes matter.</h2>
            <p className="text-lg text-muted-foreground">
              Vericora is built for organizations deploying AI for learning and capability development in high-accountability contexts, including:
            </p>
          </ScrollReveal>
          
          <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-5 lg:gap-6" staggerDelay={0.08}>
            {[
              { num: "01", title: "Education", subtitle: "Systems & institutions", icon: (
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 3L2 9l10 6 10-6-10-6zM2 17l10 6 10-6M2 13l10 6 10-6" />
                </svg>
              )},
              { num: "02", title: "Enterprise", subtitle: "Training & enablement", icon: (
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="2" />
                  <path d="M9 3v18M3 9h18" />
                </svg>
              )},
              { num: "03", title: "Workforce", subtitle: "Development & certification", icon: (
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 15l-3 3 1.5 1.5L12 18l1.5 1.5L15 18l-3-3z" />
                  <circle cx="12" cy="8" r="5" />
                </svg>
              )},
              { num: "04", title: "Public Sector", subtitle: "Government programs", icon: (
                <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-6h6v6" />
                </svg>
              )}
            ].map((item, i) => (
              <StaggerItem key={i} className="relative">
                {/* Extending hairline above */}
                <div className="absolute -top-4 left-1/2 w-[1px] h-8 bg-gradient-to-t from-black/10 to-transparent" />
                
                <div className="group p-8 lg:p-10 bg-white/50 backdrop-blur-sm border border-white/70 shadow-[0_4px_30px_rgba(0,0,0,0.04)] min-h-[220px] flex flex-col rounded-lg hover:bg-white/70 hover:border-accent/20 hover:shadow-[0_12px_48px_rgba(0,106,255,0.1)] transition-all duration-300 cursor-pointer">
                  {/* Corner accent */}
                  <div className="absolute top-3 right-3 w-2 h-2 border-t border-r border-black/10 group-hover:border-accent/30 transition-colors duration-300" />
                  
                  {/* Number label */}
                  <span className="text-[10px] font-mono text-accent/70 tracking-[0.2em] mb-auto">{item.num}</span>
                  
                  {/* Icon + Title */}
                  <div className="mt-auto">
                    <div className="text-muted-foreground/50 mb-3 group-hover:text-accent/70 group-hover:scale-110 transition-all duration-300 origin-left">
                      {item.icon}
                    </div>
                    <h4 className="text-lg font-serif mb-1 group-hover:text-accent transition-colors duration-300">{item.title}</h4>
                    <p className="text-[13px] text-muted-foreground leading-relaxed">{item.subtitle}</p>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* STATUS + FOOTER */}
      <section id="status" className="pt-28 lg:pt-36 pb-16">
        <div className="container-grid">
          <div className="framed-module py-24">
            <div className="grid lg:grid-cols-2 gap-20">
              <ScrollReveal>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent" />
                  <div className="w-8 h-[1px] bg-black/15" />
                  <span className="text-[10px] font-mono text-accent tracking-[0.25em]">IX — STATUS</span>
                </div>
                <h2 className="text-[clamp(1.8rem,3.5vw,2.5rem)] font-serif mb-8">Currently in private development.</h2>
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
