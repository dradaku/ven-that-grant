
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { Search, Filter, ArrowRight, BookOpen, List, Zap } from 'lucide-react';

const steps = [
  {
    icon: <Search className="h-10 w-10 text-brand-purple" />,
    title: "1. Enter Your Research Area",
    description: "Describe your research or creative project using simple keywords or a detailed description. Our AI understands context, not just keywords."
  },
  {
    icon: <Zap className="h-10 w-10 text-brand-purple" />,
    title: "2. AI-Powered Discovery",
    description: "The Venice AI engine scans thousands of funding sources, analysing eligibility criteria, deadlines, and funding amounts to find relevant matches."
  },
  {
    icon: <List className="h-10 w-10 text-brand-purple" />,
    title: "3. Review Personalised Results",
    description: "Get a curated list of grants ranked by relevance to your project, with detailed information and match scores."
  },
  {
    icon: <Filter className="h-10 w-10 text-brand-purple" />,
    title: "4. Filter and Refine",
    description: "Narrow down your options based on funding amount, deadlines, or source type to find the perfect opportunities."
  }
];

const HowItWorks: React.FC = () => {
  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">How VenThatGrant Works</h1>
          <p className="text-xl text-gray-600">
            Our AI-powered platform simplifies the grant discovery process, helping you find relevant funding opportunities in minutes, not days.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {steps.map((step, i) => (
            <Card key={i} className="border border-gray-200">
              <CardContent className="p-6">
                <div className="flex flex-col space-y-4">
                  <div className="p-2 rounded-lg bg-brand-purple bg-opacity-10 inline-flex items-center justify-center w-fit">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-gray-50 rounded-xl p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Powered by Venice AI Technology
              </h2>
              <p className="text-gray-600 mb-6">
                Our platform leverages the powerful Venice AI API to scan and analyse thousands of grant opportunities from government agencies, private foundations, and international organisations.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-green-100 rounded-full p-1">
                    <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Natural language understanding of research contexts</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-green-100 rounded-full p-1">
                    <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Real-time monitoring of new funding opportunities</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-green-100 rounded-full p-1">
                    <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Detailed analysis of eligibility requirements</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-1 bg-green-100 rounded-full p-1">
                    <svg className="h-3 w-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <span className="text-gray-700">Personalised match scoring based on your profile</span>
                </li>
              </ul>
              <Button asChild className="bg-brand-purple hover:bg-brand-blue transition-colours">
                <Link to="/explore">
                  Start Exploring Grants
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-medium text-lg mb-4">Supported Funding Sources</h3>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <div className="bg-blue-100 rounded-full p-2">
                    <BookOpen className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Government Agencies</h4>
                    <p className="text-sm text-gray-500">NSF, NIH, NEA, NEH, DOE, and more</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-purple-100 rounded-full p-2">
                    <BookOpen className="h-5 w-5 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Private Foundations</h4>
                    <p className="text-sm text-gray-500">Gates Foundation, Ford Foundation, and more</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-green-100 rounded-full p-2">
                    <BookOpen className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">International Organisations</h4>
                    <p className="text-sm text-gray-500">UNESCO, World Health Organisation, and more</p>
                  </div>
                </li>
                <li className="flex items-center gap-3">
                  <div className="bg-amber-100 rounded-full p-2">
                    <BookOpen className="h-5 w-5 text-amber-600" />
                  </div>
                  <div>
                    <h4 className="font-medium">Corporate Grants</h4>
                    <p className="text-sm text-gray-500">Google, Microsoft, Amazon, and more</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HowItWorks;
