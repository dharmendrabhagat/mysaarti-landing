import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValue, useMotionTemplate, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

// --- Professional Animation Variants ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2
    }
  }
};

const scaleOnHover: Variants = {
  initial: { scale: 1 },
  hover: { scale: 1.05, transition: { duration: 0.3, ease: "easeOut" } }
};

// --- Components ---

// 1. Spotlight Card Component (Professional interaction)
function SpotlightCard({ children, className = "" }: { children: React.ReactNode, className?: string }) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <div
      className={`group relative border border-white/10 bg-card overflow-hidden rounded-xl ${className}`}
      onMouseMove={handleMouseMove}
    >
      <motion.div
        className="pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              rgba(255, 102, 0, 0.15),
              transparent 80%
            )
          `,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  );
}

// 2. Animated Background Component
function BackgroundOrbs() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute top-0 left-0 w-full h-full bg-background">
        <div className="absolute inset-0 bg-grid-pattern opacity-30" />
      </div>
      
      {/* Floating Orbs */}
      <motion.div 
        animate={{ x: [0, 100, 0], y: [0, -50, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute top-[-10%] left-[-10%] w-[40vw] h-[40vw] bg-primary/20 rounded-full blur-[120px]"
      />
      <motion.div 
        animate={{ x: [0, -100, 0], y: [0, 50, 0], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear", delay: 2 }}
        className="absolute bottom-[-10%] right-[-10%] w-[35vw] h-[35vw] bg-secondary/20 rounded-full blur-[120px]"
      />
       <motion.div 
        animate={{ x: [0, 50, -50, 0], y: [0, 50, 0], opacity: [0.1, 0.3, 0.1] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear", delay: 5 }}
        className="absolute top-[40%] left-[30%] w-[25vw] h-[25vw] bg-accent/10 rounded-full blur-[100px]"
      />
    </div>
  );
}

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const { toast } = useToast();
  const { scrollY } = useScroll();
  const headerOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const headerY = useTransform(scrollY, [0, 100], [-20, 0]);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "We've received your query. Our team will respond shortly.",
    });
  };

  return (
    <div className="min-h-screen font-sans text-foreground selection:bg-primary/30">
      <BackgroundOrbs />

      {/* Navbar */}
      <motion.nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled ? "glass border-b border-white/5 py-3 shadow-2xl shadow-black/20" : "py-6 bg-transparent"
        }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-3 cursor-pointer group" onClick={() => scrollToSection('hero')}>
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-primary to-orange-600 flex items-center justify-center text-white font-bold shadow-lg group-hover:shadow-primary/40 transition-all duration-300 transform group-hover:rotate-3">
              m
            </div>
            <span className="text-xl font-bold tracking-tight text-white font-display">
              mysaarti<span className="text-primary">.in</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-slate-300">
            {["How It Works", "AI Features", "Analytics", "Roadmap"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(/\s+/g, '-'))}
                className="hover:text-primary hover:drop-shadow-[0_0_10px_rgba(255,102,0,0.5)] transition-all duration-300"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="flex gap-4">
            <Button 
              variant="ghost" 
              className="hidden sm:flex text-slate-300 hover:text-white hover:bg-white/5"
              onClick={() => scrollToSection('contact')}
            >
              Contact
            </Button>
            <Button 
              className="bg-primary hover:bg-orange-600 text-white rounded-full px-6 shadow-[0_0_20px_rgba(255,102,0,0.3)] hover:shadow-[0_0_30px_rgba(255,102,0,0.5)] hover:scale-105 transition-all duration-300"
            >
              Get App
            </Button>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="relative min-h-screen flex items-center pt-20">
        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl relative z-10"
          >
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mb-8">
              <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs font-bold tracking-wide uppercase backdrop-blur-sm shadow-sm flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse"></span>
                Now Live in Mumbai, Maharashtra, India
              </div>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-7xl font-bold leading-[1.1] text-white mb-8 font-display tracking-tight">
              Civic Support <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-orange-400 to-yellow-400 animate-gradient-x">Reimagined</span> <br />
              for India.
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg text-slate-400 mb-10 leading-relaxed max-w-lg border-l-2 border-primary/30 pl-6">
              The citizen-first AI platform that auto-files grievances, tracks resolution, and holds authorities accountable.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-5">
              <Button size="lg" className="bg-white text-black hover:bg-slate-100 rounded-full px-8 h-14 font-semibold shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] hover:-translate-y-1 transition-all duration-300">
                Start Filing
                <i className="fas fa-arrow-right ml-2"></i>
              </Button>
              <Button variant="outline" size="lg" className="border-white/20 bg-white/5 backdrop-blur-sm text-white hover:bg-white/10 rounded-full px-8 h-14 hover:-translate-y-1 transition-all">
                <i className="fas fa-play-circle mr-2 text-primary"></i>
                See How It Works
              </Button>
            </motion.div>

            <motion.div variants={fadeInUp} className="mt-12 flex items-center gap-6 text-slate-500 text-sm font-medium">
              <div className="flex -space-x-3">
                 {[1,2,3,4].map(i => (
                   <div key={i} className="w-10 h-10 rounded-full border-2 border-background bg-slate-800 flex items-center justify-center overflow-hidden">
                     <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User" className="w-full h-full object-cover opacity-80" />
                   </div>
                 ))}
              </div>
              <p>Trusted by 10,000+ citizens</p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8, rotateY: -30 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative hidden lg:block perspective-1000"
          >
             {/* 3D Tilt Card Container */}
            <motion.div 
               whileHover={{ rotateY: 5, rotateX: -5 }}
               transition={{ type: "spring", stiffness: 300, damping: 20 }}
               style={{ transformStyle: "preserve-3d" }}
               className="relative mx-auto w-[340px]"
            >
              {/* Glow behind phone */}
              <div className="absolute inset-0 bg-gradient-to-tr from-primary to-secondary blur-[80px] opacity-40 -z-10 rounded-full transform translate-y-10 scale-90"></div>

              {/* Phone Frame */}
              <div className="relative bg-[#0a0a0a] border-[8px] border-[#1a1a1a] rounded-[3rem] h-[680px] shadow-2xl overflow-hidden ring-1 ring-white/10">
                 {/* Dynamic Island */}
                 <div className="absolute top-0 left-1/2 -translate-x-1/2 h-[28px] w-[120px] bg-black rounded-b-2xl z-20"></div>

                 {/* Screen Content */}
                 <div className="h-full w-full bg-slate-950 flex flex-col relative">
                    
                    {/* Header */}
                    <div className="pt-12 pb-6 px-6 bg-gradient-to-b from-slate-900 to-slate-950/0">
                      <div className="flex justify-between items-center mb-6">
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400">
                          <i className="fas fa-bars text-xs"></i>
                        </div>
                        <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 relative">
                          <i className="fas fa-bell text-xs"></i>
                          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border-2 border-slate-800"></span>
                        </div>
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-1">Hello, Priya 👋</h2>
                      <p className="text-slate-400 text-sm">3 issues resolved this week.</p>
                    </div>

                    {/* Voice Action Button (Pulsing) */}
                    <div className="px-6 mb-8 relative z-10">
                      <div className="bg-gradient-to-r from-primary to-orange-600 rounded-2xl p-6 shadow-lg shadow-primary/20 relative overflow-hidden group cursor-pointer">
                         <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10 group-hover:translate-x-0 transition-transform duration-500"></div>
                         <div className="flex items-center justify-between relative z-10">
                            <div>
                              <p className="text-white/80 text-sm font-medium mb-1">Tap to Speak</p>
                              <h3 className="text-white text-lg font-bold">Report an Issue</h3>
                            </div>
                            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/10 group-hover:scale-110 transition-transform">
                              <i className="fas fa-microphone text-white text-lg"></i>
                            </div>
                         </div>
                      </div>
                    </div>

                    {/* Timeline */}
                    <div className="flex-1 px-6 overflow-hidden relative">
                       <div className="absolute inset-x-0 top-0 h-8 bg-gradient-to-b from-slate-950 to-transparent z-10"></div>
                       <div className="space-y-4 pt-2">
                          <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="bg-slate-900/50 border border-white/5 p-4 rounded-xl flex gap-4 items-start"
                          >
                             <div className="w-10 h-10 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center shrink-0 border border-green-500/20">
                               <i className="fas fa-check text-sm"></i>
                             </div>
                             <div>
                               <h4 className="text-slate-200 font-medium text-sm">Streetlight Fixed</h4>
                               <p className="text-slate-500 text-xs mt-1">MG Road, Sector 4 • 2 hrs ago</p>
                             </div>
                          </motion.div>

                          <motion.div 
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="bg-slate-900/50 border border-white/5 p-4 rounded-xl flex gap-4 items-start"
                          >
                             <div className="w-10 h-10 rounded-full bg-yellow-500/10 text-yellow-500 flex items-center justify-center shrink-0 border border-yellow-500/20">
                               <i className="fas fa-clock text-sm"></i>
                             </div>
                             <div>
                               <h4 className="text-slate-200 font-medium text-sm">In Progress</h4>
                               <p className="text-slate-500 text-xs mt-1">Garbage Collection • Estimated 24h</p>
                             </div>
                          </motion.div>
                       </div>
                       <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950 to-transparent z-10"></div>
                    </div>

                    {/* Bottom Nav */}
                    <div className="h-20 bg-slate-900 border-t border-white/5 px-8 flex justify-between items-center">
                       <i className="fas fa-home text-primary text-xl"></i>
                       <i className="fas fa-compass text-slate-600 text-xl"></i>
                       <i className="fas fa-user text-slate-600 text-xl"></i>
                    </div>

                 </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, y: [0, 10, 0] }}
          transition={{ delay: 2, duration: 2, repeat: Infinity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500 text-xs tracking-widest uppercase"
        >
          Scroll
          <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent"></div>
        </motion.div>
      </section>

      {/* How It Works - Dark Cards */}
      <section id="how-it-works" className="py-32 relative z-10">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-5xl font-bold mb-6 text-white font-display"
            >
              Simplify Civic Action
            </motion.h2>
            <p className="text-slate-400 text-lg">Designed for speed, built for impact. Here is the flow.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "fa-microphone", title: "Raise", desc: "Speak in your language. Upload evidence instantly.", color: "text-orange-500", bg: "from-orange-500/20 to-orange-500/5" },
              { icon: "fa-cogs", title: "Process", desc: "AI structures your complaint & finds the right dept.", color: "text-blue-500", bg: "from-blue-500/20 to-blue-500/5" },
              { icon: "fa-rocket", title: "Boost", desc: "Auto-tweet to authorities for faster visibility.", color: "text-purple-500", bg: "from-purple-500/20 to-purple-500/5" },
              { icon: "fa-check-circle", title: "Resolve", desc: "Get real-time updates until the job is done.", color: "text-green-500", bg: "from-green-500/20 to-green-500/5" }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <SpotlightCard className="h-full p-8 hover:border-white/20 transition-colors">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${step.bg} ${step.color} flex items-center justify-center text-2xl mb-6 border border-white/5 shadow-inner`}>
                    <i className={`fas ${step.icon}`}></i>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white">{step.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Showcase Section (Terminal Style) */}
      <section id="ai-features" className="py-32 relative overflow-hidden">
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[800px] h-[800px] bg-primary/5 rounded-full blur-[100px] -z-10 pointer-events-none"></div>
        
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="inline-block px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-bold border border-blue-500/20 mb-6">
                POWERED BY LLMs
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-8 text-white font-display leading-tight">
                An AI that speaks <br /> <span className="text-blue-400">Bureaucrat.</span>
              </h2>
              <p className="text-slate-400 mb-10 text-lg leading-relaxed">
                Filing a complaint requires knowing the right terms, laws, and departments. mysaarti's AI handles that complexity for you in milliseconds.
              </p>
              
              <div className="space-y-6">
                 {[
                   { title: "Smart Routing", desc: "Auto-detects if it's BMC, MSEDCL, or BEST." },
                   { title: "Severity Scoring", desc: "Flags urgent issues like open manholes instantly." },
                   { title: "Legal Context", desc: "Cites relevant civic acts to add weight to your complaint." }
                 ].map((feat, i) => (
                   <div key={i} className="flex gap-4">
                     <div className="w-1 h-full min-h-[50px] bg-gradient-to-b from-blue-500 to-transparent rounded-full opacity-50"></div>
                     <div>
                       <h4 className="text-white font-bold text-lg">{feat.title}</h4>
                       <p className="text-slate-500 text-sm">{feat.desc}</p>
                     </div>
                   </div>
                 ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative"
            >
              {/* Terminal / Chat Window */}
              <div className="bg-[#0F1117] rounded-xl border border-white/10 shadow-2xl overflow-hidden font-mono text-sm relative group">
                {/* Window Controls */}
                <div className="bg-[#1A1D26] px-4 py-3 flex items-center gap-2 border-b border-white/5">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/50"></div>
                  <div className="ml-auto text-xs text-slate-500">ai_processor.exe</div>
                </div>
                
                <div className="p-6 space-y-6 min-h-[400px]">
                   {/* User Input */}
                   <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 }}
                      className="flex gap-4"
                   >
                      <div className="w-8 h-8 rounded bg-slate-700 flex items-center justify-center shrink-0 text-white/50">
                        <i className="fas fa-user"></i>
                      </div>
                      <div className="bg-[#1A1D26] p-4 rounded-lg text-slate-300 border border-white/5 w-full">
                         <span className="text-orange-400 mr-2">$</span>
                         "The street light outside my house on Hill Road, Bandra West has been flickering for a week. It's unsafe."
                      </div>
                   </motion.div>

                   {/* Processing Animation */}
                   <motion.div 
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 1 }}
                      className="flex items-center gap-2 text-blue-400 text-xs pl-12"
                   >
                      <i className="fas fa-circle-notch fa-spin"></i>
                      <span>Analyzing location... Categorizing issue...</span>
                   </motion.div>

                   {/* AI Output */}
                   <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 2.5 }}
                      className="flex gap-4"
                   >
                      <div className="w-8 h-8 rounded bg-primary/20 flex items-center justify-center shrink-0 text-primary border border-primary/30">
                        <i className="fas fa-robot"></i>
                      </div>
                      <div className="bg-primary/5 p-5 rounded-lg text-slate-300 border border-primary/10 w-full relative overflow-hidden">
                         <div className="absolute top-0 left-0 w-1 h-full bg-primary"></div>
                         <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                           <i className="fas fa-file-alt text-primary"></i> Draft Complaint Generated
                         </h4>
                         
                         <div className="grid grid-cols-2 gap-4 mb-4 text-xs">
                            <div className="bg-black/20 p-2 rounded">
                              <span className="block text-slate-500">Department</span>
                              <span className="text-white font-semibold">BEST (Electrical)</span>
                            </div>
                            <div className="bg-black/20 p-2 rounded">
                              <span className="block text-slate-500">Priority</span>
                              <span className="text-orange-400 font-semibold">High (Safety Risk)</span>
                            </div>
                         </div>

                         <p className="text-slate-400 text-xs leading-relaxed opacity-80">
                           "Subject: Urgent Repair Request for Street Light Infrastructure<br/><br/>
                           Dear Sir/Madam,<br/>
                           I am writing to report a malfunctioning street light at 12th Main, Indiranagar (Coords: 12.97, 77.64). This poses a public safety risk..."
                         </p>

                         <div className="mt-4 flex gap-2">
                           <Button size="sm" className="bg-primary hover:bg-primary/90 text-white h-8 text-xs">File Now</Button>
                           <Button size="sm" variant="outline" className="border-white/10 hover:bg-white/5 text-slate-300 h-8 text-xs">Edit</Button>
                         </div>
                      </div>
                   </motion.div>
                </div>
                
                {/* Scanline Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-20 bg-[length:100%_2px,3px_100%] pointer-events-none opacity-20"></div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Analytics Section - Glass Cards */}
      <section id="analytics" className="py-32 bg-black/20 border-y border-white/5">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
            <div className="max-w-2xl">
               <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white font-display">Real-time Civic Pulse</h2>
               <p className="text-slate-400">We aggregate data to show you what's really happening in your city.</p>
            </div>
            <Button variant="outline" className="border-white/10 text-slate-300 hover:bg-white/5 gap-2">
              View Full Dashboard <i className="fas fa-external-link-alt text-xs"></i>
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <SpotlightCard className="p-6 bg-card/50 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-8">
                <div>
                   <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Total Resolved</p>
                   <h3 className="text-3xl font-bold text-white">14,203</h3>
                </div>
                <div className="p-2 rounded-lg bg-green-500/10 text-green-500">
                   <i className="fas fa-check-double"></i>
                </div>
              </div>
              {/* CSS Bar Chart */}
              <div className="flex items-end gap-1 h-24 opacity-80">
                 {[40, 60, 45, 70, 65, 85, 55, 90, 75, 100].map((h, i) => (
                   <motion.div 
                     key={i}
                     initial={{ height: 0 }}
                     whileInView={{ height: `${h}%` }}
                     viewport={{ once: true }}
                     transition={{ duration: 0.5, delay: i * 0.05 }}
                     className="flex-1 bg-gradient-to-t from-green-600 to-green-400/50 rounded-t-sm hover:bg-green-400 transition-colors"
                   />
                 ))}
              </div>
            </SpotlightCard>

             {/* Card 2 */}
             <SpotlightCard className="p-6 bg-card/50 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-8">
                <div>
                   <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Avg Response Time</p>
                   <h3 className="text-3xl font-bold text-white">48h <span className="text-sm text-slate-500 font-normal">(-12%)</span></h3>
                </div>
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                   <i className="fas fa-stopwatch"></i>
                </div>
              </div>
              {/* Wave visual */}
              <div className="h-24 relative overflow-hidden rounded-lg bg-blue-500/5 border border-blue-500/10">
                 <motion.div 
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="absolute bottom-0 left-0 w-[200%] h-full opacity-40"
                    style={{
                      backgroundImage: 'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 1440 320\'%3E%3Cpath fill=\'%233b82f6\' fill-opacity=\'1\' d=\'M0,160L48,170.7C96,181,192,203,288,197.3C384,192,480,160,576,149.3C672,139,768,149,864,170.7C960,192,1056,224,1152,218.7C1248,213,1344,171,1392,149.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z\'%3E%3C/path%3E%3C/svg%3E")',
                      backgroundSize: '50% 100%',
                      backgroundRepeat: 'repeat-x',
                      backgroundPosition: 'bottom'
                    }}
                 />
              </div>
            </SpotlightCard>

            {/* Card 3 */}
            <SpotlightCard className="p-6 bg-card/50 backdrop-blur-sm">
              <div className="flex justify-between items-start mb-6">
                <div>
                   <p className="text-slate-500 text-xs font-bold uppercase tracking-wider mb-1">Trending Issues</p>
                   <h3 className="text-xl font-bold text-white">Top Categories</h3>
                </div>
                <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
                   <i className="fas fa-fire"></i>
                </div>
              </div>
              <div className="space-y-4">
                 {[
                   { label: "Potholes", val: 78, color: "bg-red-500" },
                   { label: "Garbage", val: 65, color: "bg-orange-500" },
                   { label: "Water Supply", val: 42, color: "bg-blue-500" }
                 ].map((item, i) => (
                   <div key={i}>
                      <div className="flex justify-between text-xs text-slate-300 mb-1">
                        <span>{item.label}</span>
                        <span>{item.val}% vol</span>
                      </div>
                      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          whileInView={{ width: `${item.val}%` }}
                          transition={{ duration: 1, delay: 0.5 + (i*0.2) }}
                          className={`h-full ${item.color}`}
                        />
                      </div>
                   </div>
                 ))}
              </div>
            </SpotlightCard>
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section id="roadmap" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-white font-display">The Path Ahead</h2>
            <p className="text-slate-400">Building the digital infrastructure for Indian democracy.</p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            {/* Vertical Line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/0 via-primary/50 to-primary/0"></div>
            
            <div className="space-y-12">
              {[
                { phase: "Phase 1", title: "Complaint MVP", desc: "Core filing engine & authority mapping.", status: "Live" },
                { phase: "Phase 2", title: "Social Engine", desc: "Auto-posting to Twitter & tagging officials.", status: "Beta" },
                { phase: "Phase 3", title: "AI Resolution", desc: "Predictive analytics for government bodies.", status: "Upcoming" },
                { phase: "Phase 4", title: "Civic Token", desc: "Blockchain rewards for active citizens.", status: "Concept" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className={`flex flex-col md:flex-row gap-8 relative ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  {/* Date/Status Side */}
                  <div className={`md:w-1/2 flex items-center ${index % 2 === 0 ? 'md:justify-start' : 'md:justify-end'} pl-12 md:pl-0`}>
                     <span className="text-primary text-sm font-mono tracking-widest uppercase bg-primary/10 px-3 py-1 rounded border border-primary/20">
                       {item.status}
                     </span>
                  </div>
                  
                  {/* Dot */}
                  <div className="absolute left-4 md:left-1/2 -translate-x-[5px] top-6 w-3 h-3 bg-black border-2 border-primary rounded-full z-10 shadow-[0_0_10px_var(--color-primary)]"></div>
                  
                  {/* Content Side */}
                  <div className="md:w-1/2 pl-12 md:pl-0">
                    <div className={`bg-card/40 border border-white/5 p-6 rounded-xl hover:border-primary/30 transition-colors ${index % 2 !== 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                       <h3 className="text-white font-bold text-xl mb-2">{item.title}</h3>
                       <p className="text-slate-400 text-sm">{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/20"></div>
        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-5xl lg:text-7xl font-bold mb-8 text-white font-display tracking-tight"
          >
            Ready to <span className="text-primary">Fix It?</span>
          </motion.h2>
          <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto">
            Join thousands of citizens who are taking charge of their neighborhoods today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
             <Button size="lg" className="bg-white text-black hover:bg-slate-200 h-16 px-10 rounded-full text-lg font-bold shadow-2xl hover:scale-105 transition-transform">
               Download Now
             </Button>
             <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 h-16 px-10 rounded-full text-lg">
               Partner with Us
             </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-white/10 pt-20 pb-10">
        <div className="container mx-auto px-6">
           <div className="grid md:grid-cols-4 gap-12 mb-16 text-sm">
              <div className="col-span-2">
                 <div className="flex items-center gap-2 mb-6">
                    <div className="w-8 h-8 rounded bg-primary flex items-center justify-center text-white font-bold">m</div>
                    <span className="text-xl font-bold text-white">mysaarti.in</span>
                 </div>
                 <p className="text-slate-400 max-w-xs leading-relaxed">
                   Empowering Indian citizens with AI tools to effectively communicate with governance structures and track resolution.
                 </p>
              </div>
              <div>
                 <h4 className="text-white font-bold mb-6">Platform</h4>
                 <ul className="space-y-3 text-slate-500">
                   <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                   <li><a href="#" className="hover:text-primary transition-colors">Live Map</a></li>
                   <li><a href="#" className="hover:text-primary transition-colors">Govt Login</a></li>
                 </ul>
              </div>
              <div id="contact">
                 <h4 className="text-white font-bold mb-6">Connect</h4>
                 <ul className="space-y-3 text-slate-500">
                   <li className="flex items-center gap-2"><i className="fab fa-twitter"></i> Twitter</li>
                   <li className="flex items-center gap-2"><i className="fab fa-linkedin"></i> LinkedIn</li>
                   <li className="flex items-center gap-2"><i className="fas fa-envelope"></i> help@mysaarti.in</li>
                 </ul>
              </div>
           </div>
           
           <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-slate-600">
             <div>© {new Date().getFullYear()} mysaarti.in. Made with <i className="fas fa-heart text-red-900"></i> for India.</div>
             <div className="flex gap-6">
               <a href="#">Privacy Policy</a>
               <a href="#">Terms of Service</a>
             </div>
           </div>
        </div>
      </footer>
    </div>
  );
}
