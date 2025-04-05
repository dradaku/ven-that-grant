
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Calendar, DollarSign, Building } from 'lucide-react';

interface GrantResult {
  id: number;
  title: string;
  organization: string;
  amount: string;
  deadline: string;
  description: string;
  match_score: number;
  url: string;
  type: string;
}

interface GrantResultCardProps {
  grant: GrantResult;
}

const GrantResultCard: React.FC<GrantResultCardProps> = ({ grant }) => {
  // Calculate days until deadline
  const deadlineDate = new Date(grant.deadline);
  const today = new Date();
  const daysUntil = Math.ceil((deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
  
  // Format deadline for display
  const formattedDeadline = deadlineDate.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <Card className="h-full flex flex-col transition-all duration-200 hover:shadow-md border-l-4 border-l-brand-purple">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg font-bold">{grant.title}</CardTitle>
            <CardDescription className="flex items-center mt-1">
              <Building className="h-4 w-4 mr-1" />
              {grant.organization}
            </CardDescription>
          </div>
          <Badge className={`${grant.match_score > 90 ? 'bg-green-600' : grant.match_score > 80 ? 'bg-brand-purple' : 'bg-gray-500'}`}>
            {grant.match_score}% Match
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-gray-700 text-sm mb-4">{grant.description}</p>
        
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center text-gray-600">
            <DollarSign className="h-4 w-4 mr-1 text-gray-400" />
            {grant.amount}
          </div>
          
          <div className="flex items-center text-gray-600">
            <Calendar className="h-4 w-4 mr-1 text-gray-400" />
            <span className={daysUntil < 30 ? 'text-red-600 font-medium' : ''}>
              {formattedDeadline}
            </span>
          </div>
        </div>
        
        {daysUntil < 30 && (
          <Badge variant="outline" className="mt-3 text-red-600 border-red-200 bg-red-50">
            {daysUntil <= 0 ? 'Deadline passed' : `${daysUntil} days remaining`}
          </Badge>
        )}
      </CardContent>
      <CardFooter className="border-t pt-4">
        <div className="w-full flex justify-between items-center">
          <Badge variant="outline" className={`capitalize ${grant.type === 'government' ? 'border-blue-200 bg-blue-50 text-blue-600' : 'border-purple-200 bg-purple-50 text-purple-600'}`}>
            {grant.type}
          </Badge>
          <Button variant="ghost" size="sm" className="text-brand-purple hover:text-brand-blue hover:bg-brand-purple/10" asChild>
            <a href={grant.url} target="_blank" rel="noopener noreferrer">
              View Details
              <ExternalLink className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default GrantResultCard;
