import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Youtube } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-primary/20">
      <div className="w-full max-w-[100rem] mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-heading text-2xl uppercase text-primary">
              STREAMHUB
            </h3>
            <p className="font-paragraph text-sm text-gray-400">
              Your unified platform for discovering content across all major streaming services.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg uppercase text-white">
              QUICK LINKS
            </h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="font-paragraph text-sm text-gray-400 hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/browse" className="font-paragraph text-sm text-gray-400 hover:text-primary transition-colors">
                Browse Content
              </Link>
              <Link to="/subscriptions" className="font-paragraph text-sm text-gray-400 hover:text-primary transition-colors">
                Subscriptions
              </Link>
            </nav>
          </div>

          {/* Platforms */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg uppercase text-white">
              PLATFORMS
            </h4>
            <div className="flex flex-col gap-2">
              <span className="font-paragraph text-sm text-gray-400">Netflix</span>
              <span className="font-paragraph text-sm text-gray-400">Prime Video</span>
              <span className="font-paragraph text-sm text-gray-400">Disney+ Hotstar</span>
              <span className="font-paragraph text-sm text-gray-400">Sony LIV</span>
              <span className="font-paragraph text-sm text-gray-400">Zee5</span>
            </div>
          </div>

          {/* Social */}
          <div className="space-y-4">
            <h4 className="font-heading text-lg uppercase text-white">
              CONNECT
            </h4>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 transition-colors">
                <Facebook className="h-5 w-5 text-primary-foreground" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 transition-colors">
                <Twitter className="h-5 w-5 text-primary-foreground" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 transition-colors">
                <Instagram className="h-5 w-5 text-primary-foreground" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary flex items-center justify-center hover:bg-primary/80 transition-colors">
                <Youtube className="h-5 w-5 text-primary-foreground" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-gray-400">
              © {currentYear} StreamHub. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="font-paragraph text-sm text-gray-400 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="font-paragraph text-sm text-gray-400 hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
