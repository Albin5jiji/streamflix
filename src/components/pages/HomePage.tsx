// HPI 1.7-V
import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { Play, Search, Tv, ArrowRight, CheckCircle2, Globe, Zap, Layers, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax transforms for Hero
  const heroTextY = useTransform(scrollYProgress, [0, 0.2], [0, 100]);
  const heroTextYReverse = useTransform(scrollYProgress, [0, 0.2], [0, -100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-white overflow-clip selection:bg-primary selection:text-primary-foreground font-paragraph">
      <Header />

      {/* ---------------------------------------------------------------------------
         HERO SECTION - Replicating the "TWILIGHTX / 2035" Layout
         Structure: Full bleed, massive typography, asymmetrical placement.
         Motion: Parallax scroll, entrance animations.
      --------------------------------------------------------------------------- */}
      <section className="relative w-full h-screen min-h-[800px] flex flex-col justify-between overflow-clip pt-20 pb-8 px-4 md:px-8 lg:px-12">
        
        {/* Background Elements (Subtle Smoke/Noise) */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none">
           <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,_rgba(138,255,0,0.1),transparent_70%)]" />
           <div className="absolute bottom-0 right-0 w-3/4 h-3/4 bg-[radial-gradient(circle_at_80%_80%,_rgba(155,127,255,0.15),transparent_60%)]" />
        </div>

        {/* Top Left: Massive Primary Text */}
        <motion.div 
          style={{ y: heroTextY }}
          className="relative z-10 w-full max-w-[120rem] mx-auto"
        >
          <motion.h1 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-[18vw] leading-[0.8] uppercase text-primary tracking-tighter mix-blend-difference"
          >
            STREAM
          </motion.h1>
        </motion.div>

        {/* Middle Content Layer - Floating */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <div className="w-full max-w-[100rem] px-4 flex flex-col md:flex-row items-center justify-between gap-12">
            
            {/* Left Side Details (Date/Info equivalent) */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              className="pointer-events-auto md:mt-32"
            >
              <div className="flex flex-col gap-2 mb-8">
                <span className="font-heading text-xl md:text-2xl text-white uppercase tracking-widest">
                  The Ultimate Aggregator
                </span>
                <span className="font-paragraph text-gray-400 text-sm md:text-base max-w-xs">
                  Netflix • Prime Video • Hotstar • Sony LIV • Zee5
                </span>
              </div>
              <Link to="/browse">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-lg px-10 py-8 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(138,255,0,0.4)]">
                  <Play className="mr-2 h-6 w-6 fill-current" />
                  START WATCHING
                </Button>
              </Link>
              
              {/* Social/Platform Icons Row */}
              <div className="flex gap-4 mt-8 text-primary">
                 {[1,2,3,4,5].map((i) => (
                   <div key={i} className="w-3 h-3 rounded-full bg-primary/20 border border-primary" />
                 ))}
              </div>
            </motion.div>

            {/* Right Side Abstract Visual */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="hidden md:block pointer-events-auto"
            >
               <div className="relative w-64 h-64 md:w-96 md:h-96 rounded-full border border-secondary/30 flex items-center justify-center animate-[spin_20s_linear_infinite]">
                  <div className="absolute inset-0 rounded-full border border-dashed border-primary/20 scale-75" />
                  <div className="absolute inset-0 rounded-full border border-dotted border-white/10 scale-125" />
                  <div className="w-full h-full rounded-full bg-gradient-to-br from-secondary/10 to-transparent backdrop-blur-sm" />
               </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Right: Massive Secondary Text */}
        <motion.div 
          style={{ y: heroTextYReverse }}
          className="relative z-10 w-full max-w-[120rem] mx-auto text-right"
        >
          <motion.h2 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="font-heading text-[18vw] leading-[0.8] uppercase text-transparent bg-clip-text bg-gradient-to-b from-secondary to-white/50 tracking-tighter"
          >
            UNIVERSE
          </motion.h2>
        </motion.div>
      </section>


      {/* ---------------------------------------------------------------------------
         MARQUEE SECTION - Infinite Scroll
         Motion: Continuous loop
      --------------------------------------------------------------------------- */}
      <section className="w-full bg-primary py-4 overflow-clip border-y border-black">
        <div className="flex whitespace-nowrap">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
            className="flex gap-12 items-center"
          >
            {[...Array(2)].map((_, i) => (
              <React.Fragment key={i}>
                <span className="text-4xl md:text-6xl font-heading text-black font-bold uppercase">NETFLIX</span>
                <span className="text-4xl md:text-6xl font-heading text-black/50 font-bold uppercase">•</span>
                <span className="text-4xl md:text-6xl font-heading text-black font-bold uppercase">PRIME VIDEO</span>
                <span className="text-4xl md:text-6xl font-heading text-black/50 font-bold uppercase">•</span>
                <span className="text-4xl md:text-6xl font-heading text-black font-bold uppercase">DISNEY+ HOTSTAR</span>
                <span className="text-4xl md:text-6xl font-heading text-black/50 font-bold uppercase">•</span>
                <span className="text-4xl md:text-6xl font-heading text-black font-bold uppercase">SONY LIV</span>
                <span className="text-4xl md:text-6xl font-heading text-black/50 font-bold uppercase">•</span>
                <span className="text-4xl md:text-6xl font-heading text-black font-bold uppercase">ZEE5</span>
                <span className="text-4xl md:text-6xl font-heading text-black/50 font-bold uppercase">•</span>
                <span className="text-4xl md:text-6xl font-heading text-black font-bold uppercase">APPLE TV+</span>
                <span className="text-4xl md:text-6xl font-heading text-black/50 font-bold uppercase">•</span>
              </React.Fragment>
            ))}
          </motion.div>
        </div>
      </section>


      {/* ---------------------------------------------------------------------------
         STICKY SCROLL NARRATIVE - "The Problem vs The Solution"
         Layout: Left side sticky text, Right side scrolling cards
      --------------------------------------------------------------------------- */}
      <section className="relative w-full max-w-[120rem] mx-auto px-4 md:px-8 py-32">
        <div className="flex flex-col lg:flex-row gap-16">
          
          {/* Sticky Header */}
          <div className="lg:w-1/3">
            <div className="sticky top-32 space-y-8">
              <div className="w-12 h-1 bg-primary mb-8" />
              <h2 className="font-heading text-5xl md:text-7xl uppercase leading-none">
                Why <span className="text-secondary">Switch</span><br />
                Between <span className="text-gray-500">Apps?</span>
              </h2>
              <p className="font-paragraph text-xl text-gray-400 max-w-md">
                Stop the endless scrolling and app-hopping. We've built the command center for your digital entertainment life.
              </p>
              <Link to="/browse">
                <Button variant="outline" className="border-white/20 text-white hover:bg-white hover:text-black rounded-full px-8 py-6 font-heading text-lg mt-4">
                  EXPLORE FEATURES
                </Button>
              </Link>
            </div>
          </div>

          {/* Scrolling Cards */}
          <div className="lg:w-2/3 space-y-24 pt-12 lg:pt-0">
            
            {/* Card 1: Unified Search */}
            <FeatureCard 
              number="01"
              title="Unified Search"
              description="One search bar for the entire streaming universe. Find any movie or show instantly, no matter where it lives."
              icon={Search}
              imageSrc="https://static.wixstatic.com/media/ced712_e0d896549ea4411eab6cdbaeda064f33~mv2.png?originWidth=640&originHeight=448"
              color="primary"
            />

            {/* Card 2: Smart Filters */}
            <FeatureCard 
              number="02"
              title="Smart Filtering"
              description="Filter by genre, rating, year, and language across all platforms simultaneously. Your perfect watchlist, curated automatically."
              icon={Layers}
              imageSrc="https://static.wixstatic.com/media/ced712_3d99b6e61a1542b3945433073722a488~mv2.png?originWidth=640&originHeight=448"
              color="secondary"
            />

            {/* Card 3: Subscription Manager */}
            <FeatureCard 
              number="03"
              title="Sub Manager"
              description="Track your spending, renewal dates, and active plans. Never pay for a forgotten subscription again."
              icon={CreditCard}
              imageSrc="https://static.wixstatic.com/media/ced712_92fd2336523d408f898ff4257283c96a~mv2.png?originWidth=640&originHeight=448"
              color="primary"
            />

          </div>
        </div>
      </section>


      {/* ---------------------------------------------------------------------------
         VISUAL BREATHER - Full Bleed Image
         Layout: Parallax background
      --------------------------------------------------------------------------- */}
      <section className="relative w-full h-[80vh] overflow-clip flex items-center justify-center">
        <div className="absolute inset-0 z-0">
           <Image 
             src="https://static.wixstatic.com/media/ced712_567db82f8abd413196ea1ecd0e4c55db~mv2.png?originWidth=1920&originHeight=1280" 
             alt="Cinematic Experience" 
             className="w-full h-full object-cover opacity-40 grayscale hover:grayscale-0 transition-all duration-1000 scale-105"
           />
           <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
        </div>
        
        <div className="relative z-10 text-center max-w-4xl px-4">
          <h3 className="font-heading text-6xl md:text-8xl uppercase text-white mb-6 mix-blend-overlay">
            Cinematic Immersion
          </h3>
          <p className="font-paragraph text-xl md:text-2xl text-gray-300">
            Experience content the way it was meant to be seen.
          </p>
        </div>
      </section>


      {/* ---------------------------------------------------------------------------
         SUBSCRIPTION MANAGER PREVIEW
         Layout: Split screen with graphic
      --------------------------------------------------------------------------- */}
      <section className="w-full max-w-[120rem] mx-auto px-4 md:px-8 py-32">
        <div className="bg-secondary/5 rounded-[3rem] border border-secondary/20 overflow-clip">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            
            <div className="p-12 md:p-20 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 text-secondary mb-6">
                <Zap className="w-5 h-5" />
                <span className="font-heading uppercase tracking-widest">Control Your Costs</span>
              </div>
              <h2 className="font-heading text-5xl md:text-6xl uppercase mb-8">
                Total Control Over <br/>
                <span className="text-secondary">Your Subscriptions</span>
              </h2>
              <ul className="space-y-6 mb-12">
                {[
                  "Track monthly spending in real-time",
                  "Get alerts before renewals",
                  "Identify unused subscriptions",
                  "One-click cancellation assistance"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4">
                    <CheckCircle2 className="w-6 h-6 text-primary shrink-0" />
                    <span className="font-paragraph text-lg text-gray-300">{item}</span>
                  </li>
                ))}
              </ul>
              <Link to="/subscriptions">
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-heading text-lg px-10 py-8 rounded-full w-fit">
                  MANAGE MY SUBSCRIPTIONS
                </Button>
              </Link>
            </div>

            <div className="relative min-h-[500px] bg-gradient-to-br from-secondary/20 to-black p-12 flex items-center justify-center">
               {/* Abstract Dashboard UI Representation */}
               <div className="relative w-full max-w-md aspect-[3/4] bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500">
                  <div className="flex justify-between items-center mb-8">
                    <div className="w-1/2 h-4 bg-white/20 rounded-full" />
                    <div className="w-8 h-8 rounded-full bg-secondary" />
                  </div>
                  <div className="space-y-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5">
                        <div className={`w-10 h-10 rounded-lg ${i % 2 === 0 ? 'bg-primary/20' : 'bg-secondary/20'}`} />
                        <div className="flex-1">
                          <div className="w-24 h-3 bg-white/20 rounded-full mb-2" />
                          <div className="w-16 h-2 bg-white/10 rounded-full" />
                        </div>
                        <div className="w-12 h-6 bg-white/10 rounded-full" />
                      </div>
                    ))}
                  </div>
                  
                  {/* Floating Elements */}
                  <div className="absolute -right-12 top-1/4 bg-primary text-black font-heading p-4 rounded-xl shadow-lg transform rotate-12">
                    $14.99/mo
                  </div>
                  <div className="absolute -left-8 bottom-1/4 bg-white text-black font-heading p-4 rounded-xl shadow-lg transform -rotate-6">
                    Renewing Soon
                  </div>
               </div>
            </div>

          </div>
        </div>
      </section>


      {/* ---------------------------------------------------------------------------
         FINAL CTA SECTION
         Layout: Centered, high impact
      --------------------------------------------------------------------------- */}
      <section className="w-full py-32 px-4 text-center relative overflow-clip">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-primary/5 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="font-heading text-6xl md:text-9xl uppercase text-white mb-8 leading-[0.9]">
            Ready to <br/>
            <span className="text-primary">Stream?</span>
          </h2>
          <p className="font-paragraph text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto">
            Join thousands of users who have simplified their entertainment life. One platform, infinite possibilities.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link to="/browse">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-xl px-16 py-8 rounded-full h-auto">
                START BROWSING
              </Button>
            </Link>
            <Link to="/subscriptions">
              <Button variant="ghost" className="text-white hover:text-primary font-heading text-xl px-8 py-8 rounded-full h-auto group">
                MANAGE SUBSCRIPTIONS <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ---------------------------------------------------------------------------
