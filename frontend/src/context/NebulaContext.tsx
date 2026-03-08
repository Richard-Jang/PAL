import React, { createContext, useContext, useMemo } from 'react';
import { type NebulaContextProps, type NebulaCourse, type NebulaCourseResponse } from '../util/types';

const NebulaContext = createContext<NebulaContextProps | undefined>(undefined);

export const NebulaBaseUrl = import.meta.env.VITE_NEBULA_BASE_URL;

export const NebulaProvider = ({ children }: { children: React.ReactNode }) => {
    
    const repsonseCache = React.useRef(new Map<string, NebulaCourse>());

    const getCourse = async (courseId: string): Promise<NebulaCourse | null> => {
        if (repsonseCache.current.has(courseId)) {
            return repsonseCache.current.get(courseId) ?? null;
        }
        const response = await fetch(`${NebulaBaseUrl}/api/courses/${courseId}`);
        const data: NebulaCourseResponse = await response.json();
        repsonseCache.current.set(courseId, data.data);
        return data.data;
    };

    const addCourse = (course: NebulaCourse) => {
        repsonseCache.current.set(course._id, course);
    };

    const value = useMemo(() => ({
        responseCache: repsonseCache.current,
        getCourse: getCourse,
        addCourse: addCourse,
    }), []);

    return (
        <NebulaContext.Provider value={value}>
            {children}
        </NebulaContext.Provider>
    );
};

export const useNebula = () => {
  const context = useContext(NebulaContext);
  if (context === undefined) {
      throw new Error("useNebula must be used within a NebulaProvider");
  }
  return context;
};
