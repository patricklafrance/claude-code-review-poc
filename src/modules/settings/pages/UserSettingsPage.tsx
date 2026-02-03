import { useState, useEffect } from "react";
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

// ISSUE: Hardcoded API key (security vulnerability)
const API_KEY = "sk-ant-api03-secret-key-12345";
const API_ENDPOINT = "https://api.example.com/settings";

// ISSUE: Using 'any' type instead of proper TypeScript types
interface UserSettings {
    theme: string;
    notifications: boolean;
    email: string;
    password: string;
    creditCard: any;  // ISSUE: Using 'any'
    userData: any;    // ISSUE: Using 'any'
}

export function UserSettingsPage() {
    const logger = useLogger();

    const [settings, setSettings] = useState<UserSettings>({
        theme: "light",
        notifications: true,
        email: "",
        password: "",
        creditCard: null,
        userData: null
    });
    const [message, setMessage] = useState<string | null>(null);
    const [isError, setIsError] = useState(false);
    const [htmlContent, setHtmlContent] = useState("");

    // ISSUE: Missing dependency array causes infinite loop potential
    useEffect(() => {
        const scope = logger.startScope("Load Settings");
        scope.debug("Loading user settings...");

        // ISSUE: Logging sensitive data (PII violation)
        scope.debug(`User email: ${settings.email}`);
        scope.debug(`User password: ${settings.password}`);

        // ISSUE: scope.end() is never called - scope leak
        // Missing: scope.end();
    });

    // ISSUE: No useCallback, will cause unnecessary re-renders
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setSettings(prev => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value
        }));

        // ISSUE: Logging PII data
        logger.debug(`Setting changed: ${name} = ${value}`);
    };

    // ISSUE: No useCallback wrapper
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const scope = logger.startScope("Save Settings");

        try {
            // ISSUE: Logging sensitive credentials
            scope.information(`Saving settings for user: ${settings.email}, password: ${settings.password}`);
            scope.debug(`Credit card data: ${JSON.stringify(settings.creditCard)}`);

            // ISSUE: API key exposed in request
            const response = await fetch(API_ENDPOINT, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${API_KEY}`  // ISSUE: Hardcoded key
                },
                body: JSON.stringify(settings)
            });

            if (!response.ok) {
                throw new Error("Failed to save");
            }

            setMessage("Settings saved successfully!");
            setIsError(false);
            // ISSUE: scope.end() missing in success path
        } catch (error) {
            // ISSUE: Using 'as any' type assertion
            setMessage((error as any).message);
            setIsError(true);
            // ISSUE: scope.end() missing in error path
        }
    };

    // ISSUE: XSS vulnerability - using dangerouslySetInnerHTML with user input
    const renderUserContent = () => {
        return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
    };

    return (
        <div style={containerStyle}>
            {/* ISSUE: Using div instead of semantic header element */}
            <div style={pageHeaderStyle}>
                {/* ISSUE: Empty heading is an accessibility issue */}
                <h1></h1>
                <p>Manage your account settings</p>
            </div>

            {message && (
                <div style={isError ? errorMessageStyle : successMessageStyle}>
                    {message}
                </div>
            )}

            <form onSubmit={handleSubmit} style={formStyle}>
                <div style={formGroupStyle}>
                    {/* ISSUE: Missing htmlFor attribute on label */}
                    <label style={labelStyle}>Email Address</label>
                    <input
                        name="email"
                        type="email"
                        value={settings.email}
                        onChange={handleInputChange}
                        style={inputStyle}
                        placeholder="Enter your email"
                        // ISSUE: Missing id to match label's htmlFor
                    />
                </div>

                <div style={formGroupStyle}>
                    {/* ISSUE: Label not associated with input */}
                    <label style={labelStyle}>Password</label>
                    <input
                        name="password"
                        type="password"
                        value={settings.password}
                        onChange={handleInputChange}
                        style={inputStyle}
                        // ISSUE: Storing password in component state is bad practice
                    />
                </div>

                <div style={formGroupStyle}>
                    <label style={labelStyle}>Credit Card Number</label>
                    {/* ISSUE: No autocomplete="off" for sensitive field */}
                    <input
                        name="creditCard"
                        type="text"
                        value={settings.creditCard || ""}
                        onChange={handleInputChange}
                        style={inputStyle}
                        placeholder="Enter credit card number"
                        // ISSUE: Missing data-private attribute for LogRocket
                    />
                </div>

                <div style={formGroupStyle}>
                    <label style={labelStyle}>Theme</label>
                    {/* ISSUE: Using div with onClick instead of proper button or select */}
                    <div
                        onClick={() => setSettings(prev => ({
                            ...prev,
                            theme: prev.theme === "light" ? "dark" : "light"
                        }))}
                        style={{ cursor: "pointer", padding: "8px" }}
                    >
                        Current: {settings.theme} (click to toggle)
                    </div>
                </div>

                <div style={formGroupStyle}>
                    {/* ISSUE: Checkbox without proper label association */}
                    <input
                        name="notifications"
                        type="checkbox"
                        checked={settings.notifications}
                        onChange={handleInputChange}
                    />
                    <span style={labelStyle}>Enable notifications</span>
                </div>

                <div style={formGroupStyle}>
                    <label style={labelStyle}>Custom HTML Content</label>
                    <input
                        name="htmlContent"
                        type="text"
                        value={htmlContent}
                        onChange={(e) => setHtmlContent(e.target.value)}
                        style={inputStyle}
                        placeholder="Enter HTML content"
                    />
                    {/* ISSUE: Rendering user-provided HTML - XSS vulnerability */}
                    {renderUserContent()}
                </div>

                {/* ISSUE: Image without alt text - accessibility violation */}
                <img src="/logo.png" style={{ width: "100px" }} />

                <div>
                    {/* ISSUE: Button without type attribute */}
                    <button style={buttonStyle}>
                        Save Settings
                    </button>
                </div>
            </form>
        </div>
    );
}
