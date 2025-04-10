
import React from 'react';
import { Search, Filter, Clock, Target, BookOpen, Database } from 'lucide-react';

const features = [
  {
    icon: <Search className="h-10 w-10 text-brand-purple" />,
    title: "Intelligent Search",
    description: "Advanced AI search that understands research contexts and creative intentions, not just keywords."
  },
  {
    icon: <Filter className="h-10 w-10 text-brand-purple" />,
    title: "Smart Filtering",
    description: "Automatically filter grants based on eligibility requirements, deadlines, and funding amounts."
  },
  {
    icon: <Clock className="h-10 w-10 text-brand-purple" />,
    title: "Deadline Alerts",
    description: "Never miss an opportunity with personalised deadline reminders and application timelines."
  },
  {
    icon: <Target className="h-10 w-10 text-brand-purple" />,
    title: "Relevance Matching",
    description: "Our AI analyses your research interests to find the most relevant funding opportunities."
  },
  {
    icon: <BookOpen className="h-10 w-10 text-brand-purple" />,
    title: "Grant Insights",
    description: "Get detailed insights into grant requirements, success rates, and application tips."
  },
  {
    icon: <Database className="h-10 w-10 text-brand-purple" />,
    title: "Comprehensive Database",
    description: "Access thousands of grants from government agencies, foundations, and private organisations."
  }
];

const FeaturesSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Powered by Advanced AI
          </h2>
          <p className="text-xl text-gray-600">
            Our Venice AI integration scans and analyses thousands of funding sources to find opportunities that match your specific needs.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex flex-col space-y-4">
                <div className="p-2 rounded-lg bg-brand-purple bg-opacity-10 inline-flex items-center justify-center w-fit">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
