
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
    
  } catch (error) {
    console.error("VenThatGrant AI Error:", error);
    throw error;
  }
}
