import React, { createContext, useContext, useEffect, useState } from 'react';
import { type ProfileContextProps, type schools } from '../util/types';
import { useAuth } from './AuthContext';
import ProfileModal from '../components/ProfileModal';

const ProfileContext = createContext<ProfileContextProps | undefined>(undefined);

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
    const { user } = useAuth();

    const [username, setUsername] = useState<string>("");
    const [graduationMonth, setGraduationMonth] = useState<number>(0);
    const [graduationYear, setGraduationYear] = useState<number>(0);
    const [school, setSchool] = useState<schools | string>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [classes, setClasses] = useState<string[]>([]);
    const [profileId, setProfileId] = useState<string>("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    
    const fetchProfile = async () => {
        if (!user?.email) {
            setIsLoading(false);
            return;
        }
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_MONGODB_BASE_URL}/api/profile/${encodeURIComponent(user.email!)}`);
            if (response.status === 404) {
                setIsModalOpen(true);
                return;
            }
            if (response.ok) {
                const profileData = await response.json();
                if (profileData) {
                    setUsername(profileData.username || "");
                    setGraduationMonth(profileData.graduationMonth || 0);
                    setGraduationYear(profileData.graduationYear || 0);
                    setSchool(profileData.school || null);
                    setClasses(profileData.classes || []);
                    setProfileId(profileData.id || "");
                    setIsModalOpen(false);
                } else {
                    setIsModalOpen(true);
                }
            }
        } catch (error) {
            console.error("Failed to fetch profile:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProfile();
    }, [user])
    
    return (
        <ProfileContext.Provider value={{
            username,
            setUsername,

            graduationMonth,
            setGraduationMonth,

            graduationYear,
            setGraduationYear,

            school,
            setSchool,

            profileId,

            classes,
            setClasses,

            isLoading,
            setIsLoading,

            isModalOpen,
            setIsModalOpen,
        }}>
            {isLoading ? (
                <div className="flex items-center justify-center min-h-screen">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <>
                    {children}
                    {isModalOpen && <ProfileModal />}
                </>
            )}
        </ProfileContext.Provider>
    );
};

export const useProfile = () => {
  const context = useContext(ProfileContext);
  if (context === undefined) {
      throw new Error("useProfile must be used within a ProfileProvider");
  }
  return context;
};
