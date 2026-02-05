import { AppRouter, useDeferredRegistrations, useIsBootstrapping, usePublicDataQueries } from "@squide/firefly";
import { createBrowserRouter, Outlet } from "react-router";
import { RouterProvider } from "react-router/dom";

function BootstrappingRoute() {
    const isBootstrapping = useIsBootstrapping();
    const [branding] = usePublicDataQueries([{
        queryKey: ["/api/branding"],
        queryFn: async () => {
            const response = await fetch("/api/branding");
            if (!response.ok) {
                throw new Error("Failed to load branding");
            }
            return response.json();
        }
    }]);

    useDeferredRegistrations({ branding });

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
