
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, FileSearch, BarChart3, ClipboardCheck } from 'lucide-react';

const CustomFeaturesSection: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold mb-4">Powerful AI-Driven Features</h2>
          <p className="text-gray-600">
            VenThatGrant™ combines cutting-edge AI with grant expertise to maximize your funding success
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<Sparkles className="h-10 w-10 text-brand-purple" />}
            title="Find Perfect Grants" 
            description="Our AI matches your profile with over 5,000 funding sources to find your perfect grant opportunities."
          />
          
          <FeatureCard 
            icon={<FileSearch className="h-10 w-10 text-brand-purple" />}
            title="Generate Proposals" 
            description="Create compelling research proposals using our AI assistant to match grant requirements."
          />
          
          <FeatureCard 
            icon={<BarChart3 className="h-10 w-10 text-brand-purple" />}
            title="Optimize Research" 
            description="Get expert critique and optimization of your research proposals to increase success rates."
          />
          
          <FeatureCard 
            icon={<ClipboardCheck className="h-10 w-10 text-brand-purple" />}
            title="Manage Reporting" 
            description="Generate comprehensive grant reports and track progress with structured templates."
          />
        </div>
      </div>
    </section>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description }) => {
  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardContent className="pt-6">
        <div className="mb-4">{icon}</div>
        <h3 className="text-xl font-bold mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </CardContent>
    </Card>
  );
};

export default CustomFeaturesSection;
