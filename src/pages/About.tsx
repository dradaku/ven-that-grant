
import React from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock, Users, Zap } from 'lucide-react';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="container py-12 md:py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About VenThatGrant</h1>
          <p className="text-xl text-gray-600">
            We're on a mission to transform how researchers and creatives discover and access funding opportunities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our Story</h2>
            <p className="text-gray-600 mb-4">
              VenThatGrant was born from a simple observation: finding the right grant is often harder than doing the actual research or creative work. 
            </p>
            <p className="text-gray-600 mb-4">
              Founded by a team of researchers, creatives, academics and AI specialists, we set out to build a platform that understands the nuances of different research fields and creative disciplines, making the funding discovery process intuitive and effective.
            </p>
            <p className="text-gray-600">
              By leveraging the power of Venice AI technology, we've created a platform that not only finds grants but truly understands your research context and creative vision.
            </p>
          </div>
          <div className="bg-gray-50 rounded-xl p-8">
            <h3 className="text-xl font-bold mb-4">Our Impact</h3>
            <div className="grid grid-cols-2 gap-6">
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-purple mb-2">$250M+</div>
                <p className="text-gray-600">Funding secured by users</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-purple mb-2">15,000+</div>
                <p className="text-gray-600">Researchers helped</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-purple mb-2">10,000+</div>
                <p className="text-gray-600">Funding sources</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-brand-purple mb-2">85%</div>
                <p className="text-gray-600">Success rate increase</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-8">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="p-2 rounded-lg bg-brand-purple bg-opacity-10 inline-flex items-center justify-center mb-4">
                <Users className="h-8 w-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Accessibility</h3>
              <p className="text-gray-600">
                We believe every researcher and creative deserves equal access to funding opportunities, regardless of their institution, background, or network.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="p-2 rounded-lg bg-brand-purple bg-opacity-10 inline-flex items-center justify-center mb-4">
                <Zap className="h-8 w-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Innovation</h3>
              <p className="text-gray-600">
                We continuously push the boundaries of AI technology to create more intuitive, powerful tools for the research and creative communities.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="p-2 rounded-lg bg-brand-purple bg-opacity-10 inline-flex items-center justify-center mb-4">
                <Clock className="h-8 w-8 text-brand-purple" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Efficiency</h3>
              <p className="text-gray-600">
                We're committed to saving researchers and creatives valuable time, allowing them to focus on what matters most: their groundbreaking work.
              </p>
            </div>
          </div>
        </div>
        
        <div className="rounded-xl overflow-hidden mb-16">
          <div className="bg-gradient-to-r from-brand-blue to-brand-purple p-8 md:p-12 text-white">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Find Your Perfect Grant?</h2>
              <p className="text-xl opacity-90 mb-8">
                Join thousands of researchers and creatives who've discovered their ideal funding opportunities with VenThatGrant.
              </p>
              <Button size="lg" className="bg-white text-brand-purple hover:bg-gray-100" asChild>
                <Link to="/explore">
                  Start Exploring Grants
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-3xl font-bold text-center mb-8">Why Researchers Trust Us</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex space-x-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <h3 className="text-xl font-semibold">Comprehensive Coverage</h3>
              </div>
              <p className="text-gray-600">
                Our platform scans thousands of funding sources, from government agencies to private foundations, ensuring you never miss an opportunity.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex space-x-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <h3 className="text-xl font-semibold">AI-Powered Relevance</h3>
              </div>
              <p className="text-gray-600">
                Our Venice AI technology understands the nuances of research fields and creative disciplines, delivering highly relevant results.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex space-x-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <h3 className="text-xl font-semibold">Time Efficiency</h3>
              </div>
              <p className="text-gray-600">
                What used to take weeks of manual searching can now be accomplished in minutes, giving you more time to focus on your work.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <div className="flex space-x-3 mb-4">
                <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                <h3 className="text-xl font-semibold">Proven Results</h3>
              </div>
              <p className="text-gray-600">
                Thousands of researchers and creatives have secured funding through opportunities discovered on our platform.
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
