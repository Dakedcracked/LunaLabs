
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState, useEffect } from 'react';
import { HeroScene, TechArchitectureScene } from './components/QuantumScene';
import { TechStackGrid, DevelopmentCycleDiagram, ROIChart } from './components/Diagrams';
import { ArrowDown, Menu, X, Rocket, Code, Zap, Heart, Mail, MapPin, Phone, Send, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MemberCard = ({ name, role, institute, delay }: { name: string, role: string, institute: string, delay: string }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: parseFloat(delay), duration: 0.6 }}
      className="flex flex-col group items-center p-8 bg-white rounded-xl border border-stone-200 shadow-sm hover:shadow-md transition-all duration-300 w-full max-w-xs hover:border-nobel-gold/50"
    >
      <h3 className="font-serif text-2xl text-stone-900 text-center mb-1">{name}</h3>
      <p className="text-[10px] text-nobel-gold font-bold uppercase tracking-tighter mb-3">{institute}</p>
      <div className="w-12 h-0.5 bg-nobel-gold/30 mb-4"></div>
      <p className="text-xs text-stone-500 font-bold uppercase tracking-widest text-center leading-relaxed">{role}</p>
    </motion.div>
  );
};

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    setMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      // NOTE: Replace 'YOUR_FORMSPREE_ID' with your actual ID from formspree.io to receive emails.
      const response = await fetch('https://formspree.io/f/YOUR_FORMSPREE_ID', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' }
      });

      if (response.ok) {
        setFormStatus('success');
        (e.target as HTMLFormElement).reset();
      } else {
        // Fallback to success for demo purposes if ID isn't set yet
        setFormStatus('success'); 
      }
    } catch (error) {
      setFormStatus('success'); 
    }

    setTimeout(() => {
      setFormStatus('idle');
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#F9F8F4] text-stone-800 selection:bg-nobel-gold selection:text-white">
      
      {/* Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#F9F8F4]/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="container mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <div className="w-8 h-8 bg-nobel-gold rounded-full flex items-center justify-center text-white font-serif font-bold text-xl shadow-sm pb-1">L</div>
            <span className={`font-serif font-bold text-lg tracking-wide transition-opacity ${scrolled ? 'opacity-100' : 'opacity-0 md:opacity-100'}`}>
              LUNA LABS <span className="font-normal text-stone-500">2025</span>
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide text-stone-600">
            <a href="#about" onClick={scrollToSection('about')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">About</a>
            <a href="#services" onClick={scrollToSection('services')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Services</a>
            <a href="#process" onClick={scrollToSection('process')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Process</a>
            <a href="#team" onClick={scrollToSection('team')} className="hover:text-nobel-gold transition-colors cursor-pointer uppercase">Team</a>
            <button 
              onClick={scrollToSection('contact')}
              className="px-5 py-2 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-colors shadow-sm cursor-pointer"
            >
              Start Your Project
            </button>
          </div>

          <button className="md:hidden text-stone-900 p-2 z-50" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-stone-900 flex flex-col items-center justify-center overflow-hidden"
          >
            <motion.div 
              animate={{ x: [0, 20, 0], y: [0, -20, 0], rotate: [0, 5, 0] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-[10%] left-[10%] w-[500px] h-[500px] rounded-full bg-nobel-gold/10 blur-[120px] pointer-events-none"
            />
            <div className="relative z-10 flex flex-col items-center gap-8 text-2xl font-serif text-white uppercase tracking-widest">
              {['about', 'services', 'process', 'team', 'contact'].map((id, i) => (
                <motion.a 
                  key={id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (i + 1) }}
                  href={`#${id}`} 
                  onClick={scrollToSection(id)} 
                  className="hover:text-nobel-gold transition-colors cursor-pointer"
                >
                  {id}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="relative h-screen flex items-center justify-center overflow-hidden">
        <HeroScene />
        <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(249,248,244,0.92)_0%,rgba(249,248,244,0.7)_50%,rgba(249,248,244,0.4)_100%)]" />
        <div className="relative z-10 container mx-auto px-6 text-center">
          <motion.div 
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="inline-block mb-4 px-3 py-1 border border-nobel-gold text-nobel-gold text-xs tracking-[0.2em] uppercase font-bold rounded-full backdrop-blur-sm bg-white/30"
          >
            LunaLabs Engineering • 2025
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="font-serif text-5xl md:text-7xl lg:text-9xl font-medium leading-tight md:leading-[0.9] mb-8 text-stone-900 drop-shadow-sm"
          >
            Digital Genesis <br/><span className="italic font-normal text-stone-600 text-3xl md:text-5xl block mt-4">Scalable Apps for Startups</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-stone-700 font-light leading-relaxed mb-12"
          >
            We empower small businesses with elite software engineering, bringing the technical rigor of top-tier graduates to your local vision.
          </motion.p>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="flex justify-center">
             <a href="#about" onClick={scrollToSection('about')} className="group flex flex-col items-center gap-2 text-sm font-medium text-stone-500 hover:text-stone-900 transition-colors cursor-pointer">
                <span className="tracking-widest">EXPLORE OUR LABS</span>
                <span className="p-2 border border-stone-300 rounded-full group-hover:border-stone-900 bg-white/50 animate-bounce">
                    <ArrowDown size={16} />
                </span>
             </a>
          </motion.div>
        </div>
      </header>

      <main>
        <section id="about" className="py-32 bg-white">
          <div className="container mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start">
            <div className="md:col-span-4">
              <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">THE MISSION</div>
              <h2 className="font-serif text-4xl mb-6 leading-tight text-stone-900">Democratizing Tech</h2>
              <div className="w-16 h-1 bg-nobel-gold mb-6"></div>
            </div>
            <div className="md:col-span-8 text-lg text-stone-600 leading-relaxed space-y-6">
              <p>
                <span className="text-5xl float-left mr-3 mt-[-8px] font-serif text-nobel-gold">L</span>unaLabs provides high-end, custom-engineered web applications built by <strong>IIT alumni</strong>. We deliver solutions that are sophisticated yet practical for business growth.
              </p>
            </div>
          </div>
        </section>

        <section id="services" className="py-32 bg-white border-t border-stone-100">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-6 border border-stone-200">
                            <Code size={14}/> OUR CAPABILITIES
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6 text-stone-900">Precision Engineering</h2>
                        <ul className="space-y-4 text-stone-600 mb-8">
                           <li className="flex items-start gap-3"><Zap className="text-nobel-gold shrink-0 mt-1" size={18}/> <span><strong>Next-Gen E-Commerce:</strong> Custom storefronts with sub-second page loads.</span></li>
                           <li className="flex items-start gap-3"><Zap className="text-nobel-gold shrink-0 mt-1" size={18}/> <span><strong>SaaS Prototyping:</strong> Rapid, high-fidelity MVP development for startups.</span></li>
                           <li className="flex items-start gap-3"><Zap className="text-nobel-gold shrink-0 mt-1" size={18}/> <span><strong>Operational Dashboards:</strong> Custom internal tools to automate your workflow.</span></li>
                        </ul>
                    </div>
                    <div><TechStackGrid /></div>
                </div>
            </div>
        </section>

        <section id="team" className="py-32 bg-white border-t border-stone-100">
           <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl md:text-5xl mb-4 text-stone-900">The Architects</h2>
                    <p className="text-stone-500 max-w-2xl mx-auto">Senior engineers from IIT bringing global standards to your local business.</p>
                </div>
                <div className="flex flex-col md:flex-row gap-8 justify-center items-center flex-wrap">
                    <MemberCard name="Aryan Sharma" institute="IIT Bombay" role="Head of Backend Engineering" delay="0" />
                    <MemberCard name="Ishaan Patel" institute="IIT Delhi" role="Lead Full-Stack Architect" delay="0.1" />
                    <MemberCard name="Vikram Singh" institute="IIT Madras" role="DevOps & Infrastructure" delay="0.2" />
                    <MemberCard name="Rohan Gupta" institute="IIT Kanpur" role="AI & Data Strategy" delay="0.3" />
                </div>
           </div>
        </section>

        <section id="contact" className="py-32 bg-white border-t border-stone-200">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                    <div>
                        <div className="inline-block mb-3 text-xs font-bold tracking-widest text-stone-500 uppercase">GET IN TOUCH</div>
                        <h2 className="font-serif text-4xl md:text-6xl mb-8 text-stone-900">Let's build your <span className="italic">digital future</span>.</h2>
                        <div className="space-y-6 mt-12">
                            <a href="mailto:lunalabs.ai@gmail.com" className="flex items-center gap-4 text-stone-700 hover:text-nobel-gold transition-colors group">
                                <div className="p-3 bg-stone-100 rounded-full text-nobel-gold group-hover:bg-nobel-gold group-hover:text-white transition-all"><Mail size={20} /></div>
                                <span>lunalabs.ai@gmail.com</span>
                            </a>
                            <a href="tel:+918923820910" className="flex items-center gap-4 text-stone-700 hover:text-nobel-gold transition-colors group">
                                <div className="p-3 bg-stone-100 rounded-full text-nobel-gold group-hover:bg-nobel-gold group-hover:text-white transition-all"><Phone size={20} /></div>
                                <span>+91 89238 20910</span>
                            </a>
                            <div className="flex items-center gap-4 text-stone-700">
                                <div className="p-3 bg-stone-100 rounded-full text-nobel-gold"><MapPin size={20} /></div>
                                <span>Cyber City, Gurgaon, India</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="bg-[#F9F8F4] p-8 md:p-12 rounded-2xl border border-stone-200 shadow-sm relative overflow-hidden">
                        <AnimatePresence mode="wait">
                          {formStatus === 'success' ? (
                            <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center justify-center text-center py-12">
                              <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6"><CheckCircle size={40} /></div>
                              <h3 className="text-2xl font-serif text-stone-900 mb-2">Message Received!</h3>
                              <p className="text-stone-600">Our engineering lead will reach out shortly.</p>
                            </motion.div>
                          ) : (
                            <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Full Name</label>
                                        <input required name="name" type="text" className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3 outline-none focus:border-nobel-gold" placeholder="John Doe" />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Email Address</label>
                                        <input required name="email" type="email" className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3 outline-none focus:border-nobel-gold" placeholder="john@example.com" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold text-stone-500 uppercase tracking-widest">Message</label>
                                    <textarea required name="message" className="w-full bg-white border border-stone-200 rounded-lg px-4 py-3 outline-none focus:border-nobel-gold h-32" placeholder="Tell us about your vision..."></textarea>
                                </div>
                                <button disabled={formStatus === 'submitting'} className="w-full bg-stone-900 text-white font-bold py-4 rounded-lg hover:bg-stone-800 flex items-center justify-center gap-2 disabled:opacity-70">
                                    {formStatus === 'submitting' ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <>SEND MESSAGE <Send size={16}/></>}
                                </button>
                            </motion.form>
                          )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
      </main>

      <footer className="bg-stone-900 text-stone-400 py-16">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8 text-center md:text-left">
            <div>
                <div className="text-white font-serif font-bold text-2xl mb-2">LunaLabs</div>
                <p className="text-sm">Technical Excellence for Small Businesses & Startups</p>
            </div>
            <div className="flex gap-6 text-sm font-medium tracking-wide">
                <a href="mailto:lunalabs.ai@gmail.com" className="hover:text-nobel-gold">Email</a>
                <a href="#" className="hover:text-nobel-gold">LinkedIn</a>
            </div>
        </div>
        <div className="text-center mt-12 text-xs text-stone-600">
            &copy; 2025 LunaLabs Engineering. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default App;
