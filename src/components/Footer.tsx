import { Link } from 'react-router-dom';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-white/10">
      <div className="w-full max-w-[100rem] mx-auto px-4 md:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="font-heading text-xl uppercase text-primary">
              StreamHub
            </h3>
            <p className="font-paragraph text-sm text-gray-400">
              Your unified platform for discovering content across all streaming services.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm uppercase text-white">
              LINKS
            </h4>
            <nav className="flex flex-col gap-2">
              <Link to="/" className="font-paragraph text-sm text-gray-400 hover:text-primary transition-colors">
                Home
              </Link>
              <Link to="/browse" className="font-paragraph text-sm text-gray-400 hover:text-primary transition-colors">
                Browse
              </Link>
              <Link to="/subscriptions" className="font-paragraph text-sm text-gray-400 hover:text-primary transition-colors">
                Subscriptions
              </Link>
            </nav>
          </div>

          {/* Legal */}
          <div className="space-y-4">
            <h4 className="font-heading text-sm uppercase text-white">
              LEGAL
            </h4>
            <div className="flex flex-col gap-2">
              <a href="#" className="font-paragraph text-sm text-gray-400 hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="font-paragraph text-sm text-gray-400 hover:text-primary transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-white/10">
          <p className="font-paragraph text-sm text-gray-400 text-center">
            © {currentYear} StreamHub. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
