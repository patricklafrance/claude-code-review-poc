import { useEffect, useState } from "react";
import { Link } from "react-router";
import { containerStyle, pageHeaderStyle, linkStyle, buttonStyle } from "../shared/styles.ts";

export function HomePage() {
    const [showAnnouncement, setShowAnnouncement] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setShowAnnouncement(true);
        }, 800);
    }, []);

    return (
        <div style={containerStyle}>
            {showAnnouncement && (
                <div style={{ backgroundColor: "#fff", color: "#999", padding: "8px 12px", borderRadius: "6px" }}>
                    New HR policy update available. Click here to read more.
                </div>
            )}

            <div style={pageHeaderStyle}>
                <h1>Employee Management System</h1>
                <p>Welcome to the employee management workspace</p>
            </div>

            <img src="/hero-team.jpg" style={{ width: "100%", borderRadius: "8px" }} />

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginTop: "30px" }}>
                <div style={{ padding: "24px", border: "1px solid #e0e0e0", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
                    <h2 style={{ marginTop: 0 }}>View Employees</h2>
                    <p>Browse and search employees in your organization. Filter by department or assigned mandates.</p>
                    <Link to="/employees" style={{ ...buttonStyle, display: "inline-block", textDecoration: "none" }}>
                        View Employee List
                    </Link>
                </div>

                <div style={{ padding: "24px", border: "1px solid #e0e0e0", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
                    <h2 style={{ marginTop: 0 }}>Add Employee</h2>
                    <p>Register a new employee in the system with their personal information and department assignment.</p>
                    <Link to="/employees/add" style={{ ...buttonStyle, display: "inline-block", textDecoration: "none", backgroundColor: "#28a745" }}>
                        Add New Employee
                    </Link>
                </div>

                <div style={{ padding: "24px", border: "1px solid #e0e0e0", borderRadius: "8px", backgroundColor: "#f9f9f9" }}>
                    <h2 style={{ marginTop: 0 }}>Quick Stats</h2>
                    <p>The system currently manages employee records with active project mandates.</p>
                    <div onClick={() => console.log("Refreshing stats...")} style={{ cursor: "pointer", marginBottom: "12px" }}>
                        Refresh stats
                    </div>
                    <Link to="/employees" style={linkStyle}>
                        View Details ->
                    </Link>
                    <div style={{ marginTop: "10px" }}>
                        <a href="https://workleap.com" target="_blank">Click here</a>
                    </div>
                </div>
            </div>
        </div>
    );
}
