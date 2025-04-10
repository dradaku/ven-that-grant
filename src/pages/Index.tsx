
import React, { useState } from 'react';
import CustomLayout from '@/components/CustomLayout';
import HeroSection from '@/components/HeroSection';
import CustomFeaturesSection from '@/components/CustomFeaturesSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import CTASection from '@/components/CTASection';
import GrantTweetingAgent from '@/components/GrantTweetingAgent';
import { GrantResult } from '@/services/veniceService';

const Index: React.FC = () => {
  const [twitterAgentId, setTwitterAgentId] = useState<string | null>(null);
  
  // Sample grants for the Twitter agent demo
  const sampleGrants: GrantResult[] = [
    {
      id: 101,
      title: "Innovate UK Smart Grants: October 2025",
      organization: "Innovate UK",
      amount: "£25,000 - £500,000",
      deadline: "2025-10-25",
      description: "Funding for game-changing and disruptive innovations from any sector or industry.",
      match_score: 92,
      url: "https://www.gov.uk/innovateuk",
      type: "Innovation"
    },
    {
      id: 102,
      title: "UKRI Future Leaders Fellowships",
      organization: "UK Research and Innovation",
      amount: "Up to £1.5 million",
      deadline: "2025-12-10",
      description: "Supporting early career researchers and innovators with outstanding potential.",
      match_score: 88,
      url: "https://www.ukri.org/flf",
      type: "Research"
    }
  ];
  
  const handleAgentCreated = (agentId: string) => {
    setTwitterAgentId(agentId);
  };

  return (
    <CustomLayout>
      <HeroSection />
      <CustomFeaturesSection />
      
      {/* Twitter Agent Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold mb-3">Automate Your Grant Outreach</h2>
              <p className="text-gray-600">
                Create an AI-powered Twitter agent that automatically tweets about new grant opportunities as they become available.
              </p>
            </div>
            
            <GrantTweetingAgent 
              onAgentCreated={handleAgentCreated}
              latestGrants={sampleGrants}
            />
          </div>
        </div>
      </section>
      
      <TestimonialsSection />
      <CTASection />
    </CustomLayout>
  );
};

export default Index;
