
import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

const testimonials = [
  {
    quote: "VenThatGrant helped me find an obscure funding opportunity that was perfect for my research. I would have never discovered it through traditional search methods.",
    author: "Dr. Sarah Chen",
    role: "Biomedical Researcher",
    avatar: "/placeholder.svg"
  },
  {
    quote: "As an independent filmmaker, finding grants used to be a full-time job. This platform saved me countless hours and connected me with the perfect funding source.",
    author: "Miguel Rodriguez",
    role: "Documentary Filmmaker",
    avatar: "/placeholder.svg"
  },
  {
    quote: "The AI understanding of my research focus is remarkable. Every recommendation felt tailored specifically to my academic interests and career stage.",
    author: "Prof. James Wilson",
    role: "Quantum Physics Researcher",
    avatar: "/placeholder.svg"
  }
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Trusted by Researchers and Creatives
          </h2>
          <p className="text-xl text-gray-600">
            See how VenThatGrant has helped researchers and creatives find their perfect funding opportunities.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border border-gray-200 hover:border-brand-purple transition-colors">
              <CardContent className="p-6 flex flex-col space-y-4">
                <div className="flex-grow">
                  <p className="text-gray-700 italic">"{testimonial.quote}"</p>
                </div>
                <div className="flex items-center space-x-4 pt-4 border-t border-gray-100">
                  <Avatar>
                    <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                    <AvatarFallback className="bg-brand-purple text-white">
                      {testimonial.author.split(' ').map(name => name[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{testimonial.author}</p>
                    <p className="text-sm text-gray-500">{testimonial.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
