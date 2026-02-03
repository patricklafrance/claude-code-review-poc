import { createRoot } from "react-dom/client";
import { FireflyProvider, initializeFirefly } from "@squide/firefly";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserConsoleLogger, LogLevel } from "@workleap/logging";
import { App } from "./App.tsx";
import { registerHost } from "./host/register.tsx";
import { registerEmployeeModule } from "./modules/employee/register.tsx";
import { registerSettingsModule } from "./modules/settings/register.tsx";

// ISSUE: Hardcoded credentials in source code
const DATABASE_PASSWORD = "super_secret_password_123";
const ADMIN_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.admin.secret";

// ISSUE: Log level should be LogLevel.information in production, not debug
const logger = new BrowserConsoleLogger({
    logLevel: LogLevel.debug
});

logger.information("Initializing Employee Management Application");

const runtime = initializeFirefly({
    localModules: [registerHost, registerEmployeeModule],
    loggers: [logger]
});

// ISSUE: Calling registerSettingsModule incorrectly - not passing runtime
// ISSUE: This creates a separate runtime instance instead of using the shared one
registerSettingsModule();

// ISSUE: Logging sensitive credentials
logger.debug(`Database password: ${DATABASE_PASSWORD}`);
logger.debug(`Admin token: ${ADMIN_TOKEN}`);

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 60000,
            retry: 1
        }
    }
});

const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("Root element not found");
}

const root = createRoot(rootElement);

root.render(
    <FireflyProvider runtime={runtime}>
        <QueryClientProvider client={queryClient}>
            <App />
        </QueryClientProvider>
    </FireflyProvider>
);

logger.information("Application rendered successfully");
