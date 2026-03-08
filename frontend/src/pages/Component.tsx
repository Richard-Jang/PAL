import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";
import { Navbar } from "../util/components/Navbar";

export function Component() {
    const { user, isLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!isLoading) {
            // Redirect to login if not authenticated and not already on /login
            if (!user && location.pathname !== "/login") {
                navigate("/login");
            } 
            // Redirect to home if authenticated and trying to access /login
            else if (user && location.pathname === "/login") {
                navigate("/");
            }
        }
    }, [user, isLoading, location.pathname, navigate]);

    if (isLoading) return null;

    return (
        <div className="h-screen bg-slate-50 font-sans text-slate-900 flex flex-col overflow-hidden">
            {user && <Navbar />}
            <main className="flex-1 overflow-hidden">
                <Outlet />
            </main>
        </div>
    );
}