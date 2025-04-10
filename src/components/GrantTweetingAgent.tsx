
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Twitter, Bot, AlertCircle, CheckCircle } from 'lucide-react';
import { ElizaAgentConfig, ElizaAgentStatus, createGrantTweetingAgent, getAgentStatus } from '@/services/elizaOsService';
import { GrantResult } from '@/services/veniceService';

interface GrantTweetingAgentProps {
  onAgentCreated?: (agentId: string) => void;
  latestGrants?: GrantResult[];
}

const GrantTweetingAgent: React.FC<GrantTweetingAgentProps> = ({ 
  onAgentCreated, 
  latestGrants = [] 
}) => {
  const { toast } = useToast();
  const [isCreating, setIsCreating] = useState(false);
  const [agentId, setAgentId] = useState<string | null>(null);
  const [agentStatus, setAgentStatus] = useState<ElizaAgentStatus | null>(null);
  const [agentConfig, setAgentConfig] = useState<ElizaAgentConfig>({
    name: "GrantScout",
    description: "An AI agent that tweets about new grant opportunities",
    persona: "Helpful grant expert who shares funding opportunities",
    grantTypes: ["research", "innovation", "arts", "health", "tech"],
    tweetStyle: "Professional with a touch of enthusiasm",
    isActive: true
  });

  const handleConfigChange = (field: keyof ElizaAgentConfig, value: any) => {
    setAgentConfig(prev => ({ ...prev, [field]: value }));
  };

  const handleCreateAgent = async () => {
    setIsCreating(true);
    try {
      const result = await createGrantTweetingAgent(agentConfig);
      setAgentId(result.agentId);
      
      // Get initial status
      const status = await getAgentStatus(result.agentId);
      setAgentStatus(status);
      
      if (onAgentCreated) {
        onAgentCreated(result.agentId);
      }
      
      toast({
        title: "Agent Created Successfully",
        description: "Your grant tweeting agent is now active and will tweet about new grants",
      });
    } catch (error) {
      console.error("Error creating agent:", error);
      toast({
        title: "Agent Creation Failed",
        description: "There was a problem creating your Twitter agent",
        variant: "destructive",
      });
    } finally {
      setIsCreating(false);
    }
  };

  const refreshStatus = async () => {
    if (!agentId) return;
    
    try {
      const status = await getAgentStatus(agentId);
      setAgentStatus(status);
    } catch (error) {
      console.error("Error refreshing status:", error);
      toast({
        title: "Status Update Failed",
        description: "Unable to get the latest agent status",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-brand-purple" />
          Venice x ElizaOS Twitter Agent
        </CardTitle>
        <CardDescription>
          Create an AI agent that automatically tweets about new grants
        </CardDescription>
      </CardHeader>
      
      <CardContent>
        {!agentId ? (
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="agent-name">Agent Name</Label>
              <Input 
                id="agent-name" 
                value={agentConfig.name} 
                onChange={(e) => handleConfigChange('name', e.target.value)} 
                placeholder="e.g., GrantScout" 
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="agent-persona">Agent Persona</Label>
              <Textarea 
                id="agent-persona" 
                value={agentConfig.persona} 
                onChange={(e) => handleConfigChange('persona', e.target.value)} 
                placeholder="Describe how your agent should act and tweet"
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="tweet-style">Tweet Style</Label>
              <Input 
                id="tweet-style" 
                value={agentConfig.tweetStyle} 
                onChange={(e) => handleConfigChange('tweetStyle', e.target.value)} 
                placeholder="Professional, casual, enthusiastic, etc."
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch 
                id="agent-active" 
                checked={agentConfig.isActive} 
                onCheckedChange={(checked) => handleConfigChange('isActive', checked)} 
              />
              <Label htmlFor="agent-active">Activate agent immediately</Label>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
              <div className="font-medium">Agent Status</div>
              <div className="flex items-center gap-2">
                {agentStatus?.isConnected ? (
                  <>
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span className="text-green-600">Active</span>
                  </>
                ) : (
                  <>
                    <AlertCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-orange-600">Disconnected</span>
                  </>
                )}
              </div>
            </div>
            
            {agentStatus?.lastTweet && (
              <div className="border rounded-md p-4">
                <div className="text-sm font-medium mb-2">Latest Tweet</div>
                <div className="bg-gray-50 p-3 rounded-md flex gap-3">
                  <Twitter className="h-5 w-5 text-blue-400 flex-shrink-0 mt-1" />
                  <div>
                    <p className="text-gray-800">{agentStatus.lastTweet}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(agentStatus.lastTweetTime!).toLocaleString()}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-500 mt-2">
                  Total tweets sent: {agentStatus.totalTweetsSent}
                </div>
              </div>
            )}
            
            {latestGrants.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-2">Upcoming Tweets</h4>
                <div className="space-y-2">
                  {latestGrants.slice(0, 2).map(grant => (
                    <div key={grant.id} className="border rounded p-2 text-sm">
                      <div className="font-medium">{grant.title}</div>
                      <div className="text-gray-600 text-xs">Will be tweeted soon</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-between">
        {!agentId ? (
          <Button 
            onClick={handleCreateAgent} 
            className="w-full" 
            disabled={isCreating}
          >
            <Twitter className="h-4 w-4 mr-2" />
            {isCreating ? "Creating Agent..." : "Create Twitter Agent"}
          </Button>
        ) : (
          <div className="w-full flex gap-2">
            <Button variant="outline" className="flex-1" onClick={refreshStatus}>
              Refresh Status
            </Button>
            <Button variant="default" className="flex-1">
              <Twitter className="h-4 w-4 mr-2" />
              View Tweets
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default GrantTweetingAgent;
