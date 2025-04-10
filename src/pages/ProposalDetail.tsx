
import React, { useState, useEffect } from 'react';
import CustomLayout from '@/components/CustomLayout';
import { updateProposal, getProposals, getSavedGrants } from '@/services/proposalService';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Save, CheckCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ProposalCritique from '@/components/ProposalCritique';

const ProposalDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [grantInfo, setGrantInfo] = useState<any>(null);
  const [status, setStatus] = useState<'draft' | 'optimized' | 'submitted'>('draft');
  const [isSaving, setIsSaving] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!id) return;
    
    const proposal = getProposals().find(p => p.id === id);
    if (!proposal) {
      toast({
        title: "Proposal Not Found",
        description: "Unable to find the requested proposal",
        variant: "destructive",
      });
      navigate('/proposals');
      return;
    }
    
    setTitle(proposal.title);
    setContent(proposal.content);
    setStatus(proposal.status);
    
    // Get grant info
    const grant = getSavedGrants().find(g => g.id === proposal.grantId)?.grant;
    if (grant) {
      setGrantInfo(grant);
    }
  }, [id, navigate, toast]);
  
  const handleSave = async () => {
    if (!id) return;
    
    setIsSaving(true);
    
    try {
      const updated = updateProposal(id, { title, content });
      if (updated) {
        toast({
          title: "Proposal Saved",
          description: "Your changes have been saved successfully",
        });
      }
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "There was an error saving your proposal",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleMarkAsSubmitted = async () => {
    if (!id) return;
    
    try {
      const updated = updateProposal(id, { status: 'submitted' });
      if (updated) {
        setStatus('submitted');
        toast({
          title: "Proposal Status Updated",
          description: "Your proposal has been marked as submitted",
        });
      }
    } catch (error) {
      toast({
        title: "Update Failed",
        description: "There was an error updating your proposal",
        variant: "destructive",
      });
    }
  };
  
  const getStatusBadge = () => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline">Draft</Badge>;
      case 'optimized':
        return <Badge className="bg-green-500">Optimized</Badge>;
      case 'submitted':
        return <Badge className="bg-blue-500">Submitted</Badge>;
      default:
        return null;
    }
  };

  return (
    <CustomLayout>
      <div className="container py-8">
        <Button 
          variant="ghost" 
          className="mb-4 -ml-3" 
          onClick={() => navigate('/proposals')}
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Proposals
        </Button>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-bold">Edit Proposal</h1>
            {getStatusBadge()}
          </div>
          
          <div className="flex space-x-3">
            <Button 
              variant="outline" 
              onClick={handleSave}
              disabled={isSaving || status === 'submitted'}
            >
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </Button>
            
            {status !== 'submitted' && (
              <Button 
                onClick={handleMarkAsSubmitted}
              >
                <CheckCircle className="h-4 w-4 mr-2" />
                Mark as Submitted
              </Button>
            )}
          </div>
        </div>
        
        {grantInfo && (
          <Card className="mb-6">
            <CardContent className="p-4">
              <h3 className="font-semibold mb-1">Grant Information</h3>
              <p className="text-sm">{grantInfo.title} - {grantInfo.organization}</p>
              <p className="text-sm">Amount: {grantInfo.amount} • Deadline: {new Date(grantInfo.deadline).toLocaleDateString()}</p>
            </CardContent>
          </Card>
        )}
        
        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="edit">Edit Proposal</TabsTrigger>
            <TabsTrigger value="critique">AI Critique</TabsTrigger>
          </TabsList>
          
          <TabsContent value="edit" className="space-y-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium mb-2">
                Proposal Title
              </label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter proposal title"
                disabled={status === 'submitted'}
                className="max-w-2xl"
              />
            </div>
            
            <div>
              <label htmlFor="content" className="block text-sm font-medium mb-2">
                Proposal Content
              </label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your proposal content"
                disabled={status === 'submitted'}
                className="min-h-[500px]"
              />
            </div>
          </TabsContent>
          
          <TabsContent value="critique">
            {id && <ProposalCritique proposalId={id} />}
          </TabsContent>
        </Tabs>
      </div>
    </CustomLayout>
  );
};

export default ProposalDetail;
