import React, { useState, useEffect } from 'react';
import CustomLayout from '@/components/CustomLayout';
import GrantFinderForm from '@/components/GrantFinderForm';
import GrantResultCard from '@/components/GrantResultCard';
import { GrantResult } from '@/services/veniceService';
import { useToast } from '@/hooks/use-toast';
import { useSearchParams } from 'react-router-dom';

const ExplorePage: React.FC = () => {
  const [searchResults, setSearchResults] = useState<GrantResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const [searchParams] = useSearchParams();

  const handleSearch = async (results: GrantResult[]) => {
    setSearchResults(results);
  };

  return (
    <CustomLayout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-2">VenThatGrant™ — AI Grant Finder</h1>
        <p className="text-xl text-gray-600 mb-6">
          Built by researchers from Oxford University and Imperial College to match your unique profile with the perfect funding opportunities
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 space-y-6">
            <GrantFinderForm onSearch={handleSearch} />
          </div>
          
          <div className="lg:col-span-2">
            {searchResults.length === 0 && !isLoading && (
              <div className="bg-gray-50 rounded-lg border border-gray-200 p-8 text-center">
                <h3 className="text-xl font-medium mb-2">Ready to Find Your Perfect Grant</h3>
                <p className="text-gray-600 mb-4">
                  Complete your profile to discover up to 5 grants that match your background and interests.
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
                    {searchResults.length} {searchResults.length === 1 ? 'Result' : 'Results'} Matched to Your Profile
                  </h2>
                </div>
                
                <div className="space-y-6">
                  {searchResults.map(grant => (
                    <GrantResultCard key={grant.id} grant={grant} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </CustomLayout>
  );
};

export default ExplorePage;
