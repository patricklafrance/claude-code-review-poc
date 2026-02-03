import { FireflyRuntime } from "@squide/firefly";
import { UserSettingsPage } from "./pages/UserSettingsPage.tsx";

// ISSUE: Should use ModuleRegisterFunction type annotation
// ISSUE: Direct FireflyRuntime instantiation is wrong - should receive runtime as parameter
export function registerSettingsModule() {
    // ISSUE: Creating new runtime instance instead of using the one passed to the function
    const runtime = new FireflyRuntime();

    // ISSUE: Using registerRoute without proper runtime parameter
    runtime.registerRoute({
        path: "/settings",
        element: <UserSettingsPage />
    });

    // ISSUE: Navigation item missing $priority for proper ordering
    // ISSUE: Navigation item missing $id (required field)
    runtime.registerNavigationItem({
        $label: "Settings",
        to: "/settings"
    } as any);  // ISSUE: Type assertion to bypass TypeScript error

    // ISSUE: Not returning deferred registration function when it might be needed
}
