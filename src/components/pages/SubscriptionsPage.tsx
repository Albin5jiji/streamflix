import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Plus, Trash2 } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { OTTPlatforms } from '@/entities';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function SubscriptionsPage() {
  const [platforms, setPlatforms] = useState<OTTPlatforms[]>([]);
  const [subscribedPlatforms, setSubscribedPlatforms] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPlatforms();
    loadSubscriptions();
  }, []);

  const loadPlatforms = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<OTTPlatforms>('ottplatforms');
      setPlatforms(result.items);
    } catch (error) {
      console.error('Failed to load platforms:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadSubscriptions = () => {
    const saved = localStorage.getItem('subscriptions');
    if (saved) {
      setSubscribedPlatforms(new Set(JSON.parse(saved)));
    }
  };

  const saveSubscriptions = (subs: Set<string>) => {
    localStorage.setItem('subscriptions', JSON.stringify(Array.from(subs)));
  };

  const toggleSubscription = (platformId: string) => {
    const newSubs = new Set(subscribedPlatforms);
    if (newSubs.has(platformId)) {
      newSubs.delete(platformId);
    } else {
      newSubs.add(platformId);
    }
    setSubscribedPlatforms(newSubs);
    saveSubscriptions(newSubs);
  };

  const subscribedList = platforms.filter(p => subscribedPlatforms.has(p._id));
  const availableList = platforms.filter(p => !subscribedPlatforms.has(p._id));

  return (
    <div className="min-h-screen bg-background text-white">
      <Header />
      
      <div className="pt-24 pb-16">
        {/* Hero Section */}
        <section className="w-full max-w-[100rem] mx-auto px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="font-heading text-6xl md:text-7xl uppercase text-primary mb-6">
              SUBSCRIPTIONS
            </h1>
            <p className="font-paragraph text-lg text-gray-300 max-w-3xl">
              Manage all your streaming platform subscriptions in one place
            </p>
          </motion.div>
        </section>

        {/* My Subscriptions */}
        <section className="w-full max-w-[100rem] mx-auto px-8 mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-heading text-3xl uppercase text-white">
              MY SUBSCRIPTIONS
            </h2>
            <span className="font-paragraph text-sm text-gray-400">
              {subscribedList.length} active
            </span>
          </div>

          {isLoading ? null : subscribedList.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {subscribedList.map((platform, index) => (
                <motion.div
                  key={platform._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-black border border-primary p-6 hover:border-primary/60 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                      {platform.platformLogo && (
                        <Image
                          src={platform.platformLogo}
                          alt={platform.platformName || 'Platform logo'}
                          className="w-full h-full object-contain"
                          width={64}
                        />
                      )}
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleSubscription(platform._id)}
                      className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  </div>

                  <h3 className="font-heading text-xl uppercase text-primary mb-2">
                    {platform.platformName}
                  </h3>

                  {platform.subscriptionDetails && (
                    <p className="font-paragraph text-sm text-gray-400 mb-4">
                      {platform.subscriptionDetails}
                    </p>
                  )}

                  {platform.description && (
                    <p className="font-paragraph text-sm text-gray-300 mb-4 line-clamp-2">
                      {platform.description}
                    </p>
                  )}

                  {platform.websiteLink && (
                    <a
                      href={platform.websiteLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 font-paragraph text-sm text-secondary hover:text-secondary/80 transition-colors"
                    >
                      Visit Website
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="bg-black border border-primary/20 p-12 text-center">
              <h3 className="font-heading text-2xl uppercase text-gray-400 mb-4">
                NO SUBSCRIPTIONS YET
              </h3>
              <p className="font-paragraph text-gray-500 mb-6">
                Add platforms from the available list below
              </p>
            </div>
          )}
        </section>

        {/* Available Platforms */}
        {availableList.length > 0 && (
          <section className="w-full max-w-[100rem] mx-auto px-8">
            <h2 className="font-heading text-3xl uppercase text-white mb-8">
              AVAILABLE PLATFORMS
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableList.map((platform, index) => (
                <motion.div
                  key={platform._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="bg-black border border-primary/20 p-6 hover:border-primary/40 transition-colors"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center overflow-hidden">
                      {platform.platformLogo && (
                        <Image
                          src={platform.platformLogo}
                          alt={platform.platformName || 'Platform logo'}
                          className="w-full h-full object-contain"
                          width={64}
                        />
                      )}
                    </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-primary hover:text-primary hover:bg-primary/10"
                        >
                          <Plus className="h-5 w-5" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="bg-background border-primary/20">
                        <DialogHeader>
                          <DialogTitle className="font-heading text-2xl uppercase text-primary">
                            ADD SUBSCRIPTION
                          </DialogTitle>
                          <DialogDescription className="font-paragraph text-gray-400">
                            Add {platform.platformName} to your subscriptions?
                          </DialogDescription>
                        </DialogHeader>
                        <div className="space-y-4 py-4">
                          {platform.subscriptionDetails && (
                            <div>
                              <span className="font-heading text-sm uppercase text-gray-400 block mb-2">
                                SUBSCRIPTION DETAILS
                              </span>
                              <p className="font-paragraph text-white">
                                {platform.subscriptionDetails}
                              </p>
                            </div>
                          )}
                          {platform.description && (
                            <div>
                              <span className="font-heading text-sm uppercase text-gray-400 block mb-2">
                                ABOUT
                              </span>
                              <p className="font-paragraph text-white">
                                {platform.description}
                              </p>
                            </div>
                          )}
                        </div>
                        <div className="flex gap-4">
                          <Button
                            onClick={() => toggleSubscription(platform._id)}
                            className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 font-heading rounded-full"
                          >
                            ADD SUBSCRIPTION
                          </Button>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>

                  <h3 className="font-heading text-xl uppercase text-white mb-2">
                    {platform.platformName}
                  </h3>

                  {platform.subscriptionDetails && (
                    <p className="font-paragraph text-sm text-gray-400 mb-4">
                      {platform.subscriptionDetails}
                    </p>
                  )}

                  {platform.description && (
                    <p className="font-paragraph text-sm text-gray-500 line-clamp-2">
                      {platform.description}
                    </p>
                  )}
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
    </div>
  );
}
