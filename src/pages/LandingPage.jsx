import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Moon, BarChart3, ChevronRight, MapPin, Clock } from 'lucide-react';

const LandingPage = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" }
  };

  return (
    <div className="min-h-screen bg-[#020d08] text-emerald-50 selection:bg-emerald-500/30 selection:text-white font-sans overflow-x-hidden">
      
      {/* Background Elements */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-emerald-950/20 via-black to-black" />
        {/* Subtle Geometric Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/islamic-art.png')]" />
        {/* Cinematic Glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[10%] right-[-5%] w-[400px] h-[400px] bg-gold-600/5 rounded-full blur-[100px]" />
      </div>

      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 px-6 py-4">
        <motion.div 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="max-w-7xl mx-auto flex justify-between items-center backdrop-blur-md bg-white/5 border border-white/10 px-8 py-3 rounded-full"
        >
          <div className="text-xl font-semibold tracking-widest text-emerald-400">نور | NOOR</div>
          <div className="hidden md:flex gap-8 text-sm uppercase tracking-widest opacity-70">
            <a href="#story" className="hover:text-emerald-400 transition-colors">Legacy</a>
            <a href="#features" className="hover:text-emerald-400 transition-colors">Features</a>
          </div>
          <button className="text-sm border border-emerald-500/30 px-5 py-2 rounded-full hover:bg-emerald-500/10 transition-all">
            Login
          </button>
        </motion.div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6 min-h-screen flex flex-col items-center justify-center text-center">
        <motion.div {...fadeIn} className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-emerald-50 to-emerald-400">
            Guard Your Salah.<br />Preserve Your Discipline.
          </h1>
          <p className="text-2xl md:text-3xl mb-8 font-arabic text-emerald-500/80 leading-loose">
            إِنَّ الصَّلَاةَ كَانَتْ عَلَى الْمُؤْمِنِينَ كِتَابًا مَّوْقُوتًا
          </p>
          <p className="max-w-xl mx-auto text-emerald-100/60 leading-relaxed mb-10">
            A digital sanctuary designed to refine your character through consistent devotion. 
            Track your progress, honor your time, and elevate your Deen.
          </p>
          <motion.button 
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            className="group relative px-10 py-4 bg-emerald-600 text-white rounded-full font-medium overflow-hidden transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Enter the Madrasa <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.button>
        </motion.div>

        {/* Floating Silhouette */}
        <div className="absolute bottom-0 w-full flex justify-center opacity-10 pointer-events-none">
          <svg width="800" height="200" viewBox="0 0 800 200" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M400 0L440 80H360L400 0Z" fill="currentColor" />
            <rect x="380" y="80" width="40" height="120" fill="currentColor" />
            <path d="M200 100L220 140H180L200 100Z" fill="currentColor" />
            <rect x="190" y="140" width="20" height="60" fill="currentColor" />
            <path d="M600 100L620 140H580L600 100Z" fill="currentColor" />
            <rect x="590" y="140" width="20" height="60" fill="currentColor" />
          </svg>
        </div>
      </section>

      {/* Story Section */}
      <section id="story" className="relative py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center gap-16">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex-1"
            >
              <h2 className="text-3xl font-bold mb-6 border-l-4 border-emerald-500 pl-6">Why We Built This</h2>
              <p className="text-lg text-emerald-100/70 leading-relaxed mb-6">
                Discipline is the bridge between intention and accomplishment. In the modern world, 
                our spiritual focus is constantly challenged. We created this space to serve as a 
                digital Tasbih—a tool for accountability and a mirror for your soul's journey.
              </p>
            </motion.div>
            
            <div className="flex-1 grid grid-cols-1 gap-6 w-full">
              {[
                { icon: <Clock className="text-emerald-400" />, title: "Daily Attendance Tracking", desc: "Clock into your growth with seamless check-ins." },
                { icon: <Moon className="text-emerald-400" />, title: "Spiritual Monitoring", desc: "Beyond Salah: track Taraweeh, Nawafil, and Fasting." },
                { icon: <BarChart3 className="text-emerald-400" />, title: "Spiritual Analytics", desc: "Visualize your consistency with monthly data-driven insights." }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-6 bg-white/5 border border-white/10 rounded-2xl hover:bg-white/10 transition-all flex items-start gap-4"
                >
                  <div className="p-3 bg-emerald-500/10 rounded-lg">{feature.icon}</div>
                  <div>
                    <h3 className="font-semibold mb-1">{feature.title}</h3>
                    <p className="text-sm text-emerald-100/50">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className="py-32 px-6 bg-emerald-950/20">
        <div className="max-w-7xl mx-auto text-center mb-20">
          <h2 className="text-4xl font-bold">The Pillars of Noor</h2>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <motion.div 
              key={item}
              whileHover={{ y: -10 }}
              className="relative p-8 rounded-3xl bg-gradient-to-br from-white/5 to-transparent border border-white/10 backdrop-blur-sm group"
            >
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-30 transition-opacity">
                <div className="w-12 h-12 border-2 border-emerald-500 rounded-full flex items-center justify-center text-[10px]">١٤٤٧</div>
              </div>
              <BookOpen className="text-emerald-500 mb-6" />
              <h4 className="text-xl font-semibold mb-4 text-emerald-50">Feature Protocol 0{item}</h4>
              <p className="text-emerald-100/50 text-sm leading-relaxed">
                Experience a streamlined interface designed for maximum focus and minimum distraction.
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-40 px-6 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-5xl font-bold mb-8">Every Salah Counts.</h2>
          <button className="px-12 py-5 bg-white text-emerald-950 rounded-full font-bold hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all">
            Start Tracking Today
          </button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-white/10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-sm opacity-40">© 2026 NOOR ATTENDANCE SYSTEM</div>
          <div className="text-xl font-arabic text-emerald-600/50">وَاعْبُدْ رَبَّكَ حَتَّىٰ يَأْتِيَكَ الْيَقِينُ</div>
          <div className="flex gap-6 opacity-40 text-sm">
            <span>Privacy</span>
            <span>Terms</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;