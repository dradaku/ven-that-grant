import React, { useState, useEffect } from 'react';
import CustomLayout from '@/components/CustomLayout';
import { getReports, generateAIReport, getProposals, Report } from '@/services/proposalService';
import { Button } from '@/components/ui/button';
import { Clipboard, ClipboardCheck, FilePenLine, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';

const ReportsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const proposalId = searchParams.get('proposalId');
  const [reports, setReports] = useState<Report[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const proposalTitle = proposalId ? 
    getProposals().find(p => p.id === proposalId)?.title || 'Unknown Proposal' : 
    null;
  
  useEffect(() => {
    setReports(getReports(proposalId || undefined));
  }, [proposalId]);
  
  const handleGenerateReport = async () => {
    if (!proposalId) return;
    
    setIsGenerating(true);
    
    try {
      const report = await generateAIReport(proposalId);
      if (report) {
        setReports(prev => [...prev, report]);
        toast({
          title: "Report Generated",
          description: "Your AI-generated report is ready to view",
        });
      }
    } catch (error) {
      toast({
        title: "Report Generation Failed",
        description: "There was an error generating your report",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <CustomLayout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            {proposalTitle ? (
              <>
                <Button 
                  variant="ghost" 
                  className="mb-2 -ml-3" 
                  onClick={() => navigate('/proposals')}
                >
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Proposals
                </Button>
                <h1 className="text-3xl font-bold mb-2">Reports for {proposalTitle}</h1>
                <p className="text-gray-600">
                  View and generate reports for your proposal
                </p>
              </>
            ) : (
              <>
                <h1 className="text-3xl font-bold mb-2">All Reports</h1>
                <p className="text-gray-600">
                  View all your grant reports in one place
                </p>
              </>
            )}
          </div>
          
          {proposalId && (
            <Button 
              onClick={handleGenerateReport}
              disabled={isGenerating}
            >
              {isGenerating ? (
                <>
                  <ClipboardCheck className="h-4 w-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <FilePenLine className="h-4 w-4 mr-2" />
                  Generate Report
                </>
              )}
            </Button>
          )}
        </div>
        
        {reports.length === 0 ? (
          <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
            <Clipboard className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-xl font-medium mb-2">No Reports Yet</h3>
            <p className="text-gray-600 mb-4">
              {proposalId 
                ? "You haven't generated any reports for this proposal yet."
                : "You haven't created any reports yet. Generate a report from a proposal to get started."}
            </p>
            {proposalId ? (
              <Button onClick={handleGenerateReport} disabled={isGenerating}>
                {isGenerating ? "Generating..." : "Generate Your First Report"}
              </Button>
            ) : (
              <Button onClick={() => navigate('/proposals')}>
                View Proposals
              </Button>
            )}
          </div>
        ) : (
          <div className="space-y-6">
            {reports.map(report => (
              <Card key={report.id} className="overflow-hidden">
                <CardContent className="p-6">
                  <div className="mb-4">
                    <p className="text-sm text-gray-600">
                      Generated on {new Date(report.createdAt).toLocaleDateString()}
                    </p>
                    <p className="text-sm text-gray-600">
                      Submission Date: {new Date(report.submissionDate).toLocaleDateString()}
                    </p>
                  </div>
                  
                  <div className="mb-4 p-4 bg-gray-50 rounded-md whitespace-pre-line">
                    {report.content}
                  </div>
                  
                  <div className="flex justify-end">
                    <Button variant="outline">
                      Export Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </CustomLayout>
  );
};

export default ReportsPage;
