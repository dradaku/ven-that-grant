
import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Twitter, Facebook, Instagram, Github } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="container py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-brand-purple" />
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-purple">
                GrantWhisper
              </span>
            </div>
            <p className="text-gray-600 text-sm">
              AI-powered grant discovery for researchers and creatives. Find the perfect funding opportunity for your next project.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-brand-purple transition-colors">
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-purple transition-colors">
                <Facebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-purple transition-colors">
                <Instagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-gray-500 hover:text-brand-purple transition-colors">
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-sm tracking-wider uppercase text-gray-500 mb-4">Product</h3>
            <ul className="space-y-2">
              <li><Link to="/features" className="text-gray-600 hover:text-brand-purple transition-colors">Features</Link></li>
              <li><Link to="/pricing" className="text-gray-600 hover:text-brand-purple transition-colors">Pricing</Link></li>
              <li><Link to="/how-it-works" className="text-gray-600 hover:text-brand-purple transition-colors">How it Works</Link></li>
              <li><Link to="/testimonials" className="text-gray-600 hover:text-brand-purple transition-colors">Testimonials</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm tracking-wider uppercase text-gray-500 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-600 hover:text-brand-purple transition-colors">Blog</Link></li>
              <li><Link to="/guides" className="text-gray-600 hover:text-brand-purple transition-colors">Guides</Link></li>
              <li><Link to="/help" className="text-gray-600 hover:text-brand-purple transition-colors">Help Center</Link></li>
              <li><Link to="/events" className="text-gray-600 hover:text-brand-purple transition-colors">Events</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-sm tracking-wider uppercase text-gray-500 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-brand-purple transition-colors">About</Link></li>
              <li><Link to="/careers" className="text-gray-600 hover:text-brand-purple transition-colors">Careers</Link></li>
              <li><Link to="/privacy" className="text-gray-600 hover:text-brand-purple transition-colors">Privacy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-brand-purple transition-colors">Terms</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} GrantWhisper. All rights reserved.
          </p>
          <div className="mt-4 md:mt-0 flex space-x-6">
            <Link to="/privacy" className="text-gray-500 hover:text-brand-purple text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-500 hover:text-brand-purple text-sm transition-colors">
              Terms of Service
            </Link>
            <Link to="/cookies" className="text-gray-500 hover:text-brand-purple text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
