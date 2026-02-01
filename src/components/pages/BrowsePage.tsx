import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Filter, X } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { OTTContent } from '@/entities';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Image } from '@/components/ui/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function BrowsePage() {
  const navigate = useNavigate();
  const [content, setContent] = useState<OTTContent[]>([]);
  const [filteredContent, setFilteredContent] = useState<OTTContent[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedType, setSelectedType] = useState<string>('all');
  const [hasNext, setHasNext] = useState(false);
  const [skip, setSkip] = useState(0);
  const LIMIT = 50;

  useEffect(() => {
    loadContent();
  }, [skip]);

  useEffect(() => {
    applyFilters();
  }, [content, searchQuery, selectedPlatform, selectedGenre, selectedType]);

  const loadContent = async () => {
    try {
      setIsLoading(true);
      const result = await BaseCrudService.getAll<OTTContent>('ottcontent', [], { limit: LIMIT, skip });
      
      if (skip === 0) {
        setContent(result.items);
      } else {
        setContent(prev => [...prev, ...result.items]);
      }
      
      setHasNext(result.hasNext);
    } catch (error) {
      console.error('Failed to load content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...content];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        item =>
          item.title?.toLowerCase().includes(query) ||
          item.description?.toLowerCase().includes(query)
      );
    }

    if (selectedPlatform !== 'all') {
      filtered = filtered.filter(item => item.streamingPlatform === selectedPlatform);
    }

    if (selectedGenre !== 'all') {
      filtered = filtered.filter(item => item.genre === selectedGenre);
    }

    if (selectedType !== 'all') {
      filtered = filtered.filter(item => item.contentType === selectedType);
    }

    setFilteredContent(filtered);
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedPlatform('all');
    setSelectedGenre('all');
    setSelectedType('all');
  };

  const platforms = Array.from(new Set(content.map(item => item.streamingPlatform).filter(Boolean)));
  const genres = Array.from(new Set(content.map(item => item.genre).filter(Boolean)));
  const types = Array.from(new Set(content.map(item => item.contentType).filter(Boolean)));

  const handleLoadMore = () => {
    setSkip(prev => prev + LIMIT);
  };

  const handleContentClick = (id: string) => {
    navigate(`/content/${id}`);
  };

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
              BROWSE CONTENT
            </h1>
            <p className="font-paragraph text-lg text-gray-300 max-w-3xl">
              Explore thousands of movies and TV shows from all major streaming platforms
            </p>
          </motion.div>
        </section>

        {/* Filters Section */}
        <section className="w-full max-w-[100rem] mx-auto px-8 mb-12">
          <div className="bg-black border border-primary/20 p-6">
            <div className="flex items-center gap-4 mb-6">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="font-heading text-xl uppercase text-white">FILTERS</h2>
              {(searchQuery || selectedPlatform !== 'all' || selectedGenre !== 'all' || selectedType !== 'all') && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={clearFilters}
                  className="ml-auto text-gray-400 hover:text-primary"
                >
                  <X className="h-4 w-4 mr-2" />
                  Clear All
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search titles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-background border-primary/30 text-white placeholder:text-gray-500 focus:border-primary"
                />
              </div>

              {/* Platform Filter */}
              <Select value={selectedPlatform} onValueChange={setSelectedPlatform}>
                <SelectTrigger className="bg-background border-primary/30 text-white">
                  <SelectValue placeholder="All Platforms" />
                </SelectTrigger>
                <SelectContent className="bg-background border-primary/30">
                  <SelectItem value="all">All Platforms</SelectItem>
                  {platforms.map(platform => (
                    <SelectItem key={platform} value={platform!}>
                      {platform}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Genre Filter */}
              <Select value={selectedGenre} onValueChange={setSelectedGenre}>
                <SelectTrigger className="bg-background border-primary/30 text-white">
                  <SelectValue placeholder="All Genres" />
                </SelectTrigger>
                <SelectContent className="bg-background border-primary/30">
                  <SelectItem value="all">All Genres</SelectItem>
                  {genres.map(genre => (
                    <SelectItem key={genre} value={genre!}>
                      {genre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Type Filter */}
              <Select value={selectedType} onValueChange={setSelectedType}>
                <SelectTrigger className="bg-background border-primary/30 text-white">
                  <SelectValue placeholder="All Types" />
                </SelectTrigger>
                <SelectContent className="bg-background border-primary/30">
                  <SelectItem value="all">All Types</SelectItem>
                  {types.map(type => (
                    <SelectItem key={type} value={type!}>
                      {type}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="mt-4 font-paragraph text-sm text-gray-400">
              Showing {filteredContent.length} of {content.length} results
            </div>
          </div>
        </section>

        {/* Content Grid */}
        <section className="w-full max-w-[100rem] mx-auto px-8 min-h-[600px]">
          {isLoading && skip === 0 ? null : filteredContent.length > 0 ? (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {filteredContent.map((item, index) => (
                  <motion.div
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.05 }}
                    onClick={() => handleContentClick(item._id)}
                    className="group cursor-pointer"
                  >
                    <div className="relative aspect-[2/3] overflow-hidden bg-black border border-primary/20 mb-3">
                      {item.posterImage && (
                        <Image
                          src={item.posterImage}
                          alt={item.title || 'Content poster'}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          width={300}
                        />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <h3 className="font-heading text-sm uppercase text-white group-hover:text-primary transition-colors line-clamp-2 mb-1">
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-2 text-xs">
                      {item.contentType && (
                        <span className="font-paragraph text-gray-400">{item.contentType}</span>
                      )}
                      {item.streamingPlatform && (
                        <>
                          <span className="text-primary">•</span>
                          <span className="font-paragraph text-primary">{item.streamingPlatform}</span>
                        </>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {hasNext && (
                <div className="flex justify-center mt-12">
                  <Button
                    onClick={handleLoadMore}
                    disabled={isLoading}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 font-heading text-lg px-8 py-6 rounded-full"
                  >
                    {isLoading ? 'LOADING...' : 'LOAD MORE'}
                  </Button>
                </div>
              )}
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-24">
              <div className="text-center">
                <h3 className="font-heading text-3xl uppercase text-primary mb-4">
                  NO RESULTS FOUND
                </h3>
                <p className="font-paragraph text-gray-400 mb-8">
                  Try adjusting your filters or search query
                </p>
                <Button
                  onClick={clearFilters}
                  className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-heading px-8 py-6 rounded-full"
                >
                  CLEAR FILTERS
                </Button>
              </div>
            </div>
          )}
        </section>
      </div>

      <Footer />
    </div>
  );
}
