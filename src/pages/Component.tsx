import { Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export function Component() {
    const { user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
    }, [user]);

    return (
        <div className="min-h-screen bg-white font-sans text-black">
            <Outlet />
        </div>
    );
}