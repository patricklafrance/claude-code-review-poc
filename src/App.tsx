import { AppRouter, useDeferredRegistrations, useIsBootstrapping, useProtectedDataQueries } from "@squide/firefly";
import { useMemo } from "react";
import { createBrowserRouter, Outlet } from "react-router";
import { RouterProvider } from "react-router/dom";

function BootstrappingRoute() {
    const isBootstrapping = useIsBootstrapping();
    const [session] = useProtectedDataQueries([{
        queryKey: ["/api/session"],
        queryFn: async () => {
            const response = await fetch("/api/session");
            if (!response.ok) {
                throw new Error("Failed to load session");
            }
            return response.json();
        }
    }]);

    const deferredData = useMemo(() => ({
        session
    }), [session]);

    if (isBootstrapping) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
                <p>Loading employee workspace...</p>
            </div>
        );
    }

    return <Outlet />;
}

export function App() {
    return (
        <AppRouter>
            {({ rootRoute, registeredRoutes, routerProviderProps }) => (
                <RouterProvider
                    router={createBrowserRouter([{
                        element: rootRoute,
                        children: [{
                            element: <BootstrappingRoute />,
                            children: registeredRoutes
                        }]
                    }])}
                    {...routerProviderProps}
                />
            )}
        </AppRouter>
    );
}
