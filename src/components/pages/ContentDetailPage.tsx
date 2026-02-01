import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Play, Tv } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { OTTContent } from '@/entities';
import { Button } from '@/components/ui/button';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function ContentDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<OTTContent | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (id) {
      loadContent();
    }
  }, [id]);

  const loadContent = async () => {
    try {
      setIsLoading(true);
      const data = await BaseCrudService.getById<OTTContent>('ottcontent', id!);
      setContent(data);
    } catch (error) {
      console.error('Failed to load content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background text-white">
      <Header />
      
      <div className="pt-24 pb-16 min-h-[600px]">
        {isLoading ? (
          <div className="flex items-center justify-center py-32">
            <LoadingSpinner />
          </div>
        ) : !content ? (
          <div className="w-full max-w-[100rem] mx-auto px-8 py-32 text-center">
            <h2 className="font-heading text-4xl uppercase text-primary mb-4">
              CONTENT NOT FOUND
            </h2>
            <p className="font-paragraph text-gray-400 mb-8">
              The content you are looking for does not exist
            </p>
            <Button
              onClick={() => navigate('/browse')}
              className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading px-8 py-6 rounded-full"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              BACK TO BROWSE
            </Button>
          </div>
        ) : (
          <>
            {/* Hero Section */}
            <section className="w-full max-w-[100rem] mx-auto px-8 py-12">
              <Button
                onClick={() => navigate('/browse')}
                variant="ghost"
                className="text-gray-400 hover:text-primary mb-8"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Browse
              </Button>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                {/* Poster */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  className="flex justify-center lg:justify-start"
                >
                  <div className="relative w-full max-w-md aspect-[2/3] bg-black border border-primary/20 overflow-hidden">
                    {content.posterImage && (
                      <Image
                        src={content.posterImage}
                        alt={content.title || 'Content poster'}
                        className="w-full h-full object-cover"
                        width={500}
                      />
                    )}
                  </div>
                </motion.div>

                {/* Details */}
                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="space-y-6"
                >
                  <div>
                    <h1 className="font-heading text-5xl md:text-6xl uppercase text-primary mb-4 leading-tight">
                      {content.title}
                    </h1>
                    
                    <div className="flex flex-wrap gap-4 mb-6">
                      {content.contentType && (
                        <span className="bg-secondary px-4 py-2 font-heading text-sm uppercase text-secondary-foreground">
                          {content.contentType}
                        </span>
                      )}
                      {content.genre && (
                        <span className="border border-primary px-4 py-2 font-heading text-sm uppercase text-primary">
                          {content.genre}
                        </span>
                      )}
                    </div>
                  </div>

                  {content.description && (
                    <div>
                      <h2 className="font-heading text-xl uppercase text-white mb-3">
                        OVERVIEW
                      </h2>
                      <p className="font-paragraph text-base text-gray-300 leading-relaxed">
                        {content.description}
                      </p>
                    </div>
                  )}

                  {content.streamingPlatform && (
                    <div>
                      <h2 className="font-heading text-xl uppercase text-white mb-3">
                        AVAILABLE ON
                      </h2>
                      <div className="flex items-center gap-3">
                        <div className="bg-primary w-12 h-12 rounded-full flex items-center justify-center">
                          <Tv className="h-6 w-6 text-primary-foreground" />
                        </div>
                        <span className="font-heading text-2xl uppercase text-primary">
                          {content.streamingPlatform}
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="pt-6">
                    <Button
                      size="lg"
                      className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-lg px-10 py-7 rounded-full"
                    >
                      <Play className="mr-2 h-5 w-5" />
                      WATCH NOW
                    </Button>
                  </div>
                </motion.div>
              </div>
            </section>

            {/* Additional Info Section */}
            <section className="w-full max-w-[100rem] mx-auto px-8 py-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-black border border-primary/20 p-8"
              >
                <h2 className="font-heading text-2xl uppercase text-primary mb-6">
                  DETAILS
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {content.contentType && (
                    <div>
                      <span className="font-heading text-sm uppercase text-gray-400 block mb-2">
                        TYPE
                      </span>
                      <span className="font-paragraph text-base text-white">
                        {content.contentType}
                      </span>
                    </div>
                  )}
                  {content.genre && (
                    <div>
                      <span className="font-heading text-sm uppercase text-gray-400 block mb-2">
                        GENRE
                      </span>
                      <span className="font-paragraph text-base text-white">
                        {content.genre}
                      </span>
                    </div>
                  )}
                  {content.streamingPlatform && (
                    <div>
                      <span className="font-heading text-sm uppercase text-gray-400 block mb-2">
                        PLATFORM
                      </span>
                      <span className="font-paragraph text-base text-white">
                        {content.streamingPlatform}
                      </span>
                    </div>
                  )}
                </div>
              </motion.div>
            </section>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
