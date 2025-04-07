
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { Menu, X, Search, BookOpen, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-brand-purple" />
            <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-purple">
              VenThatGrant
            </span>
          </Link>
        </div>
        
        {/* Desktop navigation */}
        <nav className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-sm font-medium hover:text-brand-purple transition-colors">
            Home
          </Link>
          <Link to="/explore" className="text-sm font-medium hover:text-brand-purple transition-colors">
            Explore Grants
          </Link>
          <Link to="/how-it-works" className="text-sm font-medium hover:text-brand-purple transition-colors">
            How It Works
          </Link>
          <Link to="/about" className="text-sm font-medium hover:text-brand-purple transition-colors">
            About
          </Link>
        </nav>
        
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="sm">
            Sign In
          </Button>
          <Button variant="default" size="sm" className="bg-brand-purple hover:bg-brand-blue transition-colors">
            Get Started
          </Button>
        </div>
        
        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2" 
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      
      {/* Mobile navigation */}
      <div className={cn(
        "md:hidden fixed inset-0 top-16 z-50 bg-background transition-transform duration-300 ease-in-out",
        isMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <nav className="container flex flex-col gap-4 p-6">
          <Link 
            to="/" 
            className="flex items-center gap-2 py-2 text-lg font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/explore" 
            className="flex items-center gap-2 py-2 text-lg font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Explore Grants
          </Link>
          <Link 
            to="/how-it-works" 
            className="flex items-center gap-2 py-2 text-lg font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            How It Works
          </Link>
          <Link 
            to="/about" 
            className="flex items-center gap-2 py-2 text-lg font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <div className="flex flex-col gap-2 mt-4">
            <Button variant="outline" className="w-full justify-start">
              Sign In
            </Button>
            <Button className="w-full justify-start bg-brand-purple hover:bg-brand-blue transition-colors">
              Get Started
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
