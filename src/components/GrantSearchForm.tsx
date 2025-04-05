
import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Search } from 'lucide-react';

interface GrantSearchFormProps {
  apiKey: string;
  onSearch: (results: any[]) => void;
}

const GrantSearchForm: React.FC<GrantSearchFormProps> = ({ apiKey, onSearch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [includeGovernment, setIncludeGovernment] = useState(true);
  const [includePrivate, setIncludePrivate] = useState(true);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!query.trim()) {
      toast({
        title: "Search Query Required",
        description: "Please enter a topic or keyword for your grant search",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // In a real implementation, we would call the Venice AI API here
      // For now, we'll simulate a search with mock data
      setTimeout(() => {
        const mockResults = [
          {
            id: 1,
            title: "Innovation in Climate Research Grant",
            organization: "National Science Foundation",
            amount: "$50,000 - $500,000",
            deadline: "2025-06-30",
            description: "Funding for innovative approaches to climate change research and mitigation strategies.",
            match_score: 92,
            url: "https://example.com/grant1",
            type: "government"
          },
          {
            id: 2,
            title: "Creative Arts Impact Initiative",
            organization: "Arts Foundation",
            amount: "$10,000 - $25,000",
            deadline: "2025-05-15",
            description: "Supporting creative projects that demonstrate social impact in local communities.",
            match_score: 87,
            url: "https://example.com/grant2",
            type: "private"
          },
          {
            id: 3,
            title: "Emerging Technology Research Program",
            organization: "Department of Energy",
            amount: "$100,000 - $1,000,000",
            deadline: "2025-07-22",
            description: "Funding for research in emerging technology fields with potential for energy innovation.",
            match_score: 85,
            url: "https://example.com/grant3",
            type: "government"
          }
        ];
        
        onSearch(mockResults);
        setIsLoading(false);
        
        toast({
          title: "Search Complete",
          description: `Found ${mockResults.length} grants matching your criteria`,
        });
      }, 2000);
    } catch (error) {
      toast({
        title: "Search Failed",
        description: "An error occurred while searching for grants. Please try again.",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Find Your Perfect Grant</CardTitle>
        <CardDescription>
          Describe your research or creative project to discover relevant funding opportunities
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="query">Keywords or Research Topic</Label>
            <Input
              id="query"
              placeholder="e.g., climate change, neural networks, documentary film"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="description">Project Description (Optional)</Label>
            <Textarea
              id="description"
              placeholder="Briefly describe your research or creative project..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
            />
            <p className="text-xs text-gray-500">
              A more detailed description helps our AI find more relevant grants
            </p>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="category">Category</Label>
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="science">Science & Research</SelectItem>
                <SelectItem value="arts">Arts & Culture</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="health">Health & Medicine</SelectItem>
                <SelectItem value="environment">Environment</SelectItem>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="social">Social Impact</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-4">
            <Label>Funding Sources</Label>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="government" 
                  checked={includeGovernment} 
                  onCheckedChange={(checked) => setIncludeGovernment(checked as boolean)} 
                />
                <label htmlFor="government" className="text-sm">
                  Government Grants (NSF, NIH, NEA, etc.)
                </label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="private" 
                  checked={includePrivate} 
                  onCheckedChange={(checked) => setIncludePrivate(checked as boolean)} 
                />
                <label htmlFor="private" className="text-sm">
                  Private Foundations & Organizations
                </label>
              </div>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full bg-brand-purple hover:bg-brand-blue"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="mr-2 h-4 w-4" />
                Search Grants
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default GrantSearchForm;
