import { useCallback } from 'react';
import { useApiCall } from './useApiCall';

const generateSummaryApi = async (content: string): Promise<string> => {
  // Mock Gemini API call
  return new Promise((resolve) => setTimeout(() => resolve(`Summary of: ${content.substring(0, 20)}...`), 1000));
};

export function useSummary() {
  const { data: summary, isLoading, error, execute } = useApiCall(generateSummaryApi);

  const generate = useCallback(async (content: string) => {
    return await execute(content);
  }, [execute]);

  return {
    summary,
    isLoading,
    error,
    generate,
  };
}
