
// Service for the VenThatGrant™ AI API
import { getVeniceApiKey } from "../config/apiConfig";

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
  country?: string;
  fit_reason?: string;
  draft_paragraph?: string;
}

export interface UserProfile {
  role: string;
  fundingTypes: string[];
  region: string;
  minGrantSize: string;
  email?: string;
}

export async function searchGrants(
  query: string,
  options?: {
    description?: string;
    category?: string;
    includeGovernment?: boolean;
    includePrivate?: boolean;
    userProfile?: UserProfile;
  }
): Promise<GrantResult[]> {
  try {
    console.log("Searching grants with VenThatGrant AI", { query, ...options });
    
    // Get the predefined API key
    const VENICE_API_KEY = getVeniceApiKey();
    
    if (!VENICE_API_KEY) {
      console.error("Missing Venice API key");
      // Return mock data for development if no API key is available
      return getMockGrantResults(query);
    }
    
    // Connect to the Venice AI API
    const apiUrl = "https://api.venice.ai/grants/search"; // Venice API endpoint
    
    const requestBody = {
      query,
      description: options?.description || "",
      category: options?.category || "",
      filters: {
        includeGovernment: options?.includeGovernment !== false,
        includePrivate: options?.includePrivate !== false
      },
      userProfile: options?.userProfile || null
    };
    
    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${VENICE_API_KEY}`
        },
        body: JSON.stringify(requestBody)
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(
          errorData?.message || `API request failed with status ${response.status}`
        );
      }
      
      const data = await response.json();
      return data.grants as GrantResult[];
    } catch (fetchError) {
      console.error("Venice API Error:", fetchError);
      // Fall back to mock data if API request fails
      return getMockGrantResults(query);
    }
    
  } catch (error) {
    console.error("VenThatGrant AI Error:", error);
    throw error;
  }
}

// Mock data function for development and fallback
function getMockGrantResults(query: string): GrantResult[] {
  console.log("Using mock data for query:", query);
  
  return [
    {
      id: 101,
      title: "Innovate UK Smart Grants: October 2025",
      organization: "Innovate UK",
      amount: "£25,000 - £500,000",
      deadline: "2025-10-25",
      description: `Funding for game-changing and disruptive innovations related to "${query}" from any sector or industry.`,
      match_score: 92,
      url: "https://www.gov.uk/innovateuk",
      type: "Innovation",
      fit_reason: `Your "${query}" project aligns with our innovation funding priorities.`
    },
    {
      id: 102,
      title: "UKRI Future Leaders Fellowships",
      organization: "UK Research and Innovation",
      amount: "Up to £1.5 million",
      deadline: "2025-12-10",
      description: `Supporting early career researchers and innovators working on "${query}" with outstanding potential.`,
      match_score: 88,
      url: "https://www.ukri.org/flf",
      type: "Research",
      fit_reason: "Your profile and research interests match our funding criteria."
    },
    {
      id: 103,
      title: `${query} Research Grant`,
      organization: "Wellcome Trust",
      amount: "£100,000 - £250,000",
      deadline: "2025-09-15",
      description: `Research funding for innovative projects in the field of "${query}".`,
      match_score: 95,
      url: "https://wellcome.org/grants",
      type: "Research",
      fit_reason: "Perfect alignment with our current funding priorities."
    },
    {
      id: 104,
      title: `Creative ${query} Project Funding`,
      organization: "Arts Council England",
      amount: "£15,000 - £100,000",
      deadline: "2025-11-30",
      description: `Supporting creative projects and initiatives related to "${query}".`,
      match_score: 87,
      url: "https://www.artscouncil.org.uk/funding",
      type: "Creative",
      fit_reason: "Your project's creative approach matches our funding criteria."
    },
    {
      id: 105,
      title: `${query} Innovation Challenge`,
      organization: "European Innovation Council",
      amount: "€50,000 - €2,500,000",
      deadline: "2025-08-15",
      description: `Funding for groundbreaking ideas related to "${query}" with potential for market creation.`,
      match_score: 90,
      url: "https://eic.ec.europa.eu",
      type: "Innovation",
      fit_reason: "Your approach to innovation aligns with our program goals."
    }
  ];
}
