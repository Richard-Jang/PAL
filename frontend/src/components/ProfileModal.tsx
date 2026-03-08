import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useProfile } from '../context/ProfileContext';
import { type schools } from '../util/types';
import { useAuth } from '../context/AuthContext';
import { useCourse } from '../util/hooks/useNebula';
import { useNebula } from '../context/NebulaContext';

const schema = yup.object().shape({
  username: yup.string().required('Username is required'),
  graduationMonth: yup.number().min(1).max(12).required('Graduation month is required'),
  graduationYear: yup.number().min(new Date().getFullYear()).required('Graduation year is required'),
  school: yup.string().required('School is required'),
});

const schoolOptions: schools[] = [
    "School of Behavioral and Brain Sciences",
    "School of Arts, Humanities, and Technology",
    "School of Economic, Political and Policy Sciences",
    "Erik Jonsson School of Engineering and Computer Science",
    "School of Interdisciplinary Studies",
    "Naveen Jindal School of Management",
    "School of Natural Sciences and Mathematics"
];

const ProfileModal: React.FC = () => {
    const { 
        username, setUsername, 
        graduationMonth, setGraduationMonth, 
        graduationYear, setGraduationYear,
        school, setSchool,
        setIsLoading,
        setIsModalOpen
    } = useProfile();
    const { user } = useAuth();
    const { getCourse, addCourse } = useNebula();
    const { 
        classes: initialClasses,
        setClasses: setContextClasses 
    } = useProfile();

    const [availableClasses, setAvailableClasses] = useState<string[]>([]);
    const [selectedClasses, setSelectedClasses] = useState<string[]>(initialClasses || []);
    const [isLoadingClasses, setIsLoadingClasses] = useState(false);

    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            username: username || '',
            graduationMonth: graduationMonth || 1,
            graduationYear: graduationYear || new Date().getFullYear(),
            school: (school as string) || '',
        }
    });

    const watchedSchool = watch('school');

    useEffect(() => {
        if (watchedSchool) {
            fetchClasses(watchedSchool as schools);
        }
    }, [watchedSchool]);
    
    async function fetchClasses(schoolName: schools) {
        setIsLoadingClasses(true);
        try {
            let response = await useCourse(schoolName);
            if (response.message === "success" && response.data.length > 0) {
                response.data.forEach((c: any) => { if (!getCourse(c.id)) addCourse(c); });
                setAvailableClasses(
                    response.data.reduce((acc: string[], c: any) => {
                        if (!acc.includes(`${c.subject_prefix} ${c.course_number}`)) {
                            acc.push(`${c.subject_prefix} ${c.course_number}`);
                        }
                        return acc;
                    }, [])
                );
            }
        } catch (error) {
            console.error("Failed to fetch courses:", error);
        } finally {
            setIsLoadingClasses(false);
        }
    }

    const toggleClass = (cls: string) => {
        setSelectedClasses(prev => 
            prev.includes(cls) ? prev.filter(c => c !== cls) : [...prev, cls]
        );
    };

    const onSubmit = async (data: any) => {
        setIsLoading(true);
        try {
            const response = await fetch(`${import.meta.env.VITE_MONGODB_BASE_URL}/api/profile/${encodeURIComponent(user?.email || '')}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...data,
                    classes: selectedClasses
                })
            });
            
            if (response.ok) {
                const updatedProfile = await response.json();
                setUsername(updatedProfile.username);
                setGraduationMonth(updatedProfile.graduationMonth);
                setGraduationYear(updatedProfile.graduationYear);
                setSchool(updatedProfile.school);
                setContextClasses(updatedProfile.classes || []);
                setIsModalOpen(false);
            }
        } catch (error) {
            console.error('Error updating profile:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border border-gray-100 text-black">
                <h2 className="text-3xl font-bold mb-6 text-gray-800">Complete Your Profile</h2>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
                        <input
                            {...register('username')}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                            placeholder="Display name"
                        />
                        {errors.username && <p className="text-red-500 text-xs mt-1">{errors.username.message}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Month</label>
                            <input
                                type="number"
                                {...register('graduationMonth')}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="MM"
                            />
                            {errors.graduationMonth && <p className="text-red-500 text-xs mt-1">{errors.graduationMonth.message}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Graduation Year</label>
                            <input
                                type="number"
                                {...register('graduationYear')}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                                placeholder="YYYY"
                            />
                            {errors.graduationYear && <p className="text-red-500 text-xs mt-1">{errors.graduationYear.message}</p>}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">School</label>
                        <select
                            {...register('school')}
                            className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                        >
                            <option value="">Select a school</option>
                            {schoolOptions.map((opt) => (
                                <option key={opt} value={opt || ''}>{opt}</option>
                            ))}
                        </select>
                        {errors.school && <p className="text-red-500 text-xs mt-1">{errors.school.message}</p>}
                    </div>

                    {watchedSchool && (
                        <div className="space-y-3">
                            <label className="block text-sm font-medium text-gray-700 mb-1">Classes</label>
                            
                            <div className="flex flex-wrap gap-2 mb-2 max-h-32 overflow-y-auto p-1">
                                {selectedClasses.map(cls => (
                                    <span key={cls} className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 border border-blue-200">
                                        {cls}
                                        <button type="button" onClick={() => toggleClass(cls)} className="hover:text-blue-600 font-bold">&times;</button>
                                    </span>
                                ))}
                                {selectedClasses.length === 0 && (
                                    <p className="text-xs text-gray-400 italic">No classes selected yet.</p>
                                )}
                            </div>

                            <select
                                onChange={(e) => {
                                    if (e.target.value) {
                                        toggleClass(e.target.value);
                                        e.target.value = "";
                                    }
                                }}
                                disabled={isLoadingClasses}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all disabled:opacity-50"
                            >
                                <option value="">{isLoadingClasses ? "Loading classes..." : "Add a class..."}</option>
                                {availableClasses
                                    .filter(c => !selectedClasses.includes(c))
                                    .map(cls => (
                                        <option key={cls} value={cls}>{cls}</option>
                                    ))}
                            </select>
                        </div>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg shadow-lg hover:shadow-xl transform active:scale-[0.98] transition-all duration-200 mt-4"
                    >
                        Save Profile
                    </button>
                </form>
            </div>
        </div>
    );
};

export default ProfileModal;