// SUB-COMPONENTS
// ---------------------------------------------------------------------------

function FeatureCard({ number, title, description, icon: Icon, imageSrc, color }: { 
  number: string, 
  title: string, 
  description: string, 
  icon: any, 
  imageSrc: string,
  color: 'primary' | 'secondary'
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div 
      ref={ref}
      className={`group relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center transition-all duration-700 ${isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}
    >
      {/* Text Side */}
      <div className="order-2 md:order-1 space-y-6">
        <div className={`font-heading text-8xl opacity-10 ${color === 'primary' ? 'text-primary' : 'text-secondary'}`}>
          {number}
        </div>
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${color === 'primary' ? 'bg-primary/10 text-primary' : 'bg-secondary/10 text-secondary'}`}>
            <Icon className="w-8 h-8" />
          </div>
          <h3 className="font-heading text-4xl uppercase">{title}</h3>
        </div>
        <p className="font-paragraph text-lg text-gray-400 leading-relaxed border-l-2 border-white/10 pl-6">
          {description}
        </p>
      </div>

      {/* Image Side */}
      <div className="order-1 md:order-2 relative aspect-square md:aspect-[4/3] overflow-clip rounded-2xl border border-white/10 group-hover:border-white/30 transition-colors">
        <div className={`absolute inset-0 opacity-20 mix-blend-color ${color === 'primary' ? 'bg-primary' : 'bg-secondary'}`} />
        <Image 
          src={imageSrc} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
        />
        
        {/* Decorative Corner */}
        <div className={`absolute bottom-0 right-0 w-16 h-16 border-t border-l ${color === 'primary' ? 'border-primary bg-primary/10' : 'border-secondary bg-secondary/10'} rounded-tl-3xl`} />
      </div>
    </div>
  );
}