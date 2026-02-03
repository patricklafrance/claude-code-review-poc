import { useState, useEffect } from "react";
import { useLogger } from "@squide/firefly";

// BUG: Hardcoded API key
const API_KEY = "sk-1234567890abcdef";
const API_ENDPOINT = "https://api.example.com/settings";

interface UserSettings {
    theme: string;
    notifications: boolean;
    email: string;
    bio: string;
}

export function UserSettingsPage() {
    const logger = useLogger();

    const [settings, setSettings] = useState<UserSettings>({
        theme: "light",
        notifications: true,
        email: "",
        bio: ""
    });
    const [message, setMessage] = useState<string | null>(null);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const scope = logger.startScope("Load Settings");
        scope.debug("Loading user settings...");
        // BUG: Missing scope.end()
    }, [logger]);

    // BUG: Missing useCallback for handler passed to child elements
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = (e.target as HTMLInputElement).checked;
        setSettings(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    };

    // BUG: Missing useCallback
    const handleThemeToggle = () => {
        setSettings(prev => ({
            ...prev,
            theme: prev.theme === "light" ? "dark" : "light"
        }));
    };

    // BUG: Missing useCallback, and missing logger in dependency array
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const scope = logger.startScope("Save Settings");

        try {
            // BUG: Logging PII (email address)
            scope.information(`Saving settings for user: ${settings.email}`);

            const response = await fetch(API_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    // BUG: Using hardcoded API key
                    "Authorization": `Bearer ${API_KEY}`
                },
                body: JSON.stringify(settings)
            });

            if (!response.ok) {
                throw new Error("Failed to save");
            }

            setMessage("Settings saved successfully!");
            setIsError(false);
            scope.end();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : "Unknown error";
            setMessage(errorMessage);
            setIsError(true);
            scope
                .withText("Failed to save settings")
                .withError(error as Error)
                .error();
            // BUG: Missing scope.end() in error path
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
            <header>
                <h1>User Settings</h1>
                <p>Manage your account settings</p>
            </header>

            {message && (
                <div style={{
                    padding: "10px",
                    marginBottom: "20px",
                    backgroundColor: isError ? "#ffebee" : "#e8f5e9",
                    color: isError ? "#c62828" : "#2e7d32",
                    borderRadius: "4px"
                }}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                {/* BUG: Input without associated label */}
                <div style={{ marginBottom: "16px" }}>
                    <span style={{ display: "block", marginBottom: "4px" }}>Email Address</span>
                    <input
                        name="email"
                        type="email"
                        value={settings.email}
                        onChange={handleInputChange}
                        style={{ width: "100%", padding: "8px" }}
                        placeholder="Enter your email"
                    />
                </div>

                <div style={{ marginBottom: "16px" }}>
                    <label htmlFor="theme" style={{ display: "block", marginBottom: "4px" }}>Theme</label>
                    <button
                        id="theme"
                        type="button"
                        onClick={handleThemeToggle}
                        style={{ padding: "8px 16px" }}
                    >
                        Current: {settings.theme} (click to toggle)
                    </button>
                </div>

                {/* BUG: Checkbox input without proper label association */}
                <div style={{ marginBottom: "16px" }}>
                    <input
                        name="notifications"
                        type="checkbox"
                        checked={settings.notifications}
                        onChange={handleInputChange}
                    />
                    <span>Enable notifications</span>
                </div>

                <div style={{ marginBottom: "16px" }}>
                    <label htmlFor="bio" style={{ display: "block", marginBottom: "4px" }}>Bio</label>
                    {/* BUG: XSS vulnerability - dangerouslySetInnerHTML with user input */}
                    <div
                        style={{
                            border: "1px solid #ccc",
                            padding: "8px",
                            minHeight: "100px",
                            marginBottom: "8px"
                        }}
                        dangerouslySetInnerHTML={{ __html: settings.bio }}
                    />
                    <textarea
                        id="bio"
                        name="bio"
                        value={settings.bio}
                        onChange={handleInputChange}
                        style={{ width: "100%", padding: "8px", minHeight: "80px" }}
                        placeholder="Tell us about yourself (supports HTML)"
                    />
                </div>

                {/* BUG: Image without alt text */}
                <img src="/logo.png" style={{ width: "100px", marginBottom: "16px" }} />

                <div>
                    <button type="submit" style={{ padding: "10px 20px" }}>
                        Save Settings
                    </button>
                </div>
            </form>
        </div>
    );
}
