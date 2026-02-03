import type { ModuleRegisterFunction, FireflyRuntime } from "@squide/firefly";
import { UserSettingsPage } from "./pages/UserSettingsPage.tsx";

export const registerSettingsModule: ModuleRegisterFunction<FireflyRuntime> = runtime => {
    runtime.registerRoute({
        path: "/settings",
        element: <UserSettingsPage />
    });

    runtime.registerNavigationItem({
        $id: "settings",
        $label: "Settings",
        $priority: 10,
        to: "/settings"
    });
};
