
import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const CTASection: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="rounded-2xl overflow-hidden">
          <div className="bg-gradient-to-r from-brand-blue to-brand-purple p-8 md:p-12 lg:p-16 text-white">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold">
                Start Finding Perfect Grants Today
              </h2>
              <p className="text-lg md:text-xl opacity-90">
                Join thousands of researchers and creatives who have found their ideal funding opportunities with VenThatGrant.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
                <Button size="lg" variant="default" className="bg-white text-brand-purple hover:bg-gray-100">
                  Get Started for Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button size="lg" variant="outline" className="border-white text-black hover:bg-white/10">
                  Schedule a Demo
                </Button>
              </div>
              <p className="text-sm opacity-80 pt-4">
                No credit card required. Free plan includes up to 10 grant searches per month.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
