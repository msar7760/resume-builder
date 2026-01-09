import React, { useState } from "react";

const API_URL = "https://your-backend-url/api/generate"; // Replace with your backend

const App: React.FC = () => {
    const [loading, setLoading] = useState(false);

    // Initialize JSON schema structure
    const [resumeData, setResumeData] = useState({
        personal: { fullName: "", email: "", phone: "", location: "", linkedin: "" },
        summary: "",
        experience: [{ company: "", role: "", startDate: "", endDate: "", bullets: [""] }],
        education: [{ institution: "", degree: "", year: "" }],
        skills: [""],
    });

    // Function to call backend and download .docx
    const generateResume = async (data: any) => {
        setLoading(true);
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });

            if (!response.ok) throw new Error("Failed to generate resume");

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "resume.docx";
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            alert("Resume generation failed");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ maxWidth: 800, margin: "0 auto", padding: 24 }}>
            <h1>Resume Builder</h1>

            {/* Personal Info */}
            <h2>Personal Information</h2>
            <input
                placeholder="Full Name"
                value={resumeData.personal.fullName}
                onChange={(e) =>
                    setResumeData({ ...resumeData, personal: { ...resumeData.personal, fullName: e.target.value } })
                }
            />
            <input
                placeholder="Email"
                value={resumeData.personal.email}
                onChange={(e) =>
                    setResumeData({ ...resumeData, personal: { ...resumeData.personal, email: e.target.value } })
                }
            />

            {/* Summary */}
            <h2>Summary</h2>
            <textarea
                placeholder="Professional summary"
                value={resumeData.summary}
                onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
            />

            {/* Skills */}
            <h2>Skills (comma separated)</h2>
            <input
                placeholder="Node.js, TypeScript, AWS"
                value={resumeData.skills.join(", ")}
                onChange={(e) =>
                    setResumeData({ ...resumeData, skills: e.target.value.split(",").map((s) => s.trim()) })
                }
            />

            {/* Generate Resume */}
            <button onClick={() => generateResume(resumeData)} disabled={loading} style={{ marginTop: 24 }}>
                {loading ? "Generating..." : "Generate Resume"}
            </button>
        </div>
    );
};

export default App;
