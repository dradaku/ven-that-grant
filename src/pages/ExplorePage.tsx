
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import GrantSearchForm from '@/components/GrantSearchForm';
import GrantResultCard from '@/components/GrantResultCard';
import ApiKeyInput from '@/components/ApiKeyInput';
import { searchGrants, GrantResult } from '@/services/veniceService';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';
import { RefreshCw, Filter } from 'lucide-react';

const ExplorePage: React.FC = () => {
  const [apiKey, setApiKey] = useState('');
  const [hasApiKey, setHasApiKey] = useState(false);
  const [searchResults, setSearchResults] = useState<GrantResult[]>([]);
  const [filteredResults, setFilteredResults] = useState<GrantResult[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [minMatchScore, setMinMatchScore] = useState(70);
  const [isLoading, setIsLoading] = useState(false);

  const handleApiKeySubmit = (key: string) => {
    setApiKey(key);
    setHasApiKey(true);
  };

  const handleSearch = async (results: GrantResult[]) => {
    setSearchResults(results);
    setFilteredResults(results);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    if (value === 'all') {
      setFilteredResults(searchResults);
    } else {
      setFilteredResults(searchResults.filter(grant => grant.type === value));
    }
  };

  const handleScoreFilterChange = (value: number[]) => {
    const score = value[0];
    setMinMatchScore(score);
    setFilteredResults(searchResults.filter(grant => grant.match_score >= score));
  };

  const resetFilters = () => {
    setActiveTab('all');
    setMinMatchScore(70);
    setFilteredResults(searchResults);
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">Explore Grants</h1>
        <p className="text-xl text-gray-600 mb-8">
          Find the perfect funding opportunities for your research or creative project
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            {!hasApiKey ? (
              <ApiKeyInput onApiKeySubmit={handleApiKeySubmit} />
            ) : (
              <GrantSearchForm 
                apiKey={apiKey} 
                onSearch={handleSearch} 
              />
            )}
            
            {searchResults.length > 0 && (
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
                  <Tabs defaultValue="all" value={activeTab} onValueChange={handleTabChange}>
                    <TabsList className="w-full">
                      <TabsTrigger value="all" className="flex-1">All</TabsTrigger>
                      <TabsTrigger value="government" className="flex-1">Government</TabsTrigger>
                      <TabsTrigger value="private" className="flex-1">Private</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
              </div>
            )}
          </div>
          
          <div className="lg:col-span-2">
            {!hasApiKey && (
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
                <h3 className="text-xl font-medium mb-2">Enter Your API Key to Get Started</h3>
                <p className="text-gray-600 mb-4">
                  Provide your Venice AI API key to start searching for grants that match your research interests.
                </p>
              </div>
            )}
            
            {hasApiKey && searchResults.length === 0 && (
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
                <h3 className="text-xl font-medium mb-2">Ready to Find Your Perfect Grant</h3>
                <p className="text-gray-600 mb-4">
                  Use the search form to discover grants that match your research or creative project.
                </p>
              </div>
            )}
            
            {searchResults.length > 0 && (
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
