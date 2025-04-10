
// This file contains global API configuration
// In a production environment, this would be set via environment variables

// Predefined Venice API key for all users
const VENICE_API_KEY = "vHr1A25Y7V8ObYcGwqHTJOuvFKnOmFtyd-eapHxdBZ";

// Get API key - now returns the predefined key
export const getVeniceApiKey = (): string => {
  return VENICE_API_KEY;
};

// All users have a valid API key since it's predefined
export function hasValidApiKey(): boolean {
  return true;
}

// This function is kept for backward compatibility but now does nothing
export function setVeniceApiKey(apiKey: string): void {
  // No longer storing in localStorage as we use a predefined key
  console.log("API key setting is disabled. Using predefined key.");
}
