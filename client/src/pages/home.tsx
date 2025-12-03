import { useEffect, useState } from "react";
import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

// Animation variants
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.6, ease: "easeOut" } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const { toast } = useToast();
  const { scrollY } = useScroll();
  const navBackground = useTransform(
    scrollY,
    [0, 50],
    ["rgba(255, 255, 255, 0)", "rgba(255, 255, 255, 0.8)"]
  );

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message Sent",
      description: "Thank you for reaching out! We will get back to you soon.",
    });
  };

  return (
    <div className="min-h-screen bg-background font-sans overflow-x-hidden">
      {/* Sticky Navbar */}
      <motion.nav
        style={{ backgroundColor: navBackground }}
        className={`fixed top-0 w-full z-50 transition-all duration-300 backdrop-blur-md border-b border-transparent ${
          scrolled ? "border-border/40 shadow-sm" : ""
        }`}
      >
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => scrollToSection('hero')}>
            <div className="relative w-8 h-8 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center text-white font-bold shadow-lg">
              m
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground font-display">
              mysaarti<span className="text-primary">.in</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-medium text-sm text-muted-foreground">
            {["How It Works", "AI Features", "Analytics", "For Whom", "Roadmap", "Contact"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase().replace(/\s+/g, '-'))}
                className="hover:text-primary transition-colors"
              >
                {item}
              </button>
            ))}
          </div>

          <Button 
            className="bg-primary hover:bg-primary/90 text-white rounded-full px-6 shadow-lg hover:shadow-primary/20 hover:-translate-y-0.5 transition-all duration-300"
          >
            Download App
          </Button>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <section id="hero" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-orange-50 via-white to-blue-50 -z-20" />
        <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gradient-to-bl from-primary/10 to-transparent blur-3xl rounded-full -z-10 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/2 bg-gradient-to-tr from-secondary/10 to-transparent blur-3xl rounded-full -z-10" />

        <div className="container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="max-w-2xl"
          >
            <motion.div variants={fadeInUp} className="flex flex-wrap gap-3 mb-6">
              <span className="px-3 py-1 rounded-full bg-orange-100 text-orange-700 text-xs font-bold border border-orange-200 flex items-center gap-1">
                🇮🇳 Built for India
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-xs font-bold border border-blue-200 flex items-center gap-1">
                🤖 AI Powered
              </span>
              <span className="px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold border border-green-200 flex items-center gap-1">
                🔒 Privacy Aware
              </span>
            </motion.div>
            
            <motion.h1 variants={fadeInUp} className="text-5xl lg:text-6xl font-bold leading-tight text-slate-900 mb-6 font-display">
              Raise Complaints. <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-orange-400">Be Heard.</span> <br />
              <span className="text-secondary">Get Resolution.</span>
            </motion.h1>
            
            <motion.p variants={fadeInUp} className="text-lg text-slate-600 mb-8 leading-relaxed">
              mysaarti.in is India’s citizen-first AI companion for filing grievances, auto-follow-ups, and civic insights. We bridge the gap between you and the authorities.
            </motion.p>
            
            <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-4">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white rounded-full px-8 h-12 shadow-xl shadow-primary/20 hover:-translate-y-1 transition-all">
                Get Started
              </Button>
              <Button variant="outline" size="lg" className="border-slate-200 hover:bg-slate-50 text-slate-700 rounded-full px-8 h-12 hover:-translate-y-1 transition-all gap-2">
                <i className="fas fa-play text-xs"></i> Watch Demo
              </Button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:block"
          >
            {/* Phone Mockup */}
            <div className="relative mx-auto border-gray-800 bg-gray-800 border-[14px] rounded-[2.5rem] h-[600px] w-[300px] shadow-2xl flex flex-col overflow-hidden z-10">
              <div className="h-[32px] w-[3px] bg-gray-800 absolute -left-[17px] top-[72px] rounded-l-lg"></div>
              <div className="h-[46px] w-[3px] bg-gray-800 absolute -left-[17px] top-[124px] rounded-l-lg"></div>
              <div className="h-[64px] w-[3px] bg-gray-800 absolute -right-[17px] top-[142px] rounded-r-lg"></div>
              <div className="rounded-[2rem] overflow-hidden w-full h-full bg-white flex flex-col relative">
                {/* Mock App Header */}
                <div className="bg-gradient-to-r from-primary to-orange-500 p-6 pb-12 text-white rounded-b-3xl mb-4">
                  <div className="flex justify-between items-center mb-4">
                    <i className="fas fa-bars"></i>
                    <span className="font-bold">mysaarti</span>
                    <i className="fas fa-bell"></i>
                  </div>
                  <h3 className="font-bold text-xl">Namaste, Rahul! 🙏</h3>
                  <p className="text-sm opacity-90">What's bothering you today?</p>
                </div>
                
                {/* Mock App Content */}
                <div className="px-4 flex-1 overflow-hidden">
                  <div className="bg-white shadow-lg rounded-xl p-4 -mt-8 mb-4 border border-slate-100 relative z-10">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        <i className="fas fa-microphone"></i>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Recording...</p>
                        <div className="h-1 w-24 bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500 animate-pulse w-2/3"></div>
                        </div>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-slate-800">"There is a huge pothole on MG Road..."</p>
                  </div>

                  <div className="space-y-3">
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex gap-3 items-center">
                      <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">
                        <i className="fas fa-check"></i>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-700">Complaint Filed #8821</p>
                        <p className="text-[10px] text-slate-500">Sent to Municipal Corp.</p>
                      </div>
                    </div>
                    <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 flex gap-3 items-center opacity-60">
                      <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 text-xs">
                        <i className="fas fa-clock"></i>
                      </div>
                      <div>
                        <p className="text-xs font-bold text-slate-700">Waiting for Response</p>
                        <p className="text-[10px] text-slate-500">ETA: 2 Days</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Floating FAB */}
                <div className="absolute bottom-6 right-6 w-14 h-14 bg-primary rounded-full shadow-xl flex items-center justify-center text-white text-xl hover:scale-110 transition-transform cursor-pointer">
                  <i className="fas fa-plus"></i>
                </div>
              </div>
            </div>

            {/* Animated shapes behind phone */}
            <motion.div 
              animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-20 right-0 w-32 h-32 bg-orange-400/20 rounded-full blur-xl -z-10"
            />
            <motion.div 
              animate={{ y: [0, 30, 0], x: [0, -20, 0] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-40 -left-10 w-40 h-40 bg-indigo-600/10 rounded-full blur-xl -z-10"
            />
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-24 bg-white relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900 font-display">How mysaarti.in Works</h2>
            <p className="text-slate-600">From voicing your concern to getting it resolved, we handle the heavy lifting.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: "fa-microphone", title: "Raise", desc: "Speak or type in Indian languages. Add photos or videos of the issue.", color: "text-orange-500", bg: "bg-orange-50" },
              { icon: "fa-paper-plane", title: "Auto-File", desc: "mysaarti.in structures your complaint and files it to the right authorities.", color: "text-blue-600", bg: "bg-blue-50" },
              { icon: "fa-bullhorn", title: "Boost (Optional)", desc: "Share on Twitter/Instagram to increase public visibility and accountability.", color: "text-purple-600", bg: "bg-purple-50" },
              { icon: "fa-chart-line", title: "Track & Resolve", desc: "Track status, follow-ups, and resolution in one unified timeline.", color: "text-green-600", bg: "bg-green-50" }
            ].map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="p-6 rounded-2xl border border-slate-100 bg-white shadow-sm hover:shadow-xl transition-all duration-300 group"
              >
                <div className={`w-14 h-14 rounded-2xl ${step.bg} ${step.color} flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform`}>
                  <i className={`fas ${step.icon}`}></i>
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">{step.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* AI Features */}
      <section id="ai-features" className="py-24 bg-slate-50 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold mb-6 text-slate-900 font-display">AI-Powered Civic Assistant</h2>
              <p className="text-slate-600 mb-8 text-lg">Our advanced AI understands local contexts, dialects, and government processes to ensure your voice is taken seriously.</p>
              
              <ul className="space-y-6">
                {[
                  "Smart department detection & routing",
                  "Government-style formal complaint drafting",
                  "Urgency and sentiment scoring",
                  "FAQ and rights suggestions for similar issues",
                  "Pattern spotting for recurring civic problems"
                ].map((feature, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <div className="w-6 h-6 rounded-full bg-green-100 text-green-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <i className="fas fa-check text-xs"></i>
                    </div>
                    <span className="text-slate-700 font-medium">{feature}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-secondary/20 rounded-3xl blur-xl opacity-50 animate-pulse"></div>
              <div className="relative bg-white rounded-2xl shadow-2xl p-6 border border-slate-100 max-w-md mx-auto">
                <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary to-orange-400 flex items-center justify-center text-white">
                    <i className="fas fa-robot"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900">mysaarti AI</h4>
                    <p className="text-xs text-green-600 flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-green-600"></span> Online
                    </p>
                  </div>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-end">
                    <div className="bg-primary text-white p-3 rounded-2xl rounded-tr-sm max-w-[85%] shadow-md">
                      "Garbage hasn't been collected in Sector 4 for 3 days. It smells bad."
                    </div>
                  </div>
                  
                  <div className="flex justify-start">
                    <div className="bg-slate-100 text-slate-800 p-4 rounded-2xl rounded-tl-sm max-w-[90%] border border-slate-200 shadow-sm">
                      <p className="mb-2 font-semibold text-primary">I've analyzed your complaint:</p>
                      <div className="space-y-2 text-xs text-slate-600 mb-3">
                        <div className="flex justify-between border-b border-slate-200 pb-1">
                          <span>Category:</span>
                          <span className="font-bold text-slate-800">Sanitation / Waste</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-1">
                          <span>Urgency:</span>
                          <span className="font-bold text-orange-600">High (Health Hazard)</span>
                        </div>
                        <div className="flex justify-between border-b border-slate-200 pb-1">
                          <span>Authority:</span>
                          <span className="font-bold text-slate-800">Municipal Corporation</span>
                        </div>
                      </div>
                      <p>I am drafting a formal complaint citing <b>Solid Waste Management Rules, 2016</b>. Should I include the location from your GPS?</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 flex gap-2">
                  <Button size="sm" variant="outline" className="text-xs rounded-full border-primary/20 text-primary hover:bg-primary/5">Yes, include location</Button>
                  <Button size="sm" variant="outline" className="text-xs rounded-full border-slate-200 text-slate-600 hover:bg-slate-50">Edit details</Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Analytics Section */}
      <section id="analytics" className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900 font-display">Civic Insights & Analytics</h2>
            <p className="text-slate-600">Data-driven governance. mysaarti.in generates heatmaps, tracks resolution times, and identifies trending issues.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Card 1: Hotspots */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800">Issue Hotspots</h3>
                <i className="fas fa-map-marked-alt text-slate-400"></i>
              </div>
              <div className="grid grid-cols-4 gap-1 h-32 rounded-lg overflow-hidden opacity-80">
                {[...Array(16)].map((_, i) => (
                  <div 
                    key={i} 
                    className="rounded-sm"
                    style={{ 
                      backgroundColor: i === 5 || i === 6 || i === 9 ? '#ef4444' : i === 10 || i === 11 ? '#f97316' : '#e2e8f0',
                      opacity: Math.random() * 0.5 + 0.5
                    }}
                  ></div>
                ))}
              </div>
              <div className="mt-4 flex justify-between text-xs text-slate-500">
                <span>High Density</span>
                <span>Low Density</span>
              </div>
            </motion.div>

            {/* Card 2: Resolution Performance */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800">Resolution Rate</h3>
                <i className="fas fa-chart-area text-green-500"></i>
              </div>
              <div className="h-32 flex items-end gap-2 px-2">
                {[30, 45, 35, 60, 55, 75, 90].map((h, i) => (
                  <motion.div 
                    key={i}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${h}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: i * 0.1 }}
                    className="flex-1 bg-gradient-to-t from-green-500 to-green-300 rounded-t-sm"
                  ></motion.div>
                ))}
              </div>
              <div className="mt-4 text-center text-sm font-bold text-green-600">
                <i className="fas fa-arrow-up mr-1"></i> 24% Improvement
              </div>
            </motion.div>

            {/* Card 3: Emerging Issues */}
            <motion.div 
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-lg"
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-800">Emerging Trends</h3>
                <i className="fas fa-bolt text-yellow-500"></i>
              </div>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-2 bg-red-50 rounded-lg border border-red-100">
                  <span className="text-sm font-medium text-red-800">Potholes</span>
                  <span className="text-xs font-bold text-red-600 flex items-center gap-1">
                    <i className="fas fa-arrow-up"></i> 12%
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-orange-50 rounded-lg border border-orange-100">
                  <span className="text-sm font-medium text-orange-800">Water Logging</span>
                  <span className="text-xs font-bold text-orange-600 flex items-center gap-1">
                    <i className="fas fa-arrow-up"></i> 8%
                  </span>
                </div>
                <div className="flex justify-between items-center p-2 bg-green-50 rounded-lg border border-green-100">
                  <span className="text-sm font-medium text-green-800">Streetlights</span>
                  <span className="text-xs font-bold text-green-600 flex items-center gap-1">
                    <i className="fas fa-arrow-down"></i> 5%
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Who Is It For */}
      <section id="for-whom" className="py-24 bg-slate-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900 font-display">Built for Every Stakeholder</h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { icon: "fa-user", title: "Citizens", desc: "Easy filing & tracking" },
              { icon: "fa-building", title: "RWAs & NGOs", desc: "Bulk reporting tools" },
              { icon: "fa-newspaper", title: "Journalists", desc: "Data for civic stories" },
              { icon: "fa-fist-raised", title: "Activists", desc: "Evidence & timelines" },
              { icon: "fa-landmark", title: "Govt Depts", desc: "Structured inputs" }
            ].map((persona, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, borderColor: "var(--color-primary)" }}
                className="bg-white p-6 rounded-xl border border-slate-200 text-center group cursor-default transition-colors"
              >
                <div className="w-12 h-12 mx-auto rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-xl mb-4 group-hover:bg-primary group-hover:text-white transition-colors">
                  <i className={`fas ${persona.icon}`}></i>
                </div>
                <h4 className="font-bold text-slate-900 mb-2">{persona.title}</h4>
                <p className="text-xs text-slate-500">{persona.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Roadmap */}
      <section id="roadmap" className="py-24 bg-white overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-slate-900 font-display">Roadmap</h2>
          </div>

          <div className="relative">
            {/* Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-slate-100 hidden md:block"></div>
            
            <div className="space-y-12 relative">
              {[
                { phase: "Phase 1", title: "Complaint + Filing MVP", status: "Live" },
                { phase: "Phase 2", title: "Social Boost + Follow-Up Engine", status: "In Progress" },
                { phase: "Phase 3", title: "AI Core – Classifier & FAQ", status: "Next" },
                { phase: "Phase 4", title: "Analytics Dashboard", status: "Planned" },
                { phase: "Phase 5", title: "Govt & NGO Partnerships", status: "Future" }
              ].map((item, index) => (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className={`flex items-center md:justify-between flex-col md:flex-row ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className="w-full md:w-5/12"></div>
                  <div className="w-8 h-8 absolute left-1/2 transform -translate-x-1/2 rounded-full border-4 border-white shadow-md bg-primary z-10 hidden md:flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <div className={`w-full md:w-5/12 p-6 rounded-2xl border ${index === 0 ? 'bg-primary/5 border-primary/20' : 'bg-slate-50 border-slate-100'} text-center md:text-left`}>
                    <span className={`text-xs font-bold px-2 py-1 rounded-full mb-2 inline-block ${index === 0 ? 'bg-primary text-white' : 'bg-slate-200 text-slate-600'}`}>
                      {item.phase}
                    </span>
                    <h3 className="font-bold text-lg text-slate-800">{item.title}</h3>
                    <p className="text-sm text-slate-500 mt-1">Status: {item.status}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-secondary to-indigo-900 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div className="container mx-auto px-6 relative z-10">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="text-4xl lg:text-5xl font-bold mb-8 font-display"
          >
            Ready to be heard?
          </motion.h2>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button size="lg" className="bg-white text-indigo-900 hover:bg-indigo-50 font-bold rounded-full px-10 h-14 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] transition-all transform hover:-translate-y-1">
              Join Early Access
            </Button>
            <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 font-bold rounded-full px-10 h-14 gap-2">
              <i className="fab fa-android text-lg"></i> Download Android App
            </Button>
          </div>
        </div>
      </section>

      {/* Contact & Footer */}
      <section id="contact" className="bg-slate-900 text-slate-300 pt-20 pb-10">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 mb-20">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6 font-display">Get in Touch</h2>
              <p className="mb-8 leading-relaxed opacity-80">Have questions, suggestions, or want to partner with us? We'd love to hear from you.</p>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                    <i className="fas fa-envelope text-primary"></i>
                  </div>
                  <span>hello@mysaarti.in</span>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center">
                    <i className="fas fa-map-marker-alt text-primary"></i>
                  </div>
                  <span>Bangalore, India</span>
                </div>
              </div>

              <div className="flex gap-4 mt-8">
                {['twitter', 'instagram', 'linkedin'].map((social) => (
                  <a key={social} href="#" className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center hover:bg-primary hover:text-white transition-all">
                    <i className={`fab fa-${social}`}></i>
                  </a>
                ))}
              </div>
            </div>

            <div className="bg-slate-800 p-8 rounded-2xl border border-slate-700">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold tracking-wider">Name</label>
                    <Input className="bg-slate-900 border-slate-700" placeholder="Rahul Kumar" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs uppercase font-bold tracking-wider">Email</label>
                    <Input className="bg-slate-900 border-slate-700" type="email" placeholder="rahul@example.com" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold tracking-wider">Message</label>
                  <Textarea className="bg-slate-900 border-slate-700 min-h-[120px]" placeholder="Tell us your civic challenge..." required />
                </div>
                <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-white">Send Message</Button>
              </form>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
               <span className="text-xl font-bold tracking-tight text-white font-display">
                mysaarti<span className="text-primary">.in</span>
              </span>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white transition-colors">Features</a>
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms</a>
            </div>
            <div className="text-xs opacity-60">
              © {new Date().getFullYear()} mysaarti.in • Built for India 🇮🇳
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
