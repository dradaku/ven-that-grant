
// This file contains global API configuration
// In a production environment, this would be set via environment variables
// For this demo, we're hard-coding the API key here

export const VENICE_API_KEY = "your-venice-api-key-here"; // Replace with your actual Venice AI API key

export function hasValidApiKey(): boolean {
  return VENICE_API_KEY && VENICE_API_KEY.length > 0 && VENICE_API_KEY !== "your-venice-api-key-here";
}
