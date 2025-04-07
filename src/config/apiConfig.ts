
// This file contains global API configuration
// In a production environment, this would be set via environment variables
// For this demo, we're hard-coding the API key here

export const VENICE_API_KEY = "vHr1A25Y7V8ObYcGwqHTJOuvFKnOmFtyd-eapHxdBZ"; // Replace with your actual Venice AI API key

export function hasValidApiKey(): boolean {
  const placeholderKey = "vHr1A25Y7V8ObYcGwqHTJOuvFKnOmFtyd-eapHxdBZ";
  // Check if the API key exists, is not empty, and is not the placeholder text
  return Boolean(VENICE_API_KEY) && 
         VENICE_API_KEY.length > 0 && 
         String(VENICE_API_KEY) !== String(placeholderKey);
}
