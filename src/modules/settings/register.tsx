import type { ModuleRegisterFunction, FireflyRuntime } from "@squide/firefly";
import { UserSettingsPage } from "./pages/UserSettingsPage.tsx";

// BUG: Missing $id and $priority on navigation item (recommended by Squide)
export const registerSettingsModule: ModuleRegisterFunction<FireflyRuntime> = runtime => {
    runtime.registerRoute({
        path: "/settings",
        element: <UserSettingsPage />
    });

    runtime.registerNavigationItem({
        $label: "Settings",
        to: "/settings"
    });
};
