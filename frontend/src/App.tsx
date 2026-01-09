import React, { useState } from "react";

const API_URL = "http://16.171.70.68:3000/api/generate";

const App: React.FC = () => {
    const [loading, setLoading] = useState(false);

    const [resumeData, setResumeData] = useState({
        personal: {
            fullName: "",
            email: "",
            phone: "",
            location: "",
            linkedin: "",
        },
        summary: "",
        experience: [
            {
                company: "",
                role: "",
                startDate: "",
                endDate: "",
                bullets: [""],
            },
        ],
        education: [
            {
                institution: "",
                degree: "",
                year: "",
            },
        ],
        skills: [""],
    });

    /* ---------------- PERSONAL ---------------- */

    const updatePersonal = (field: string, value: string) => {
        setResumeData({
            ...resumeData,
            personal: { ...resumeData.personal, [field]: value },
        });
    };

    /* ---------------- EXPERIENCE ---------------- */

    const updateExperience = (
        index: number,
        field: string,
        value: string | string[]
    ) => {
        const updated = [...resumeData.experience];
        updated[index] = { ...updated[index], [field]: value };
        setResumeData({ ...resumeData, experience: updated });
    };

    const updateBullet = (expIndex: number, bulletIndex: number, value: string) => {
        const updated = [...resumeData.experience];
        updated[expIndex].bullets[bulletIndex] = value;
        setResumeData({ ...resumeData, experience: updated });
    };

    const addBullet = (expIndex: number) => {
        const updated = [...resumeData.experience];
        updated[expIndex].bullets.push("");
        setResumeData({ ...resumeData, experience: updated });
    };

    const addExperience = () => {
        setResumeData({
            ...resumeData,
            experience: [
                ...resumeData.experience,
                { company: "", role: "", startDate: "", endDate: "", bullets: [""] },
            ],
        });
    };

    /* ---------------- EDUCATION ---------------- */

    const updateEducation = (index: number, field: string, value: string) => {
        const updated = [...resumeData.education];
        updated[index] = { ...updated[index], [field]: value };
        setResumeData({ ...resumeData, education: updated });
    };

    const addEducation = () => {
        setResumeData({
            ...resumeData,
            education: [
                ...resumeData.education,
                { institution: "", degree: "", year: "" },
            ],
        });
    };

    /* ---------------- SUBMIT ---------------- */

    const generateResume = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(resumeData),
            });

            if (!response.ok) {
                const error = await response.json();
                alert(error.message);
                return;
            }

            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement("a");
            a.href = url;
            a.download = "resume.docx";
            a.click();

            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error(err);
            alert("Resume generation failed");
        } finally {
            setLoading(false);
        }
    };

    /* ---------------- UI ---------------- */

    return (
        <div className="max-w-3xl mx-auto p-6 space-y-6">
            <h1 className="text-2xl font-bold">Resume Builder</h1>

            {/* Personal */}
            <h2 className="font-semibold">Personal Information</h2>
            {["fullName", "email", "phone", "location", "linkedin"].map((field) => (
                <input
                    key={field}
                    className="border p-2 w-full"
                    placeholder={field}
                    value={(resumeData.personal as any)[field]}
                    onChange={(e) => updatePersonal(field, e.target.value)}
                />
            ))}

            {/* Summary */}
            <h2 className="font-semibold">Summary</h2>
            <textarea
                className="border p-2 w-full"
                value={resumeData.summary}
                onChange={(e) =>
                    setResumeData({ ...resumeData, summary: e.target.value })
                }
            />

            {/* Experience */}
            <h2 className="font-semibold">Experience</h2>
            {resumeData.experience.map((exp, i) => (
                <div key={i} className="border p-4 space-y-2">
                    <input
                        className="border p-2 w-full"
                        placeholder="Company"
                        value={exp.company}
                        onChange={(e) => updateExperience(i, "company", e.target.value)}
                    />
                    <input
                        className="border p-2 w-full"
                        placeholder="Role"
                        value={exp.role}
                        onChange={(e) => updateExperience(i, "role", e.target.value)}
                    />
                    <input
                        className="border p-2 w-full"
                        placeholder="Start Date (YYYY-MM)"
                        value={exp.startDate}
                        onChange={(e) => updateExperience(i, "startDate", e.target.value)}
                    />
                    <input
                        className="border p-2 w-full"
                        placeholder="End Date (YYYY-MM or Present)"
                        value={exp.endDate}
                        onChange={(e) => updateExperience(i, "endDate", e.target.value)}
                    />

                    {exp.bullets.map((b, bi) => (
                        <input
                            key={bi}
                            className="border p-2 w-full"
                            placeholder="Bullet point"
                            value={b}
                            onChange={(e) => updateBullet(i, bi, e.target.value)}
                        />
                    ))}

                    <button onClick={() => addBullet(i)}>+ Add Bullet</button>
                </div>
            ))}
            <button onClick={addExperience}>+ Add Experience</button>

            {/* Education */}
            <h2 className="font-semibold">Education</h2>
            {resumeData.education.map((edu, i) => (
                <div key={i} className="border p-4 space-y-2">
                    <input
                        className="border p-2 w-full"
                        placeholder="Institution"
                        value={edu.institution}
                        onChange={(e) => updateEducation(i, "institution", e.target.value)}
                    />
                    <input
                        className="border p-2 w-full"
                        placeholder="Degree"
                        value={edu.degree}
                        onChange={(e) => updateEducation(i, "degree", e.target.value)}
                    />
                    <input
                        className="border p-2 w-full"
                        placeholder="Year"
                        value={edu.year}
                        onChange={(e) => updateEducation(i, "year", e.target.value)}
                    />
                </div>
            ))}
            <button onClick={addEducation}>+ Add Education</button>

            {/* Skills */}
            <h2 className="font-semibold">Skills</h2>
            <input
                className="border p-2 w-full"
                placeholder="Node.js, TypeScript, AWS"
                onChange={(e) =>
                    setResumeData({
                        ...resumeData,
                        skills: e.target.value.split(",").map((s) => s.trim()),
                    })
                }
            />

            <button
                className="bg-black text-white px-4 py-2 rounded"
                onClick={generateResume}
                disabled={loading}
            >
                {loading ? "Generating..." : "Generate Resume"}
            </button>
        </div>
    );
};

export default App;
