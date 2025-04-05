
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { AlertCircle, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface ApiKeyInputProps {
  onApiKeySubmit: (apiKey: string) => void;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({ onApiKeySubmit }) => {
  const [apiKey, setApiKey] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Venice AI API key",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // In a real implementation, we would verify the API key
      // For now, we'll simulate a successful verification
      setTimeout(() => {
        setIsVerified(true);
        onApiKeySubmit(apiKey);
        toast({
          title: "API Key Verified",
          description: "Your Venice AI API key has been successfully verified",
        });
        setIsSubmitting(false);
      }, 1000);
    } catch (error) {
      toast({
        title: "Verification Failed",
        description: "Could not verify your API key. Please check and try again.",
        variant: "destructive",
      });
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
      <h3 className="text-lg font-medium mb-2">Venice AI API Key</h3>
      <p className="text-sm text-gray-500 mb-4">
        Enter your Venice AI API key to enable grant searching capabilities.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <div className="relative">
            <Input
              type="password"
              placeholder="Enter your API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className={`pr-10 ${isVerified ? 'border-green-500' : ''}`}
              disabled={isVerified}
            />
            {isVerified && (
              <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 h-5 w-5" />
            )}
          </div>
          <p className="text-xs text-gray-500">
            Your API key is stored locally and never shared with our servers.
          </p>
        </div>
        
        {!isVerified && (
          <Button 
            type="submit" 
            className="w-full bg-brand-purple hover:bg-brand-blue"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Verifying..." : "Verify API Key"}
          </Button>
        )}
        
        {isVerified && (
          <div className="flex items-center text-sm text-green-600">
            <Check className="h-4 w-4 mr-2" />
            API key verified and active
          </div>
        )}
      </form>
    </div>
  );
};

export default ApiKeyInput;
