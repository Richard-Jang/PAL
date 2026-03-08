import { useCallback } from 'react';
import { useApiCall } from './useApiCall';

const fetchItemsApi = async <T>(_collection: string): Promise<T[]> => {
  return new Promise((resolve) => setTimeout(() => resolve([]), 500));
};

const createItemApi = async <T>(_collection: string, payload: any): Promise<T> => {
  return new Promise((resolve) => setTimeout(() => resolve(payload as T), 500));
};

export function useDatabase<T>(collection: string) {
  const fetchApi = useApiCall(() => fetchItemsApi<T>(collection));
  const createApi = useApiCall((payload: any) => createItemApi<T>(collection, payload));

  const fetchItems = useCallback(() => fetchApi.execute(), [fetchApi]);
  const createItem = useCallback((payload: any) => createApi.execute(payload), [createApi]);

  return {
    items: fetchApi.data,
    isLoading: fetchApi.isLoading || createApi.isLoading,
    error: fetchApi.error || createApi.error,
    fetchItems,
    createItem,
    // extend with update/delete
  };
}
