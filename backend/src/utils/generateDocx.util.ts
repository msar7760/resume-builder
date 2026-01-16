import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    AlignmentType,
    BorderStyle,
    HeadingLevel, ExternalHyperlink,
} from "docx";

export async function generateResumeDocx(data: any) {
    // Helper to create section headers with a bottom border
    const createHeader = (text: string) => new Paragraph({
        text: text.toUpperCase(),
        heading: HeadingLevel.HEADING_2,
        spacing: { before: 240, after: 120 },
        border: {
            bottom: { color: "000000", space: 1, style: BorderStyle.SINGLE, size: 6 },
        },
    });

    const doc = new Document({
        sections: [{
            properties: {},
            children: [
                // NAME
                new Paragraph({
                    alignment: AlignmentType.CENTER,
                    children: [
                        new TextRun({
                            text: data.personal.fullName,
                            bold: true,
                            size: 48, // 24pt
                        }),
                    ],
                }),

                // CONTACT INFO (Email | Phone | Location | LinkedIn)
                new Paragraph({
                    alignment: "center",
                    children: [
                        new TextRun(`${data.personal.email}  |  ${data.personal.phone}  |  ${data.personal.location}`),
                        ...(data.personal.linkedin ? [
                            new TextRun("  |  "),
                            new ExternalHyperlink({
                                children: [
                                    new TextRun({
                                        text: "LinkedIn Profile",
                                        color: "0000FF",
                                        underline: { type: "single" },
                                    }),
                                ],
                                link: data.personal.linkedin,
                            })
                        ] : []),
                    ],
                }),

                // SUMMARY
                createHeader("Professional Summary"),
                new Paragraph({
                    children: [new TextRun(data.summary)],
                    alignment: AlignmentType.JUSTIFIED,
                }),

                // EXPERIENCE
                createHeader("Work Experience"),
                ...data.experience.flatMap((job: any) => [
                    new Paragraph({
                        spacing: { before: 200, after: 120 }, // Spacing for clear hierarchy
                        children: [
                            new TextRun({
                                text: job.role,
                                bold: true,
                                size: 24
                            }),
                            new TextRun({
                                text: ` | `, // The separator
                                bold: true,
                                size: 24
                            }),
                            new TextRun({
                                text: job.company,
                                italics: true, // Italicize company for professional contrast
                                size: 24
                            }),
                            // Date pushed to the far right
                            new TextRun({
                                text: `\t${job.startDate} – ${job.endDate}`,
                                bold: true
                            }),
                        ],
                        tabStops: [{ type: "right", position: 9000 }],
                    }),

                    // Bullet points
                    ...job.bullets.map((bullet: string) => new Paragraph({
                        text: bullet,
                        bullet: { level: 0 },
                        indent: { left: 720, hanging: 360 },
                    })),
                ]),

                // EDUCATION
                createHeader("Education"),
                ...data.education.flatMap((edu: any) => [
                    new Paragraph({
                        // Adds gap before each new educational entry
                        spacing: { before: 200 },
                        children: [
                            new TextRun({ text: edu.institution, bold: true }),
                            new TextRun({ text: `\t${edu.year}`, bold: true }),
                        ],
                        tabStops: [{ type: "right", position: 9000 }],
                    }),
                    new Paragraph({
                        text: edu.degree,
                        spacing: { after: 100 } // Small space after the degree
                    }),
                ]),

                // SKILLS
                createHeader("Skills"),
                // Technical Skills Row
                new Paragraph({
                    spacing: { before: 120 },
                    children: [
                        new TextRun({ text: "Technical Skills: ", bold: true }),
                        new TextRun(data.technicalSkills.join(", ")),
                    ],
                }),
                // Soft Skills Row
                new Paragraph({
                    spacing: { before: 80 },
                    children: [
                        new TextRun({ text: "Soft Skills: ", bold: true }),
                        new TextRun(data.softSkills.join(", ")),
                    ],
                }),

                // AWARDS SECTION
                createHeader("Awards & Certificates"),
                ...data.awards.map((award: any) => new Paragraph({
                    // Adds a gap between each certificate/award
                    spacing: { before: 120 },
                    children: [
                        new TextRun({ text: award.title, bold: true }),
                        new TextRun({ text: `\t${award.issuer} (${award.year})` }),
                    ],
                    tabStops: [{ type: "right", position: 9000 }],
                })),

                // RESEARCH SECTION
                createHeader("Research & Publications"),
                ...data.research.flatMap((res: any) => [
                    new Paragraph({
                        // Gap before the research title
                        spacing: { before: 200 },
                        children: [
                            new TextRun({ text: res.title, bold: true }),
                        ],
                    }),
                    new Paragraph({
                        spacing: { after: 120 }, // Gap after the entry is finished
                        children: [
                            new TextRun({ text: res.description }),
                            ...(res.link ? [
                                new TextRun(" "),
                                new ExternalHyperlink({
                                    children: [new TextRun({ text: "[View Publication]", color: "0000FF", underline: {} })],
                                    link: res.link
                                })
                            ] : [])
                        ],
                    })
                ])
            ],
        }],
    });

    return Packer.toBuffer(doc);
}