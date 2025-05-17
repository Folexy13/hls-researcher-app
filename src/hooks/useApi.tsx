
import { useState, useCallback } from 'react';
import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from 'axios';
import { useToast } from "@/components/ui/use-toast";

// Create an axios instance
export const api = axios.create({
  baseURL: '/',  // Replace with your API base URL if needed
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

interface ApiState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useApi<T>() {
  const [state, setState] = useState<ApiState<T>>({
    data: null,
    loading: false,
    error: null,
  });
  
  const { toast } = useToast();

  const request = useCallback(async (config: AxiosRequestConfig) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      // For demo purposes, we're simulating API calls
      // In a real app, we would use: const response = await api(config);
      
      // Simulate network request
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock response based on the URL
      let mockResponse: any = {};
      
      if (config.url?.includes('user')) {
        mockResponse = {
          id: 'user-123',
          name: 'Jane Researcher',
          email: 'jane@research.org',
          sex: 'Female',
          family: 'Smith'
        };
      } else if (config.url?.includes('supplements')) {
        mockResponse = [
          { id: 'sup-1', name: 'Vitamin D3', category: 'Researcher' },
          { id: 'sup-2', name: 'Omega-3', category: 'Prof' },
          // More supplements would be here
        ];
      }
      
      const response = {
        data: mockResponse,
        status: 200,
        statusText: 'OK',
        headers: {},
        config
      } as AxiosResponse;
      
      setState({
        data: response.data,
        loading: false,
        error: null,
      });
      
      return response;
    } catch (err) {
      const error = err as AxiosError;
      setState({
        data: null,
        loading: false,
        error: error as Error,
      });
      
      toast({
        title: "API Error",
        description: error.message || "Something went wrong",
        variant: "destructive",
      });
      
      throw error;
    }
  }, [toast]);

  return {
    ...state,
    request,
    // Helper methods for common operations
    get: useCallback((url: string, config?: AxiosRequestConfig) => 
      request({ ...config, method: 'GET', url }), [request]),
    post: useCallback((url: string, data?: any, config?: AxiosRequestConfig) => 
      request({ ...config, method: 'POST', url, data }), [request]),
    put: useCallback((url: string, data?: any, config?: AxiosRequestConfig) => 
      request({ ...config, method: 'PUT', url, data }), [request]),
    delete: useCallback((url: string, config?: AxiosRequestConfig) => 
      request({ ...config, method: 'DELETE', url }), [request]),
  };
}

export default useApi;
