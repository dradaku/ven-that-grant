
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { SavedGrant, createProposal } from '@/services/proposalService';

interface CreateProposalModalProps {
  isOpen: boolean;
  onClose: () => void;
  grant: SavedGrant;
  onSuccess: () => void;
}

const CreateProposalModal: React.FC<CreateProposalModalProps> = ({
  isOpen,
  onClose,
  grant,
  onSuccess
}) => {
  const [title, setTitle] = useState(`Proposal for ${grant.grant.title}`);
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const generateProposal = async () => {
    setIsGenerating(true);
    
    // Simulate AI-generated proposal
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const generatedContent = `# Research Proposal: ${grant.grant.title}

## Project Summary
This proposal addresses the key challenges outlined in the grant, focusing on innovative approaches to tackle [specific problem]. Our research team brings extensive experience in [relevant field] with a proven track record of successful outcomes.

## Objectives
1. Develop a comprehensive framework for [specific area]
2. Implement and test new methodologies for [specific process]
3. Evaluate outcomes against established benchmarks
4. Disseminate findings through peer-reviewed publications

## Methodology
Our approach combines quantitative and qualitative methods, utilizing [specific techniques] to ensure robust data collection and analysis. The project will be conducted in three phases over [timeframe].

## Expected Outcomes
- New insights into [specific area]
- Practical tools for [specific application]
- Recommendations for policy and practice
- Foundation for future research initiatives

## Budget Justification
The requested funding will support essential personnel, equipment, and operational costs necessary to achieve the project objectives within the proposed timeframe.`;
    
    setContent(generatedContent);
    setIsGenerating(false);
  };
  
  const handleSubmit = () => {
    if (!title.trim() || !content.trim()) return;
    
    setIsSubmitting(true);
    
    // Create the proposal
    createProposal(grant.id, title, content);
    
    setIsSubmitting(false);
    onSuccess();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Create Proposal for Grant</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Proposal Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter proposal title"
            />
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <Label htmlFor="content">Proposal Content</Label>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={generateProposal}
                disabled={isGenerating}
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  'Generate AI Proposal'
                )}
              </Button>
            </div>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your proposal or use AI to generate a draft"
              className="min-h-[300px]"
            />
          </div>
        </div>
        
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button 
            onClick={handleSubmit}
            disabled={isSubmitting || !title.trim() || !content.trim()}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Creating...
              </>
            ) : (
              'Create Proposal'
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProposalModal;
