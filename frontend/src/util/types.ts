import React from 'react';
import type { Session, User } from "@supabase/supabase-js";

export type schools =
    "School of Behavioral and Brain Sciences" |
    "School of Arts, Humanities, and Technology" |
    "School of Economic, Political and Policy Sciences" |
    "Erik Jonsson School of Engineering and Computer Science" |
    "School of Interdisciplinary Studies" |
    "Naveen Jindal School of Management" |
    "School of Natural Sciences and Mathematics" |
    null;

export interface TimeProps {
    createdAt: string;
    updatedAt: string;
}

export interface AuthContextType {
  user: User | null;
  session: Session | null;
  isLoading: boolean;
};

export interface ProfileContextProps {
  username: string;
  graduationMonth: number;
  graduationYear: number;
  school: schools | string;
  profileId: string;
  classes: string[];
  setClasses: React.Dispatch<React.SetStateAction<string[]>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  setGraduationMonth: React.Dispatch<React.SetStateAction<number>>;
  setGraduationYear: React.Dispatch<React.SetStateAction<number>>;
  setSchool: React.Dispatch<React.SetStateAction<schools | string>>;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ProfileResponse {
    username: string;
    graduationMonth: number;
    graduationYear: number;
    school: schools | string;
    profileId: string;
    classes: string[];
    email: string;
}

export interface RoomProps extends TimeProps {
    roomId: string;
    title: string;
    description: string;
    isActive: boolean;
}

export interface CommentProps extends TimeProps {
    author: string;
    content: string;
}

export interface PostProps extends TimeProps {
    title: string;
    content: string;
    author: string;
    tags: string[];
    views: number;
    comments: CommentProps[];
}

export interface NebulaContextProps {
    responseCache: Map<string, NebulaCourse>,
    getCourse: (courseId: string) => Promise<NebulaCourse | null>,
    addCourse: (course: NebulaCourse) => void,
}

export interface NebulaCollectionRequirement {
    name: string;
    options: Object[];
    required: number;
    type: string;
}

export interface NebulaCourse {
    _id: string;
    activity_type: string;
    attributes: Object;
    catalog_year: string;
    class_level: string;
    co_or_pre_requisites: NebulaCollectionRequirement;
    corequisites: NebulaCollectionRequirement;
    course_number: string;
    credit_hours: string;
    description: string;
    enrollment_reqs: string;
    grading: string;
    internal_course_number: string;
    laboratory_contact_hours: string;
    lecture_contact_hours: string;
    offering_frequency: string;
    prerequisites: NebulaCollectionRequirement;
    school: string;
    sections: string[];
    subject_prefix: string;
    title: string;
}

export interface NebulaCourseResponse {
    data: NebulaCourse;
    message: string;
    status: number;
}

export interface NebulaCoursesResponse {
    data: NebulaCourse[];
    message: string;
    status: number;
}