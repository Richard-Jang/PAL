import type { NebulaCourseResponse, NebulaCoursesResponse, schools } from '../types';

const baseURL = import.meta.env.VITE_NEBULA_BASE_URL;
const apiKey = import.meta.env.VITE_NEBULA_API_KEY;

export const useCourse = async (
  school?: schools,
  offset?: number,
  course_number?: string,
  subject_prefix?: string,
): Promise<NebulaCoursesResponse> => {

  const headers = new Headers();
  headers.append("accept", "application/json");
  headers.append("x-api-key", apiKey);

  const params = new URLSearchParams();
  if (school != undefined) params.append("school", school);
  if (offset != undefined) params.append("offset", offset.toString());
  if (course_number != undefined) params.append("course_number", course_number);
  if (subject_prefix != undefined) params.append("subject_prefix", subject_prefix);

  const pString = `${school || offset || course_number || subject_prefix ? `?${params.toString()}` : ""}`;
  console.log(pString);
  let res;
  if (pString != undefined) {
    res = await fetch(`${baseURL}/course${pString}`, { headers });
  } else {
    res = await fetch(`${baseURL}/course`, { headers });
  }

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to fetch from Nebula useCourse`);
  }
  const result: NebulaCoursesResponse = await res.json();
  return result;
};

export const useCourseID = async (
  id: string,
): Promise<NebulaCourseResponse> => {

  const headers = new Headers();
  headers.append("accept", "application/json");
  headers.append("x-api-key", apiKey);
  const res = await fetch(`${baseURL}/course/${id}`, { headers });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    throw new Error(errorData.error || `Failed to fetch from Nebula useCourseID`);
  }
  const result: NebulaCourseResponse = await res.json();
  return result;
};