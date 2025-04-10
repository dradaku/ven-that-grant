
// Service for the Venice AI API
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
  try {
    console.log("Searching grants with Venice AI API", { query, ...options });
    
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
      }
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
    console.error("Venice AI API Error:", error);
    throw error; // Rethrow the error instead of falling back to sample data
  }
}
