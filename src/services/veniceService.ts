
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

// Sample grant data for demonstration purposes
const SAMPLE_GRANTS: GrantResult[] = [
  {
    id: 1,
    title: "Arts Innovation Grant (SAMPLE)",
    organization: "National Endowment for the Arts",
    amount: "$25,000 - $50,000",
    deadline: "2025-06-30",
    description: "Sample grant for innovative projects that push the boundaries of artistic expression and engage communities in new ways.",
    match_score: 92,
    url: "https://example.com/grant1",
    type: "government",
    country: "US"
  },
  {
    id: 2,
    title: "Environmental Research Fellowship (SAMPLE)",
    organization: "Green Future Foundation",
    amount: "$75,000",
    deadline: "2025-05-15",
    description: "Sample fellowship supporting cutting-edge research on climate change mitigation strategies and sustainable technologies.",
    match_score: 85,
    url: "https://example.com/grant2",
    type: "private",
    country: "US"
  },
  {
    id: 3,
    title: "Medical Innovation Accelerator (SAMPLE)",
    organization: "Healthcare Advancement Trust",
    amount: "$100,000 - $250,000",
    deadline: "2025-07-22",
    description: "Sample funding for pioneering medical research and healthcare solutions that improve patient outcomes and reduce costs.",
    match_score: 78,
    url: "https://example.com/grant3",
    type: "private",
    country: "US"
  },
  {
    id: 4,
    title: "Creative Industries Development Grant (SAMPLE)",
    organization: "Arts Council UK",
    amount: "£15,000 - £30,000",
    deadline: "2025-08-10",
    description: "Sample grant for emerging creative businesses to develop innovative products, services or experiences.",
    match_score: 91,
    url: "https://example.com/grant4",
    type: "government",
    country: "UK"
  },
  {
    id: 5,
    title: "Community Heritage Preservation Fund (SAMPLE)",
    organization: "UK Heritage Trust",
    amount: "£50,000",
    deadline: "2025-09-01",
    description: "Sample fund for projects preserving and celebrating local history and cultural heritage across British communities.",
    match_score: 82,
    url: "https://example.com/grant5",
    type: "private",
    country: "UK"
  }
];

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
    
    // For demonstration purposes, return sample grants instead of making a real API call
    // Simulate filtering based on the options
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
    
    let results = [...SAMPLE_GRANTS];
    
    // Apply filters based on options
    if (options?.includeGovernment === false) {
      results = results.filter(grant => grant.type !== "government");
    }
    
    if (options?.includePrivate === false) {
      results = results.filter(grant => grant.type !== "private");
    }
    
    // Simple keyword matching for demo (in a real implementation this would be handled by the API)
    if (query) {
      const lowercaseQuery = query.toLowerCase();
      results = results.filter(grant => 
        grant.title.toLowerCase().includes(lowercaseQuery) || 
        grant.description.toLowerCase().includes(lowercaseQuery) ||
        grant.organization.toLowerCase().includes(lowercaseQuery)
      );
    }
    
    return results;
    
  } catch (error) {
    console.error("Venice AI API Error:", error);
    throw error;
  }
}
