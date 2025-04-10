
import React, { useState, useEffect } from 'react';
import CustomLayout from '@/components/CustomLayout';
import { getProposals, optimizeProposal, Proposal, getSavedGrants } from '@/services/proposalService';
import { Button } from '@/components/ui/button';
import { FileText, FileCheck, FilePenLine, ClipboardList, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

// Helper function to generate status badges
const getStatusBadge = (status: Proposal['status']) => {
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

const ProposalsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const grantId = searchParams.get('grantId');
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [optimizingId, setOptimizingId] = useState<string | null>(null);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const grantInfo = grantId ? 
    getSavedGrants().find(g => g.id === grantId)?.grant : 
    null;
  
  useEffect(() => {
    // Load proposals, filtered by grantId if provided
    setProposals(getProposals(grantId || undefined));
  }, [grantId]);
  
  const handleOptimizeProposal = async (proposalId: string) => {
    setOptimizingId(proposalId);
    
    try {
      const optimized = await optimizeProposal(proposalId);
      if (optimized) {
        setProposals(prev => 
          prev.map(p => p.id === proposalId ? optimized : p)
        );
        
        toast({
          title: "Proposal Optimized",
          description: "Your proposal has been optimized by our AI",
        });
      }
    } catch (error) {
      toast({
        title: "Optimization Failed",
        description: "There was an error optimizing your proposal",
        variant: "destructive",
      });
    } finally {
      setOptimizingId(null);
    }
  };
  
  const handleViewReports = (proposalId: string) => {
    navigate(`/reports?proposalId=${proposalId}`);
  };

  return (
    <CustomLayout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            {grantInfo ? (
              <>
                <Button 
                  variant="ghost" 
                  className="mb-2 -ml-3" 
                  onClick={() => navigate('/saved-grants')}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Saved Grants
                </Button>
                <h1 className="text-3xl font-bold mb-1">Proposals for {grantInfo.title}</h1>
                <p className="text-gray-600">
                  {grantInfo.organization} • Deadline: {new Date(grantInfo.deadline).toLocaleDateString()}
                </p>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold mb-2">My Proposals</h1>
                <p className="text-gray-600">
                  Manage all your grant proposals in one place
                </p>
              </>
            )}
          </div>
        </div>
        
        {proposals.length === 0 ? (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">No Proposals Yet</h3>
            <p className="text-gray-600 mb-4">
              {grantInfo 
                ? "You haven't created any proposals for this grant yet."
                : "You haven't created any proposals yet. Save a grant to get started."}
            </p>
            {grantInfo ? (
              <Button onClick={() => navigate('/saved-grants')}>
                View Saved Grants
              </Button>
            ) : (
              <Button onClick={() => navigate('/explore')}>
                Explore Grants
              </Button>
            )}
          </div>
        ) : (
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Proposals</TabsTrigger>
              <TabsTrigger value="draft">Drafts</TabsTrigger>
              <TabsTrigger value="optimized">Optimized</TabsTrigger>
              <TabsTrigger value="submitted">Submitted</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="space-y-6">
              {proposals.map(proposal => (
                <ProposalCard 
                  key={proposal.id}
                  proposal={proposal}
                  optimizingId={optimizingId}
                  onOptimize={handleOptimizeProposal}
                  onViewReports={handleViewReports}
                />
              ))}
            </TabsContent>
            
            <TabsContent value="draft" className="space-y-6">
              {proposals.filter(p => p.status === 'draft').map(proposal => (
                <ProposalCard 
                  key={proposal.id}
                  proposal={proposal}
                  optimizingId={optimizingId}
                  onOptimize={handleOptimizeProposal}
                  onViewReports={handleViewReports}
                />
              ))}
            </TabsContent>
            
            <TabsContent value="optimized" className="space-y-6">
              {proposals.filter(p => p.status === 'optimized').map(proposal => (
                <ProposalCard 
                  key={proposal.id}
                  proposal={proposal}
                  optimizingId={optimizingId}
                  onOptimize={handleOptimizeProposal}
                  onViewReports={handleViewReports}
                />
              ))}
            </TabsContent>
            
            <TabsContent value="submitted" className="space-y-6">
              {proposals.filter(p => p.status === 'submitted').map(proposal => (
                <ProposalCard 
                  key={proposal.id}
                  proposal={proposal}
                  optimizingId={optimizingId}
                  onOptimize={handleOptimizeProposal}
                  onViewReports={handleViewReports}
                />
              ))}
            </TabsContent>
          </Tabs>
        )}
      </div>
    </CustomLayout>
  );
};

// Proposal Card Component
interface ProposalCardProps {
  proposal: Proposal;
  optimizingId: string | null;
  onOptimize: (id: string) => void;
  onViewReports: (id: string) => void;
}

const ProposalCard: React.FC<ProposalCardProps> = ({ 
  proposal, 
  optimizingId,
  onOptimize,
  onViewReports
}) => {
  const navigate = useNavigate();
  
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-0">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <div className="flex items-center gap-3">
                <h3 className="text-xl font-bold">{proposal.title}</h3>
                {getStatusBadge(proposal.status)}
              </div>
              <p className="text-gray-600 text-sm">
                Created: {new Date(proposal.createdAt).toLocaleDateString()}
                {" • "}
                Updated: {new Date(proposal.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          
          <div className="mb-4 max-h-32 overflow-hidden text-sm relative">
            <div dangerouslySetInnerHTML={{ 
              __html: proposal.content.substring(0, 250).replace(/\n/g, '<br>') + '...' 
            }} />
            <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-white to-transparent"></div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button variant="outline" onClick={() => onViewReports(proposal.id)}>
              <ClipboardList className="h-4 w-4 mr-2" />
              Reports
            </Button>
            <Button 
              variant="outline" 
              disabled={optimizingId === proposal.id || proposal.status === 'optimized'}
              onClick={() => onOptimize(proposal.id)}
            >
              {optimizingId === proposal.id ? (
                <>
                  <FileCheck className="h-4 w-4 mr-2 animate-spin" />
                  Optimizing...
                </>
              ) : (
                <>
                  <FilePenLine className="h-4 w-4 mr-2" />
                  Optimize with AI
                </>
              )}
            </Button>
            <Button onClick={() => navigate(`/proposal/${proposal.id}`)}>
              View Details
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ProposalsPage;
