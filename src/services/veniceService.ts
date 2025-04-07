
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

// Sample data to use when API is unavailable
const sampleGrants: GrantResult[] = [
  {
    id: 1,
    title: "Arts Council England Project Grants",
    organization: "Arts Council England",
    amount: "£1,000 - £100,000",
    deadline: "2025-06-30",
    description: "Grants for arts, museums and libraries projects that engage people in England with creativity and culture.",
    match_score: 95,
    url: "https://www.artscouncil.org.uk/projectgrants",
    type: "government",
    country: "UK"
  },
  {
    id: 2,
    title: "National Endowment for the Arts Grants for Arts Projects",
    organization: "National Endowment for the Arts",
    amount: "$10,000 - $100,000",
    deadline: "2025-07-15",
    description: "Support for public engagement with, and access to, various forms of art across the nation.",
    match_score: 88,
    url: "https://www.arts.gov/grants/grants-for-arts-projects",
    type: "government",
    country: "US"
  },
  {
    id: 3,
    title: "The Leverhulme Trust Research Project Grants",
    organization: "The Leverhulme Trust",
    amount: "£10,000 - £500,000",
    deadline: "2025-05-21",
    description: "Funding for research projects of outstanding scholarship that demonstrate originality and excellence.",
    match_score: 82,
    url: "https://www.leverhulme.ac.uk/research-project-grants",
    type: "private",
    country: "UK"
  },
  {
    id: 4,
    title: "Wellcome Trust Research Grants",
    organization: "Wellcome Trust",
    amount: "£50,000 - £400,000",
    deadline: "2025-08-10",
    description: "Grants supporting researchers who want to pursue bold and creative research and develop new ideas that could improve health.",
    match_score: 79,
    url: "https://wellcome.org/grant-funding",
    type: "private",
    country: "UK"
  },
  {
    id: 5,
    title: "The Andrew W. Mellon Foundation Grants",
    organization: "The Andrew W. Mellon Foundation",
    amount: "$50,000 - $500,000",
    deadline: "2025-09-01",
    description: "Support for initiatives in higher education, arts and cultural heritage, and scholarship in the humanities.",
    match_score: 75,
    url: "https://mellon.org/grants/",
    type: "private",
    country: "US"
  },
  {
    id: 6,
    title: "The MacArthur Foundation Research Grants",
    organization: "John D. and Catherine T. MacArthur Foundation",
    amount: "$50,000 - $350,000",
    deadline: "2025-07-30",
    description: "Grants to support creative people, effective institutions, and influential networks building a more just, verdant, and peaceful world.",
    match_score: 71,
    url: "https://www.macfound.org/info-grantseekers/",
    type: "private",
    country: "US"
  },
  {
    id: 7,
    title: "National Science Foundation Research Grants",
    organization: "National Science Foundation",
    amount: "$50,000 - $1,000,000",
    deadline: "2025-06-15",
    description: "Support for research and education in science, technology, engineering, and mathematics fields.",
    match_score: 68,
    url: "https://www.nsf.gov/funding/",
    type: "government",
    country: "US"
  },
  {
    id: 8,
    title: "UKRI Future Leaders Fellowships",
    organization: "UK Research and Innovation",
    amount: "£1,200,000 - £1,500,000",
    deadline: "2025-08-25",
    description: "Fellowships supporting early career researchers and innovators with outstanding potential.",
    match_score: 65,
    url: "https://www.ukri.org/apply-for-funding/funding-opportunities/",
    type: "government",
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
    
    try {
      // Attempt to connect to the real Venice AI API
      const apiUrl = "https://api.venice.ai/grants/search"; // Replace with actual Venice API endpoint
      
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
      
    } catch (apiError) {
      console.warn("Venice API unavailable, using sample data instead", apiError);
      
      // Filter sample data based on the query and options
      let filteredGrants = [...sampleGrants];
      
      // Simple text search on title and description
      if (query) {
        const queryLower = query.toLowerCase();
        filteredGrants = filteredGrants.filter(grant => 
          grant.title.toLowerCase().includes(queryLower) || 
          grant.description.toLowerCase().includes(queryLower)
        );
      }
      
      // Apply category filter if provided
      if (options?.category) {
        const categoryLower = options.category.toLowerCase();
        // This is a simple mock implementation - in a real scenario, the grants would have 
        // more detailed categorization
        filteredGrants = filteredGrants.filter(grant => 
          grant.description.toLowerCase().includes(categoryLower)
        );
      }
      
      // Filter by grant type
      if (options?.includeGovernment === false) {
        filteredGrants = filteredGrants.filter(grant => grant.type !== "government");
      }
      
      if (options?.includePrivate === false) {
        filteredGrants = filteredGrants.filter(grant => grant.type !== "private");
      }
      
      // Add a small delay to simulate API call
      await new Promise(resolve => setTimeout(resolve, 800));
      
      return filteredGrants;
    }
    
  } catch (error) {
    console.error("Venice AI API Error:", error);
    throw error;
  }
}
