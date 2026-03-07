import { type RouteObject } from "react-router-dom";
import PageSkeleton from "./PageSkeleton";

const Route: RouteObject[] = [
    { path: "/", lazy: () => import("./Home"), hydrateFallbackElement: <PageSkeleton /> },
    { path: "/login", lazy: () => import("./Login"), hydrateFallbackElement: <PageSkeleton /> },
    { path: "/profile", lazy: () => import("./Profile"), hydrateFallbackElement: <PageSkeleton /> },
    { path: "/video", lazy: () => import("./VideoChat"), hydrateFallbackElement: <PageSkeleton /> },
    { path: "/forum", lazy: () => import("./Forum"), hydrateFallbackElement: <PageSkeleton /> },
    { path: "/chat", lazy: () => import("./AIChat"), hydrateFallbackElement: <PageSkeleton /> },
    { path: "*", lazy: () => import("./NotFound"), hydrateFallbackElement: <PageSkeleton /> },
];

export const RootRoute: RouteObject = {
    path: "",
    lazy: () => import("./Component"),
    hydrateFallbackElement: <PageSkeleton />,
    children: Route,
};