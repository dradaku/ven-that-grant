import React, { useState, useEffect } from 'react';
import Layout from '@/components/Layout';
import GrantSearchForm from '@/components/GrantSearchForm';
import GrantResultCard from '@/components/GrantResultCard';
import { searchGrants, GrantResult } from '@/services/veniceService';
import { hasValidApiKey } from '@/config/apiConfig';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { RefreshCw, Filter, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useSearchParams } from 'react-router-dom';
import { Alert, AlertDescription } from '@/components/ui/alert';

const ExplorePage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<GrantResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<GrantResult[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [activeCountry, setActiveCountry] = useState('all');
  const [minMatchScore, setMinMatchScore] = useState(70);
  const [isLoading, setIsLoading] = useState(false);
  const [usingSampleData, setUsingSampleData] = useState(false);
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const queryParam = searchParams.get('query');
    if (queryParam) {
      performSearch(queryParam);
    }
  }, [searchParams]);

  const performSearch = async (query: string) => {
    setIsLoading(true);
    setUsingSampleData(false);
    
    try {
      const results = await searchGrants(query);
      setSearchResults(results);
      setFilteredResults(results);
      
      toast({
        title: "Search Complete",
        description: `Found ${results.length} grants matching your criteria`,
      });
      
      const sampleIds = [1, 2, 3, 4, 5, 6, 7, 8];
      const hasSampleId = results.some(grant => sampleIds.includes(grant.id));
      setUsingSampleData(hasSampleId);
      
    } catch (error) {
      toast({
        title: "Search Failed",
        description: error instanceof Error ? error.message : "An error occurred while searching for grants. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (results: GrantResult[]) => {
    setSearchResults(results);
    setFilteredResults(results);
    
    const sampleIds = [1, 2, 3, 4, 5, 6, 7, 8];
    const hasSampleId = results.some(grant => sampleIds.includes(grant.id));
    setUsingSampleData(hasSampleId);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    applyFilters(value, activeCountry, minMatchScore);
  };

  const handleCountryChange = (value: string) => {
    setActiveCountry(value);
    applyFilters(activeTab, value, minMatchScore);
  };

  const handleScoreFilterChange = (value: number[]) => {
    const score = value[0];
    setMinMatchScore(score);
    applyFilters(activeTab, activeCountry, score);
  };

  const applyFilters = (grantType: string, country: string, score: number) => {
    let results = searchResults.filter(grant => grant.match_score >= score);
    
    if (grantType !== 'all') {
      results = results.filter(grant => grant.type === grantType);
    }
    
    if (country !== 'all') {
      results = results.filter(grant => grant.country === country);
    }
    
    setFilteredResults(results);
  };

  const resetFilters = () => {
    setActiveTab('all');
    setActiveCountry('all');
    setMinMatchScore(70);
    setFilteredResults(searchResults);
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">Explore Grants</h1>
        <p className="text-xl text-gray-600 mb-6">
          Find the perfect funding opportunities for your research or creative project
        </p>
        
        {usingSampleData && (
          <Alert className="mb-6 bg-blue-50 border-blue-200">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-700">
              Using sample grant data. The Venice AI API connection is unavailable. Results shown are for demonstration purposes.
            </AlertDescription>
          </Alert>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <GrantSearchForm onSearch={handleSearch} />
            
            <div className="bg-white border rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-medium flex items-center">
                  <Filter className="h-4 w-4 mr-2" />
                  Filters
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetFilters}
                  className="text-xs"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Reset
                </Button>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="match-score">Minimum Match Score: {minMatchScore}%</Label>
                <Slider
                  id="match-score"
                  defaultValue={[70]}
                  max={100}
                  min={50}
                  step={5}
                  value={[minMatchScore]}
                  onValueChange={handleScoreFilterChange}
                />
              </div>
              
              <div className="pt-2">
                <Label className="mb-2 block">Grant Type</Label>
                <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
                  <TabsList className="w-full">
                    <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                    <TabsTrigger value="government" className="flex-1">Government</TabsTrigger>
                    <TabsTrigger value="private" className="flex-1">Private</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
              
              <div className="pt-2">
                <Label className="mb-2 block">Country</Label>
                <Tabs defaultValue="all" value={activeCountry} onValueChange={handleCountryChange}>
                  <TabsList className="w-full">
                    <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                    <TabsTrigger value="US" className="flex-1">US</TabsTrigger>
                    <TabsTrigger value="UK" className="flex-1">UK</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </div>
          </div>
          
          <div className="lg:col-span-2">
            {searchResults.length === 0 && !isLoading && (
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
                <h3 className="text-xl font-medium mb-2">Ready to Find Your Perfect Grant</h3>
                <p className="text-gray-600 mb-4">
                  Use the search form to discover grants that match your research or creative project.
                </p>
              </div>
            )}
            
            {isLoading && (
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
                <h3 className="text-xl font-medium mb-2">Searching for Grants</h3>
                <p className="text-gray-600 mb-4">
                  Looking for the perfect grants that match your criteria...
                </p>
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-brand-purple"></div>
                </div>
              </div>
            )}
            
            {searchResults.length > 0 && !isLoading && (
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">
                    {filteredResults.length} {filteredResults.length === 1 ? 'Result' : 'Results'}
                  </h2>
                </div>
                
                <div className="space-y-6">
                  {filteredResults.length > 0 ? (
                    filteredResults.map(grant => (
                      <GrantResultCard key={grant.id} grant={grant} />
                    ))
                  ) : (
                    <div className="bg-gray-50 rounded-lg border border-gray-200 p-6 text-center">
                      <p className="text-gray-600">
                        No grants match your current filters. Try adjusting your criteria.
                      </p>
                      <Button 
                        variant="link" 
                        onClick={resetFilters} 
                        className="mt-2"
                      >
                        Reset Filters
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ExplorePage;
