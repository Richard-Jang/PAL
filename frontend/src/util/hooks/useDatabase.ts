import { useCallback } from 'react';

const baseURL = import.meta.env.VITE_MONGODB_BASE_URL;

export const useGET = useCallback(async <T>(collection: string): Promise<T[]> => {
  const res = await fetch(`${baseURL}/api/${collection}`);
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to fetch from ${collection}`);
  }
  return res.json();
}, [baseURL]);

export const useFetch = useCallback(async <T>(collection: string, payload: any): Promise<T> => {
  const res = await fetch(`${baseURL}/api/${collection}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload)
  });
  
  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to create item in ${collection}`);
  }
  return res.json();
}, [baseURL]);
