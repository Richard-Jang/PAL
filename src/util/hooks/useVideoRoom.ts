import { useState, useCallback } from 'react';
import { useApiCall } from './useApiCall';

// Replace with actual API call to your backend to generate VideoSDK token/room
const createRoomApi = async (_title: string, _description: string, _isPrivate: boolean): Promise<string> => {
  // Mock API implementation
  return new Promise((resolve) => setTimeout(() => resolve('mock-room-id'), 500));
};

export function useVideoRoom() {
  const [roomId, setRoomId] = useState<string | null>(null);
  const { isLoading, error, execute } = useApiCall(createRoomApi);

  const initRoom = useCallback(async (title: string, description: string, isPrivate: boolean) => {
    const id = await execute(title, description, isPrivate);
    if (id) {
      setRoomId(id);
    }
    return id;
  }, [execute]);

  return {
    roomId,
    isLoading,
    error,
    initRoom,
    // Add more VideoSDK specific methods here like leaveRoom, toggleMic, etc. if needed
  };
}
