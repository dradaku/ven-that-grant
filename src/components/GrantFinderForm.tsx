
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Form, FormField, FormItem, FormLabel, FormControl, FormDescription } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Search } from 'lucide-react';
import { searchGrants, GrantResult, UserProfile } from '@/services/veniceService';

interface GrantFinderFormProps {
  onSearch: (results: GrantResult[]) => void;
}

type FormValues = {
  role: string;
  fundingTypes: string[];
  region: string;
  minGrantSize: string;
  email: string;
  query: string;
  description: string;
};

const roleOptions = [
  { value: 'researcher', label: 'Researcher' },
  { value: 'entrepreneur', label: 'Entrepreneur' },
  { value: 'creative', label: 'Creative Artist' },
  { value: 'web3', label: 'Web3 Founder' },
  { value: 'health', label: 'Health Innovator' },
];

const fundingOptions = [
  { id: 'research', label: 'Research' },
  { id: 'music', label: 'Music' },
  { id: 'web3', label: 'Web3' },
  { id: 'health', label: 'Health' },
  { id: 'creative', label: 'Creative Arts' },
  { id: 'innovation', label: 'Innovation' },
  { id: 'equity', label: 'Equity/Inclusion' },
];

const regionOptions = [
  { value: 'uk', label: 'UK' },
  { value: 'eu', label: 'EU' },
  { value: 'global', label: 'Global' },
  { value: 'africa', label: 'Africa' },
  { value: 'usa', label: 'USA' },
];

const grantSizeOptions = [
  { value: 'none', label: 'No minimum' },
  { value: '5k', label: '£5k+' },
  { value: '10k', label: '£10k+' },
  { value: '50k', label: '£50k+' },
];

const GrantFinderForm: React.FC<GrantFinderFormProps> = ({ onSearch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const form = useForm<FormValues>({
    defaultValues: {
      role: '',
      fundingTypes: [],
      region: '',
      minGrantSize: 'none',
      email: '',
      query: '',
      description: '',
    },
  });

  const onSubmit = async (values: FormValues) => {
    setIsLoading(true);
    
    const userProfile: UserProfile = {
      role: values.role,
      fundingTypes: values.fundingTypes,
      region: values.region,
      minGrantSize: values.minGrantSize,
      email: values.email || undefined,
    };
    
    try {
      const results = await searchGrants(
        values.query, 
        {
          description: values.description,
          userProfile: userProfile
        }
      );
      
      onSearch(results);
      
      toast({
        title: "Grant Search Complete",
        description: `Found ${results.length} grants matching your profile`,
      });
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>VenThatGrant™ AI Grant Finder</CardTitle>
        <CardDescription>
          Built by Dr. Adaku Jennifer Agwunobi to match you with the perfect grants
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>1. What best describes you?</FormLabel>
                  <FormControl>
                    <RadioGroup 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      {roleOptions.map((option) => (
                        <div key={option.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={option.value} id={`role-${option.value}`} />
                          <FormLabel htmlFor={`role-${option.value}`} className="font-normal">
                            {option.label}
                          </FormLabel>
                        </div>
                      ))}
                    </RadioGroup>
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fundingTypes"
              render={() => (
                <FormItem>
                  <div className="mb-4">
                    <FormLabel className="text-base">
                      2. What types of funding are you interested in?
                    </FormLabel>
                    <FormDescription>
                      Select all that apply
                    </FormDescription>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {fundingOptions.map((option) => (
                      <FormField
                        key={option.id}
                        control={form.control}
                        name="fundingTypes"
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={option.id}
                              className="flex flex-row items-start space-x-2"
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(option.id)}
                                  onCheckedChange={(checked) => {
                                    return checked
                                      ? field.onChange([...field.value, option.id])
                                      : field.onChange(
                                          field.value?.filter(
                                            (value) => value !== option.id
                                          )
                                        )
                                  }}
                                />
                              </FormControl>
                              <FormLabel className="font-normal">
                                {option.label}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                  </div>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="region"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>3. What region are you based in?</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your region" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {regionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="minGrantSize"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>4. What's your minimum grant size?</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select minimum grant size" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {grantSizeOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>5. What is your email address? (optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="email@example.com" {...field} />
                  </FormControl>
                  <FormDescription>
                    We'll send matching grant opportunities to your email
                  </FormDescription>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="query"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Research Topic or Project</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., sustainable agriculture, AI in healthcare" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Brief Description (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="A short description of your project or research" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            
            <Button 
              type="submit" 
              className="w-full bg-brand-purple hover:bg-brand-blue"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Finding Grants...
                </>
              ) : (
                <>
                  <Search className="mr-2 h-4 w-4" />
                  Find My Grants
                </>
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default GrantFinderForm;
