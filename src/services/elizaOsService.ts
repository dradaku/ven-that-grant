
// Service for ElizaOS - Venice AI Agent Integration
import { getVeniceApiKey } from "../config/apiConfig";
import { GrantResult } from "./veniceService";

export interface ElizaAgentConfig {
  name: string;
  description: string;
  persona: string;
  grantTypes: string[];
  tweetStyle: string;
  isActive: boolean;
}

export interface ElizaAgentStatus {
  isConnected: boolean;
  lastTweet?: string;
  lastTweetTime?: string;
  totalTweetsSent: number;
}

// This would connect to ElizaOS in a production environment
// For the demo, we'll simulate the connection and response
export async function createGrantTweetingAgent(
  config: ElizaAgentConfig
): Promise<{ agentId: string; status: string }> {
  try {
    console.log("Creating ElizaOS Grant Tweeting Agent", config);
    
    // Get the predefined API key (would be used in actual API call)
    const VENICE_API_KEY = getVeniceApiKey();
    
    // This would be a real API call in production
    // const apiUrl = "https://api.elizaos.com/agents/create";
    
    // Simulate API response
    return {
      agentId: `grant-agent-${Date.now()}`,
      status: "active"
    };
  } catch (error) {
    console.error("ElizaOS Agent Creation Error:", error);
    throw error;
  }
}

export async function getAgentStatus(agentId: string): Promise<ElizaAgentStatus> {
  try {
    console.log("Checking ElizaOS Agent Status", { agentId });
    
    // Simulate API response
    return {
      isConnected: true,
      lastTweet: "Just found a new £50k grant from Innovate UK for AI startups! Deadline: Nov 15, 2025. #GrantFunding #InnovateUK",
      lastTweetTime: new Date().toISOString(),
      totalTweetsSent: Math.floor(Math.random() * 20) + 1
    };
  } catch (error) {
    console.error("ElizaOS Agent Status Error:", error);
    throw error;
  }
}

export async function simulateTweetAboutGrant(
  agentId: string, 
  grant: GrantResult
): Promise<{ success: boolean; tweetUrl?: string }> {
  try {
    console.log("Simulating tweet about grant", { agentId, grant });
    
    // Format a tweet about the grant
    const tweetText = `Just discovered: ${grant.title} from ${grant.organization}! 
    Amount: ${grant.amount}. Deadline: ${new Date(grant.deadline).toLocaleDateString()}. 
    Great for #${grant.type.replace(/\s+/g, '')} projects! #GrantFunding`;
    
    console.log("Tweet would be:", tweetText);
    
    // Simulate successful tweet
    return {
      success: true,
      tweetUrl: `https://twitter.com/VenThatGrant/status/${Date.now()}`
    };
  } catch (error) {
    console.error("ElizaOS Tweet Error:", error);
    return { success: false };
  }
}
