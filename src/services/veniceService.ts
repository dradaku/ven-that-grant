// Service for the Venice AI API
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
  // Check if API key is available
  if (!hasValidApiKey()) {
    throw new Error("Venice AI API key is missing or invalid. Please update the apiConfig.ts file with your API key.");
  }
  
  try {
    console.log("Searching grants with Venice AI API", { query, ...options });
    
    // Build request URL
    const apiUrl = "https://api.veniceai.com/v1/grants/search"; // Replace with actual Venice AI API endpoint
    
    // Build request body
    const requestBody = {
      query,
      description: options?.description || "",
      category: options?.category || "",
      filters: {
        includeGovernment: options?.includeGovernment !== false, // Default to true
        includePrivate: options?.includePrivate !== false, // Default to true
      }
    };
    
    // Make the actual API call
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
        `Venice AI API Error (${response.status}): ${
          errorData?.message || response.statusText || "Unknown error"
        }`
      );
    }
    
    const data = await response.json();
    
    // In case the API response structure is different, you might need to map it
    // to match our expected GrantResult interface
    // This is just a placeholder assuming the API returns data we can directly use
    return data.results || data.grants || data;
    
  } catch (error) {
    console.error("Venice AI API Error:", error);
    throw error;
  }
}
