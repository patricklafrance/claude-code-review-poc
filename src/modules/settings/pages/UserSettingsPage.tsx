import { useState, useEffect, useCallback } from "react";
import { useLogger } from "@squide/firefly";
import {
    containerStyle,
    pageHeaderStyle,
    formStyle,
    formGroupStyle,
    labelStyle,
    inputStyle,
    buttonStyle,
    successMessageStyle,
    errorMessageStyle
} from "../../../shared/styles.ts";

const API_ENDPOINT = import.meta.env.VITE_API_ENDPOINT || "https://api.example.com/settings";

interface UserSettings {
    theme: string;
    notifications: boolean;
    email: string;
}

export function UserSettingsPage() {
    const logger = useLogger();

    const [settings, setSettings] = useState<UserSettings>({
        theme: "light",
        notifications: true,
        email: ""
    });
    const [message, setMessage] = useState<string | null>(null);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        const scope = logger.startScope("Load Settings");
        scope.debug("Loading user settings...");
        scope.end();
    }, [logger]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));
    }, []);

    const handleThemeToggle = useCallback(() => {
        setSettings(prev => ({
            ...prev,
            theme: prev.theme === "light" ? "dark" : "light"
        }));
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();

        const scope = logger.startScope("Save Settings");

        try {
            scope.information("Saving user settings");

            const response = await fetch(API_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                credentials: "include",
                body: JSON.stringify({
                    theme: settings.theme,
                    notifications: settings.notifications,
                    email: settings.email
                })
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
            scope.end();
        }
    }, [logger, settings]);

    return (
        <div style={containerStyle}>
            <header style={pageHeaderStyle}>
                <h1>User Settings</h1>
                <p>Manage your account settings</p>
            </header>

            {message && (
                <div
                    role="alert"
                    style={isError ? errorMessageStyle : successMessageStyle}
                >
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} style={formStyle}>
                <div style={formGroupStyle}>
                    <label htmlFor="email" style={labelStyle}>Email Address</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={settings.email}
                        onChange={handleInputChange}
                        style={inputStyle}
                        placeholder="Enter your email"
                        autoComplete="email"
                    />
                </div>

                <div style={formGroupStyle}>
                    <label htmlFor="theme" style={labelStyle}>Theme</label>
                    <button
                        id="theme"
                        type="button"
                        onClick={handleThemeToggle}
                        style={{ ...buttonStyle, marginTop: "4px" }}
                        aria-pressed={settings.theme === "dark"}
                    >
                        Current: {settings.theme} (click to toggle)
                    </button>
                </div>

                <div style={formGroupStyle}>
                    <label htmlFor="notifications" style={{ ...labelStyle, display: "flex", alignItems: "center", gap: "8px" }}>
                        <input
                            id="notifications"
                            name="notifications"
                            type="checkbox"
                            checked={settings.notifications}
                            onChange={handleInputChange}
                        />
                        Enable notifications
                    </label>
                </div>

                <img src="/logo.png" alt="Application logo" style={{ width: "100px" }} />

                <div>
                    <button type="submit" style={buttonStyle}>
                        Save Settings
                    </button>
                </div>
            </form>
        </div>
    );
}
