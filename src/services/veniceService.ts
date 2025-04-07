// This is a mock service for the Venice AI API
// In a real implementation, this would make actual API calls
import { VENICE_API_KEY, hasValidApiKey } from "../config/apiConfig";

export interface GrantResult {
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

export async function searchGrants(
  query: string,
  options?: {
    description?: string;
    category?: string;
    includeGovernment?: boolean;
    includePrivate?: boolean;
  }
): Promise<GrantResult[]> {
  // Check if API key is available
  if (!hasValidApiKey()) {
    throw new Error("Venice AI API key is missing or invalid. Please update the apiConfig.ts file with your API key.");
  }
  
  // In a real implementation, this would call the Venice AI API
  // For now, we'll return mock data
  console.log("Searching grants with Venice AI API", { apiKey: "***Hidden***", query, ...options });
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  return [
    {
      id: 1,
      title: "Innovation in Climate Research Grant",
      organization: "National Science Foundation",
      amount: "$50,000 - $500,000",
      deadline: "2025-06-30",
      description: "Funding for innovative approaches to climate change research and mitigation strategies.",
      match_score: 92,
      url: "https://example.com/grant1",
      type: "government"
    },
    {
      id: 2,
      title: "Creative Arts Impact Initiative",
      organization: "Arts Foundation",
      amount: "$10,000 - $25,000",
      deadline: "2025-05-15",
      description: "Supporting creative projects that demonstrate social impact in local communities.",
      match_score: 87,
      url: "https://example.com/grant2",
      type: "private"
    },
    {
      id: 3,
      title: "Emerging Technology Research Program",
      organization: "Department of Energy",
      amount: "$100,000 - $1,000,000",
      deadline: "2025-07-22",
      description: "Funding for research in emerging technology fields with potential for energy innovation.",
      match_score: 85,
      url: "https://example.com/grant3",
      type: "government"
    },
    {
      id: 4,
      title: "Community Health Initiative Grant",
      organization: "Robert Wood Johnson Foundation",
      amount: "$25,000 - $100,000",
      deadline: "2025-08-15",
      description: "Supporting innovative approaches to improving community health outcomes.",
      match_score: 78,
      url: "https://example.com/grant4",
      type: "private"
    },
    {
      id: 5,
      title: "Digital Humanities Advancement Grant",
      organization: "National Endowment for the Humanities",
      amount: "$10,000 - $50,000",
      deadline: "2025-06-10",
      description: "Funding for projects that enhance scholarly research, teaching, and public programming in the humanities through digital methods.",
      match_score: 76,
      url: "https://example.com/grant5",
      type: "government"
    }
  ];
}

// No longer need to verify API key as it's globally configured
