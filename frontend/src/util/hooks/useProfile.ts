import { useCallback } from 'react';
import type { ProfileResponse } from '../types';

const baseURL = import.meta.env.VITE_MONGODB_BASE_URL;

export const useGetProfile = () => {
    return useCallback(async (email: string): Promise<ProfileResponse> => {
        const res = await fetch(`${baseURL}/api/profile/${encodeURIComponent(email)}`);
        if (!res.ok) {
            const errorData = await res.json().catch(() => ({}));
            throw new Error(errorData.error || `Failed to fetch profile`);
        }
        const result: ProfileResponse = await res.json();
        return result;
    }, []);
};