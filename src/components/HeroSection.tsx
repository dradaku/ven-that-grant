
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const [query, setQuery] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) {
      toast({
        title: "Search query required",
        description: "Please enter a research area, project type, or keyword",
        variant: "destructive",
      });
      return;
    }

    // Navigate to the explore page with the search query
    navigate(`/explore?query=${encodeURIComponent(query)}`);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand-blue via-brand-purple to-brand-teal opacity-10"></div>
      
      <div className="container relative z-10 py-16 md:py-24 lg:py-32">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-blue to-brand-purple">
              Discover & Apply for Grants
            </span>
            <br />
            <span>Shape That Vision</span>
          </h1>
          
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            End-to-End AI-powered grant engine. From discovery, critiquing and reporting- freeing innovators, researchers and creatives to create impact.
          </p>
          
          <form onSubmit={handleSearch} className="flex w-full max-w-md mx-auto">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Research area, project type, or keywords..."
                className="pl-10 pr-4 py-6 rounded-l-md w-full border-r-0"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              className="bg-brand-purple hover:bg-brand-blue transition-colors rounded-l-none"
            >
              <span className="hidden sm:inline">Find Grants</span>
              <ArrowRight className="h-5 w-5 sm:ml-2" />
            </Button>
          </form>
          
          <div className="pt-4 text-sm text-gray-500">
            Scanning funding sources from UKRI, Arts Council England, Wellcome Trust, Leverhulme Trust, as well as NSF, NIH, NEA, NEH, and private foundations
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
