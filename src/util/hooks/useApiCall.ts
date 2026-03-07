import { useState, useCallback } from 'react';

type ApiCallResult<T> = {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
  execute: (...args: any[]) => Promise<T | null>;
};

/**
 * A generic hook template for making API calls.
 * Memoizes the function and stores data, loading, and error states.
 */
export function useApiCall<T>(apiFunction: (...args: any[]) => Promise<T>): ApiCallResult<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      setIsLoading(true);
      setError(null);
      try {
        const result = await apiFunction(...args);
        setData(result);
        return result;
      } catch (err: any) {
        setError(err instanceof Error ? err : new Error(err.message || String(err)));
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [apiFunction]
  );

  return { data, isLoading, error, execute };
}
