import React, { useState } from 'react';
import CustomLayout from '@/components/CustomLayout';
import { getSavedGrants, removeSavedGrant, SavedGrant } from '@/services/proposalService';
import { Button } from '@/components/ui/button';
import { Bookmark, FileEdit, Trash2, ClipboardList, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import CreateProposalModal from '@/components/CreateProposalModal';

const SavedGrantsPage: React.FC = () => {
  const [savedGrants, setSavedGrants] = useState<SavedGrant[]>(getSavedGrants());
  const [selectedGrant, setSelectedGrant] = useState<SavedGrant | null>(null);
  const [isProposalModalOpen, setIsProposalModalOpen] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const handleRemoveGrant = (id: string) => {
    if (removeSavedGrant(id)) {
      setSavedGrants(getSavedGrants());
      toast({
        title: "Grant Removed",
        description: "The grant has been removed from your saved list",
      });
    }
  };
  
  const handleCreateProposal = (grant: SavedGrant) => {
    setSelectedGrant(grant);
    setIsProposalModalOpen(true);
  };
  
  const handleViewProposals = (grantId: string) => {
    navigate(`/proposals?grantId=${grantId}`);
  };

  return (
    <CustomLayout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Saved Grants</h1>
            <p className="text-gray-600">
              Manage your saved grants and create proposals
            </p>
          </div>
        </div>
        
        {savedGrants.length === 0 ? (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
            <Bookmark className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">No Saved Grants</h3>
            <p className="text-gray-600 mb-4">
              You haven't saved any grants yet. Explore grants and save them to get started.
            </p>
            <Button onClick={() => navigate('/explore')}>
              Explore Grants
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {savedGrants.map(savedGrant => (
              <Card key={savedGrant.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-bold">{savedGrant.grant.title}</h3>
                        <p className="text-gray-600 text-sm">{savedGrant.grant.organization}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href={savedGrant.grant.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Grant
                          </a>
                        </Button>
                        <Button variant="destructive" size="sm" onClick={() => handleRemoveGrant(savedGrant.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="mb-4">
                      <p className="mb-2">{savedGrant.grant.description}</p>
                      <div className="flex justify-between text-sm">
                        <span><strong>Amount:</strong> {savedGrant.grant.amount}</span>
                        <span><strong>Deadline:</strong> {new Date(savedGrant.grant.deadline).toLocaleDateString()}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-end space-x-3">
                      <Button variant="outline" onClick={() => handleViewProposals(savedGrant.id)}>
                        <ClipboardList className="h-4 w-4 mr-2" />
                        View Proposals
                      </Button>
                      <Button onClick={() => handleCreateProposal(savedGrant)}>
                        <FileEdit className="h-4 w-4 mr-2" />
                        Create Proposal
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
        
        {selectedGrant && (
          <CreateProposalModal
            isOpen={isProposalModalOpen}
            onClose={() => setIsProposalModalOpen(false)}
            grant={selectedGrant}
            onSuccess={() => {
              setIsProposalModalOpen(false);
              toast({
                title: "Proposal Created",
                description: "Your new proposal has been created successfully",
              });
            }}
          />
        )}
      </div>
    </CustomLayout>
  );
};

export default SavedGrantsPage;
