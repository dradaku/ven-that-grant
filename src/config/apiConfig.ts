
// This file contains global API configuration
// In a production environment, this would be set via environment variables
// For this demo, we're retrieving the API key from localStorage if available

// Get API key from localStorage or use placeholder
export const getVeniceApiKey = (): string => {
  const storedKey = localStorage.getItem('veniceApiKey');
  return storedKey || "vHr1A25Y7V8ObYcGwqHTJOuvFKnOmFtyd-eapHxdBZ"; // Placeholder key
};

export function hasValidApiKey(): boolean {
  const apiKey = getVeniceApiKey();
  const placeholderKey = "vHr1A25Y7V8ObYcGwqHTJOuvFKnOmFtyd-eapHxdBZ";
  // Check if the API key exists, is not empty, and is not the placeholder text
  return Boolean(apiKey) && 
         apiKey.length > 0 && 
         String(apiKey) !== String(placeholderKey);
}

// Function to set the API key in localStorage
export function setVeniceApiKey(apiKey: string): void {
  localStorage.setItem('veniceApiKey', apiKey);
}
