import React, { useState } from "react";

const API_URL = "https://backend-purple-moon-7936.fly.dev/api/generate";

const App: React.FC = () => {
    const [loading, setLoading] = useState(false);
    const [resumeData, setResumeData] = useState({
        personal: { fullName: "", email: "", phone: "", location: "", linkedin: "", website: "" },
        summary: "",
        experience: [{ company: "", role: "", startDate: "", endDate: "", bullets: [""] }],
        education: [{ institution: "", degree: "", year: "" }],
        technicalSkills: [] as string[],
        softSkills: [] as string[],
        awards: [] as { title: string; issuer: string; year: string }[],
        research: [] as { title: string; description: string; link: string }[],
    });

    //HELPERS
    const updatePersonal = (field: string, value: string) => {
        setResumeData({ ...resumeData, personal: { ...resumeData.personal, [field]: value } });
    };

    const updateList = (field: "technicalSkills" | "softSkills", value: string) => {
        setResumeData({ ...resumeData, [field]: value.split(",").map(s => s.trim()).filter(s => s !== "") });
    };

    const updateExperience = (index: number, field: string, value: string) => {
        const updated = [...resumeData.experience];
        (updated[index] as any)[field] = value;
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

    const addSectionItem = (field: "awards" | "research" | "education", emptyObj: any) => {
        setResumeData({ ...resumeData, [field]: [...(resumeData[field] as any), emptyObj] });
    };

    const updateSectionItem = (field: "awards" | "research" | "education", index: number, key: string, value: string) => {
        const updated = [...(resumeData[field] as any)];
        updated[index][key] = value;
        setResumeData({ ...resumeData, [field]: updated });
    };

    const generateResume = async () => {
        setLoading(true);
        try {
            const response = await fetch(API_URL, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(resumeData),
            });
            if (!response.ok) throw new Error("Failed to generate");
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = `${resumeData.personal.fullName || "resume"}.docx`;
            a.click();
        } catch (err) {
            alert("Generation failed");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#f1f5f9] flex justify-center py-12 px-4">
            <div className="w-full max-w-4xl bg-white shadow-2xl rounded-2xl border border-slate-200 overflow-hidden">

                {/* Header */}
                <header className="bg-[#1e293b] p-10 text-center">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">Resume Builder</h1>
                    <p className="text-slate-400 mt-2 uppercase tracking-[0.2em] text-xs font-bold">Create a Professional DOCX</p>
                </header>

                <main className="p-8 md:p-14 space-y-16">

                    {/* Personal Information */}
                    <section>
                        <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-100 pb-3 mb-8 uppercase tracking-wider text-left">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {["fullName", "email", "phone", "location", "linkedin", "website"].map((field) => (
                                <div key={field} className="flex flex-col text-left">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase mb-2 ml-1">{field}</label>
                                    <input
                                        className="border-2 border-slate-100 p-3 rounded-xl focus:border-blue-500 focus:ring-0 outline-none transition-all text-sm bg-slate-50/50"
                                        placeholder={`Enter ${field}`}
                                        onChange={(e) => updatePersonal(field, e.target.value)}
                                    />
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Summary */}
                    <section>
                        <h2 className="text-xl font-bold text-slate-800 border-b-2 border-slate-100 pb-3 mb-6 uppercase tracking-wider text-left">Professional Summary</h2>
                        <textarea
                            className="w-full border-2 border-slate-100 p-4 rounded-xl h-32 outline-none focus:border-blue-500 text-sm bg-slate-50/50"
                            placeholder="Describe your career highlights..."
                            onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                        />
                    </section>

                    {/* Experience */}
                    <section>
                        <div className="flex justify-between items-center border-b-2 border-slate-100 pb-3 mb-8">
                            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wider">Experience</h2>
                            <button
                                onClick={() => setResumeData({...resumeData, experience: [...resumeData.experience, {company:"", role:"", startDate:"", endDate:"", bullets:[""]}]})}
                                className="text-xs font-bold bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition shadow-md"
                            >+ Add Role</button>
                        </div>
                        {resumeData.experience.map((exp, i) => (
                            <div key={i} className="mb-10 p-8 bg-slate-50/50 rounded-2xl border-2 border-slate-100 space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <input className="border-2 border-white p-3 rounded-lg text-sm shadow-sm" placeholder="Company" onChange={(e) => updateExperience(i, "company", e.target.value)} />
                                    <input className="border-2 border-white p-3 rounded-lg text-sm shadow-sm" placeholder="Role" onChange={(e) => updateExperience(i, "role", e.target.value)} />
                                    <input className="border-2 border-white p-3 rounded-lg text-sm shadow-sm" placeholder="Start (YYYY-MM)" onChange={(e) => updateExperience(i, "startDate", e.target.value)} />
                                    <input className="border-2 border-white p-3 rounded-lg text-sm shadow-sm" placeholder="End (YYYY-MM or Present)" onChange={(e) => updateExperience(i, "endDate", e.target.value)} />
                                </div>
                                <div className="text-left space-y-3">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase ml-1">Key Achievements</label>
                                    {exp.bullets.map((b, bi) => (
                                        <input key={bi} className="w-full border-2 border-white p-3 rounded-lg text-sm shadow-sm mb-2" placeholder="Achievement bullet point" onChange={(e) => updateBullet(i, bi, e.target.value)} />
                                    ))}
                                    <button className="text-xs font-bold text-blue-600 hover:text-blue-800" onClick={() => addBullet(i)}>+ Add Bullet Point</button>
                                </div>
                            </div>
                        ))}
                    </section>

                    {/* Education */}
                    <section>
                        <div className="flex justify-between items-center border-b-2 border-slate-100 pb-3 mb-8">
                            <h2 className="text-xl font-bold text-slate-800 uppercase tracking-wider">Education</h2>
                            <button
                                onClick={() => addSectionItem("education", { institution: "", degree: "", year: "" })}
                                className="text-xs font-bold bg-blue-600 text-white px-5 py-2 rounded-full hover:bg-blue-700 transition"
                            >+ Add Education</button>
                        </div>
                        {resumeData.education.map((edu, i) => (
                            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                                <input className="border-2 border-slate-100 p-3 rounded-xl text-sm shadow-sm" placeholder="Institution" onChange={(e) => updateSectionItem("education", i, "institution", e.target.value)} />
                                <input className="border-2 border-slate-100 p-3 rounded-xl text-sm shadow-sm" placeholder="Degree" onChange={(e) => updateSectionItem("education", i, "degree", e.target.value)} />
                                <input className="border-2 border-slate-100 p-3 rounded-xl text-sm shadow-sm" placeholder="Year" onChange={(e) => updateSectionItem("education", i, "year", e.target.value)} />
                            </div>
                        ))}
                    </section>

                    {/* Skills Grid */}
                    <section className="grid grid-cols-1 md:grid-cols-2 gap-10">
                        <div className="text-left bg-slate-50/50 p-6 rounded-2xl border-2 border-slate-100">
                            <h2 className="text-sm font-black text-slate-700 mb-4 uppercase tracking-widest border-b border-slate-200 pb-2">Technical Skills</h2>
                            <input
                                className="w-full border-2 border-white p-3 rounded-xl text-sm shadow-sm focus:border-blue-500 outline-none"
                                placeholder="e.g. Node.js, AWS, Java"
                                onChange={(e) => updateList("technicalSkills", e.target.value)}
                            />
                        </div>
                        <div className="text-left bg-slate-50/50 p-6 rounded-2xl border-2 border-slate-100">
                            <h2 className="text-sm font-black text-slate-700 mb-4 uppercase tracking-widest border-b border-slate-200 pb-2">Soft Skills</h2>
                            <input
                                className="w-full border-2 border-white p-3 rounded-xl text-sm shadow-sm focus:border-blue-500 outline-none"
                                placeholder="e.g. Leadership, Agile"
                                onChange={(e) => updateList("softSkills", e.target.value)}
                            />
                        </div>
                    </section>

                    {/* Awards & Research */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-4">
                        <section className="text-left">
                            <h2 className="text-lg font-bold text-slate-800 mb-4">Awards & Certs</h2>
                            {resumeData.awards.map((award, i) => (
                                <div key={i} className="space-y-2 mb-4 bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
                                    <input className="w-full border p-2 rounded text-sm" placeholder="Title" onChange={(e) => updateSectionItem("awards", i, "title", e.target.value)} />
                                    <input className="w-full border p-2 rounded text-sm" placeholder="Issuer" onChange={(e) => updateSectionItem("awards", i, "issuer", e.target.value)} />
                                    <input className="w-full border p-2 rounded text-sm" placeholder="Year" onChange={(e) => updateSectionItem("awards", i, "year", e.target.value)} />
                                </div>
                            ))}
                            <button className="text-sm font-bold text-blue-600" onClick={() => addSectionItem("awards", { title: "", issuer: "", year: "" })}>+ Add Award</button>
                        </section>

                        <section className="text-left">
                            <h2 className="text-lg font-bold text-slate-800 mb-4">Research</h2>
                            {resumeData.research.map((res, i) => (
                                <div key={i} className="space-y-2 mb-4 bg-slate-50 p-4 rounded-xl border border-slate-100 shadow-sm">
                                    <input className="w-full border p-2 rounded text-sm font-semibold" placeholder="Title" onChange={(e) => updateSectionItem("research", i, "title", e.target.value)} />
                                    <textarea className="w-full border p-2 rounded text-sm h-16" placeholder="Description" onChange={(e) => updateSectionItem("research", i, "description", e.target.value)} />
                                    <input className="w-full border p-2 rounded text-sm text-blue-500" placeholder="Link (URL)" onChange={(e) => updateSectionItem("research", i, "link", e.target.value)} />
                                </div>
                            ))}
                            <button className="text-sm font-bold text-blue-600" onClick={() => addSectionItem("research", { title: "", description: "", link: "" })}>+ Add Research</button>
                        </section>
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-center pt-10 pb-6">
                        <button
                            className="bg-blue-600 hover:bg-blue-700 text-white font-black py-5 px-16 rounded-2xl shadow-xl transform transition hover:-translate-y-1 active:scale-95 disabled:bg-slate-300"
                            onClick={generateResume}
                            disabled={loading}
                        >
                            {loading ? "GENERATING DOCUMENT..." : "DOWNLOAD PROFESSIONAL CV"}
                        </button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default App;