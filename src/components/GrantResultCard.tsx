
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ExternalLink, BookmarkPlus, Check } from 'lucide-react';
import { GrantResult } from '@/services/veniceService';
import { Badge } from '@/components/ui/badge';
import { saveGrant, getSavedGrants } from '@/services/proposalService';
import { useToast } from '@/hooks/use-toast';

interface GrantResultCardProps {
  grant: GrantResult;
}

const GrantResultCard: React.FC<GrantResultCardProps> = ({ grant }) => {
  const { toast } = useToast();
  const [isSaved, setIsSaved] = React.useState(() => {
    // Check if this grant is already saved
    return getSavedGrants().some(savedGrant => 
      savedGrant.grant.id === grant.id
    );
  });
  
  const formatMatchScore = (score: number) => {
    return `${score}%`;
  };

  // Color gradient based on match score
  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'bg-emerald-500';
    if (score >= 80) return 'bg-green-500';
    if (score >= 70) return 'bg-lime-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-orange-500';
  };

  const randomEncouragement = () => {
    const encouragements = [
      "You've got this!",
      "Let's get that grant!",
      "This one has your name on it!",
      "Perfect match for your work!",
      "Time to shine with this opportunity!"
    ];
    return encouragements[Math.floor(Math.random() * encouragements.length)];
  };
  
  const handleSaveGrant = () => {
    if (isSaved) return;
    
    saveGrant(grant);
    setIsSaved(true);
    
    toast({
      title: "Grant Saved",
      description: "This grant has been saved to your collection",
    });
  };

  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Match score indicator */}
          <div className={`${getMatchScoreColor(grant.match_score)} text-white font-bold py-2 px-3 md:w-16 md:py-0 md:flex md:items-center md:justify-center`}>
            <span className="md:rotate-90 md:transform md:whitespace-nowrap">
              {formatMatchScore(grant.match_score)}
            </span>
          </div>
          
          {/* Grant content */}
          <div className="flex-1 p-5">
            <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
              <h3 className="text-lg font-bold text-gray-900 flex-1">{grant.title}</h3>
              
              <div className="flex gap-1">
                <Badge variant="outline" className="capitalize">
                  {grant.type}
                </Badge>
                {grant.country && (
                  <Badge variant="secondary" className="capitalize">
                    {grant.country}
                  </Badge>
                )}
              </div>
            </div>
            
            <div className="mb-3 text-sm text-gray-500">
              {grant.organization}
            </div>
            
            <p className="mb-4 text-gray-700">{grant.description}</p>
            
            {grant.fit_reason && (
              <div className="mb-4 p-3 bg-blue-50 rounded-md">
                <h4 className="font-medium mb-1">Why This Fits You:</h4>
                <p className="text-gray-700">{grant.fit_reason}</p>
              </div>
            )}
            
            {grant.draft_paragraph && (
              <div className="mb-4 p-3 bg-green-50 rounded-md">
                <h4 className="font-medium mb-1">Application Draft:</h4>
                <p className="text-gray-700 italic">{grant.draft_paragraph}</p>
              </div>
            )}
            
            <div className="flex flex-wrap justify-between items-center gap-3">
              <div className="space-y-1">
                <div className="text-sm">
                  <span className="font-medium">Amount:</span> {grant.amount}
                </div>
                <div className="text-sm">
                  <span className="font-medium">Deadline:</span> {new Date(grant.deadline).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                </div>
              </div>
              
              <div className="ml-auto space-y-2">
                <div className="text-sm font-medium text-brand-purple">
                  {randomEncouragement()}
                </div>
                <div className="flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={handleSaveGrant}
                    disabled={isSaved}
                  >
                    {isSaved ? (
                      <>
                        <Check className="h-4 w-4 mr-2" />
                        Saved
                      </>
                    ) : (
                      <>
                        <BookmarkPlus className="h-4 w-4 mr-2" />
                        Save Grant
                      </>
                    )}
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <a href={grant.url} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-2" />
                      View Grant
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GrantResultCard;
