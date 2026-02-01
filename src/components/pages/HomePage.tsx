import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Layers, CreditCard } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { BaseCrudService } from '@/integrations';
import { OTTContent } from '@/entities';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [topGrossingContent, setTopGrossingContent] = useState<OTTContent[]>([]);
  const [isLoadingContent, setIsLoadingContent] = useState(true);

  useEffect(() => {
    loadTopGrossingContent();
  }, []);

  const loadTopGrossingContent = async () => {
    try {
      setIsLoadingContent(true);
      const result = await BaseCrudService.getAll<OTTContent>('ottcontent', [], { limit: 100 });
      const topGrossing = result.items
        .filter((item: OTTContent) => item.isTopGrossing)
        .sort((a: OTTContent, b: OTTContent) => {
          const aRating = (a.imdbRating || 0) + (a.rottenTomatoesRating || 0) / 100;
          const bRating = (b.imdbRating || 0) + (b.rottenTomatoesRating || 0) / 100;
          return bRating - aRating;
        })
        .slice(0, 12);
      setTopGrossingContent(topGrossing);
    } catch (error) {
      console.error('Failed to load top-grossing content:', error);
    } finally {
      setIsLoadingContent(false);
    }
  };

  // ... keep existing code (loadTopGrossingContent function)

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-white overflow-clip selection:bg-primary selection:text-primary-foreground font-paragraph">
      <Header />

      {/* ---------------------------------------------------------------------------
         HERO SECTION - Minimalistic
         Structure: Clean, centered, essential content only.
      --------------------------------------------------------------------------- */}
      <section className="relative w-full min-h-[600px] flex flex-col items-center justify-center pt-32 pb-16 px-4 md:px-8">
        <div className="w-full max-w-[100rem] mx-auto text-center space-y-8">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-heading text-6xl md:text-8xl uppercase text-primary tracking-tight"
          >
            StreamHub
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-paragraph text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto"
          >
            Find any movie or show across all streaming platforms in one place.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col md:flex-row gap-4 justify-center items-center pt-4"
          >
            <Link to="/browse">
              <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-lg px-10 py-6 rounded-lg">
                BROWSE CONTENT
              </Button>
            </Link>
            <Link to="/subscriptions">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 font-heading text-lg px-10 py-6 rounded-lg">
                MANAGE SUBSCRIPTIONS
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>





      {/* ---------------------------------------------------------------------------
         TOP GROSSING CONTENT SECTION - Minimalistic Grid
         Layout: Simple grid of top-grossing movies/shows
      --------------------------------------------------------------------------- */}
      <section className="relative w-full max-w-[100rem] mx-auto px-4 md:px-8 py-20">
        <div className="space-y-8 mb-12">
          <h2 className="font-heading text-4xl md:text-5xl uppercase">
            Top Grossing
          </h2>
          <p className="font-paragraph text-lg text-gray-400 max-w-2xl">
            Discover the most-watched and highest-rated content across all platforms.
          </p>
        </div>

        {/* Content Grid */}
        {isLoadingContent ? (
          <div className="flex items-center justify-center py-24">
            <div className="text-center">
              <div className="inline-block animate-spin">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full" />
              </div>
            </div>
          </div>
        ) : topGrossingContent.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {topGrossingContent.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Link to={`/content/${item._id}`}>
                  <div className="group cursor-pointer">
                    <div className="relative aspect-[2/3] overflow-hidden bg-black border border-white/10 mb-3 rounded-lg">
                      {item.posterImage && (
                        <Image
                          src={item.posterImage}
                          alt={item.title || 'Content poster'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          width={300}
                        />
                      )}
                    </div>
                    <h3 className="font-heading text-sm uppercase text-white group-hover:text-primary transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="text-center">
              <h3 className="font-heading text-2xl uppercase text-primary mb-4">
                NO CONTENT YET
              </h3>
              <p className="font-paragraph text-gray-400">
                Check back soon for the latest content
              </p>
            </div>
          </div>
        )}
      </section>


      {/* ---------------------------------------------------------------------------
         FEATURES SECTION - Minimalistic
         Layout: Simple list of features
      --------------------------------------------------------------------------- */}
      <section className="relative w-full max-w-[100rem] mx-auto px-4 md:px-8 py-20">
        <div className="space-y-8 mb-12">
          <h2 className="font-heading text-4xl md:text-5xl uppercase">
            Why Use StreamHub
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <Search className="w-8 h-8 text-primary" />
            <h3 className="font-heading text-xl uppercase">Unified Search</h3>
            <p className="font-paragraph text-gray-400">
              Find any movie or show instantly across all streaming platforms.
            </p>
          </div>

          <div className="space-y-4">
            <Layers className="w-8 h-8 text-primary" />
            <h3 className="font-heading text-xl uppercase">Smart Filtering</h3>
            <p className="font-paragraph text-gray-400">
              Filter by genre, rating, and platform to find exactly what you want.
            </p>
          </div>

          <div className="space-y-4">
            <CreditCard className="w-8 h-8 text-primary" />
            <h3 className="font-heading text-xl uppercase">Manage Subscriptions</h3>
            <p className="font-paragraph text-gray-400">
              Track your spending and manage all your streaming subscriptions.
            </p>
          </div>
        </div>
      </section>





      {/* ---------------------------------------------------------------------------
         SUBSCRIPTION MANAGER SECTION - Minimalistic
         Layout: Simple text and CTA
      --------------------------------------------------------------------------- */}
      <section className="w-full max-w-[100rem] mx-auto px-4 md:px-8 py-20">
        <div className="space-y-8">
          <h2 className="font-heading text-4xl md:text-5xl uppercase">
            Manage Your Subscriptions
          </h2>
          <p className="font-paragraph text-lg text-gray-400 max-w-2xl">
            Track your spending, renewal dates, and active plans. Never pay for a forgotten subscription again.
          </p>
          <Link to="/subscriptions">
            <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-heading text-lg px-10 py-6 rounded-lg">
              MANAGE SUBSCRIPTIONS
            </Button>
          </Link>
        </div>
      </section>


      {/* ---------------------------------------------------------------------------
         FINAL CTA SECTION - Minimalistic
         Layout: Centered, simple
      --------------------------------------------------------------------------- */}
      <section className="w-full py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-8">
          <h2 className="font-heading text-5xl md:text-6xl uppercase">
            Ready to Get Started?
          </h2>
          <p className="font-paragraph text-lg text-gray-400">
            Start browsing content across all streaming platforms today.
          </p>
          <Link to="/browse">
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-lg px-10 py-6 rounded-lg">
              BROWSE NOW
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
