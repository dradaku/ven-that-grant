
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Critique, generateAICritique, getCritiques } from '@/services/proposalService';
import { Sparkles, ThumbsUp, AlertTriangle, Lightbulb, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ProposalCritiqueProps {
  proposalId: string;
}

const ProposalCritique: React.FC<ProposalCritiqueProps> = ({ proposalId }) => {
  const [critiques, setCritiques] = useState<Critique[]>(getCritiques(proposalId));
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  
  const handleGenerateCritique = async () => {
    setIsGenerating(true);
    
    try {
      const generatedCritiques = await generateAICritique(proposalId);
      if (generatedCritiques.length > 0) {
        setCritiques(prev => [...prev, ...generatedCritiques]);
        
        toast({
          title: "Critique Generated",
          description: "Your proposal has been analyzed by our AI",
        });
      }
    } catch (error) {
      toast({
        title: "Generation Failed",
        description: "There was an error generating the critique",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };
  
  const getCritiqueIcon = (type: Critique['type']) => {
    switch (type) {
      case 'strength':
        return <ThumbsUp className="h-5 w-5 text-green-500" />;
      case 'weakness':
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case 'suggestion':
        return <Lightbulb className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };
  
  const getCritiqueTitle = (type: Critique['type']) => {
    switch (type) {
      case 'strength':
        return "Strengths";
      case 'weakness':
        return "Areas for Improvement";
      case 'suggestion':
        return "Suggestions";
      default:
        return "";
    }
  };
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">AI Critique & Optimization</h2>
        
        <Button 
          onClick={handleGenerateCritique}
          disabled={isGenerating}
        >
          {isGenerating ? (
            <>
              <Loader2 className="h-4 w-4 mr-2 animate-spin" />
              Analyzing...
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 mr-2" />
              Generate AI Critique
            </>
          )}
        </Button>
      </div>
      
      {critiques.length === 0 ? (
        <Card className="bg-gray-50">
          <CardContent className="pt-6 text-center py-12">
            <Sparkles className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg font-medium mb-2">No Critiques Yet</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Generate an AI critique to receive analysis of your proposal's strengths, areas for improvement, and suggestions to increase success rates.
            </p>
            <Button 
              onClick={handleGenerateCritique}
              disabled={isGenerating}
            >
              {isGenerating ? "Analyzing..." : "Generate AI Critique"}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {critiques.map(critique => (
            <Card key={critique.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center text-lg">
                  {getCritiqueIcon(critique.type)}
                  <span className="ml-2">{getCritiqueTitle(critique.type)}</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="whitespace-pre-line">
                  {critique.content}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProposalCritique;
