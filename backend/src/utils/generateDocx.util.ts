import {
    Document,
    Packer,
    Paragraph,
    TextRun,
    HorizontalPositionRelativeFrom,
    VerticalPositionRelativeFrom,
    FrameWrap,
    ShadingType,
    BorderStyle,
    Table,
    TableRow,
    TableCell,
    WidthType,
    HeightRule,
    Header,
    TabStopType,
    AlignmentType
} from "docx";

export async function generateResumeDocx(data: any) {
    const doc = new Document({
        sections: [{
            properties: {
                page: {
                    margin: { top: 0, right: 0, bottom: 0, left: 0 },
                },
            },
            headers: {
                default: new Header({
                    children: [
                        new Paragraph({
                            frame: {
                                type: "absolute",
                                anchor: {
                                    horizontal: HorizontalPositionRelativeFrom.PAGE,
                                    vertical: VerticalPositionRelativeFrom.PAGE,
                                },
                                position: { x: 0, y: 0 },
                                width: 3500,
                                height: 30000,
                                wrap: FrameWrap.NONE,
                            },
                            shading: {
                                fill: "D9D9D9",
                                type: ShadingType.CLEAR,
                            },
                            children: [],
                        }),
                    ],
                }),
            },
            children: [
                new Table({
                    width: { size: 100, type: WidthType.PERCENTAGE },
                    borders: {
                        top: { style: BorderStyle.NONE },
                        bottom: { style: BorderStyle.NONE },
                        left: { style: BorderStyle.NONE },
                        right: { style: BorderStyle.NONE },
                        insideHorizontal: { style: BorderStyle.NONE },
                        insideVertical: { style: BorderStyle.NONE },
                    },
                    rows: [
                        new TableRow({
                            children: [
                                // --- LEFT COLUMN (Sidebar) ---
                                new TableCell({
                                    width: { size: 3500, type: WidthType.DXA },
                                    children: [
                                        new Paragraph({
                                            indent: { left: 400 },
                                            spacing: { before: 0 },
                                            children: [new TextRun({ text: "Kontakt", bold: true, size: 32, color: "2D7D46" })],
                                        }),
                                        new Paragraph({
                                            indent: { left: 400, right: 400 },
                                            border: { bottom: { color: "2D7D46", style: BorderStyle.SINGLE, size: 6 } },
                                            spacing: { after: 200 },
                                            children: [],
                                        }),
                                        new Paragraph({
                                            indent: { left: 400 },
                                            children: [new TextRun({ text: "📞 " + data.personal.phone, size: 18 })],
                                        }),
                                        new Paragraph({
                                            indent: { left: 400 },
                                            children: [new TextRun({ text: "✉ " + data.personal.email, size: 18 })],
                                        }),
                                        new Paragraph({
                                            indent: { left: 400 },
                                            children: [new TextRun({ text: "📍 " + data.personal.location, size: 18 })],
                                        }),
                                        new Paragraph({
                                            indent: { left: 400 },
                                            spacing: { before: 600 },
                                            children: [new TextRun({ text: "Fähigkeiten", bold: true, size: 32, color: "2D7D46" })],
                                        }),
                                        new Paragraph({
                                            indent: { left: 400, right: 400 },
                                            border: { bottom: { color: "2D7D46", style: BorderStyle.SINGLE, size: 6 } },
                                            spacing: { after: 200 },
                                            children: [],
                                        }),
                                        ...data.technicalSkills.map((skill: any) =>
                                            new Paragraph({
                                                indent: { left: 400, right: 400 },
                                                tabStops: [{ type: TabStopType.RIGHT, position: 3100 }],
                                                children: [
                                                    new TextRun({ text: skill.name, size: 18 }),
                                                    new TextRun({ text: `\t${skill.years}`, size: 18 }),
                                                ],
                                            })
                                        ),
                                        new Paragraph({
                                            indent: { left: 400 },
                                            spacing: { before: 600 },
                                            children: [new TextRun({ text: "Sprachen", bold: true, size: 32, color: "2D7D46" })],
                                        }),
                                        new Paragraph({
                                            indent: { left: 400, right: 400 },
                                            border: { bottom: { color: "2D7D46", style: BorderStyle.SINGLE, size: 6 } },
                                            spacing: { after: 200 },
                                            children: [],
                                        }),
                                        ...data.languages.map((lang: any) =>
                                            new Paragraph({
                                                indent: { left: 400, right: 400 },
                                                tabStops: [{ type: TabStopType.RIGHT, position: 3100 }],
                                                children: [
                                                    new TextRun({ text: lang.name, size: 18 }),
                                                    new TextRun({ text: `\t${lang.level}`, size: 18 }),
                                                ],
                                            })
                                        ),
                                        new Paragraph({
                                            indent: { left: 400 },
                                            spacing: { before: 600 },
                                            pageBreakBefore: true,
                                            children: [new TextRun({ text: "Bildung", bold: true, size: 32, color: "2D7D46" })],
                                        }),
                                        new Paragraph({
                                            indent: { left: 400, right: 400 },
                                            border: { bottom: { color: "2D7D46", style: BorderStyle.SINGLE, size: 6 } },
                                            spacing: { after: 200 },
                                            children: [],
                                        }),
                                        ...data.education.map((edu: any) => [
                                            new Paragraph({ indent: { left: 400 }, children: [new TextRun({ text: edu.degree, bold: true, size: 18 })] }),
                                            new Paragraph({ indent: { left: 400 }, children: [new TextRun({ text: edu.institution, size: 18 })] }),
                                            new Paragraph({ indent: { left: 400 }, spacing: { after: 200 }, children: [new TextRun({ text: `${edu.year || ''}`, size: 18 })] }),
                                        ]).flat(),
                                    ],
                                }),
                                // --- RIGHT COLUMN (Experience Layout Update) ---
                                new TableCell({
                                    width: { size: 8500, type: WidthType.DXA },
                                    children: [
                                        new Paragraph({
                                            indent: { left: 600, right: 600 },
                                            spacing: { before: 0, after: 200 },
                                            children: [new TextRun({ text: data.personal.fullName.toUpperCase(), size: 40, bold: true })],
                                        }),
                                        new Paragraph({
                                            indent: { left: 600, right: 600 },
                                            children: [new TextRun({ text: data.experience[0].role, bold: true, size: 30 })],
                                            spacing: { after: 400, before: 200 },
                                        }),
                                        new Paragraph({
                                            indent: { left: 600, right: 600 },
                                            children: [new TextRun({ text: "Über mich", bold: true, size: 32 })],
                                        }),
                                        new Paragraph({
                                            indent: { left: 600, right: 600 },
                                            children: [new TextRun({ text: data.summary, size: 20 })],
                                            spacing: { after: 400, before:100 },
                                        }),
                                        // --- RIGHT COLUMN: BERUFSERFAHRUNG Section ---
                                        new Paragraph({
                                            indent: { left: 600, right: 600 },
                                            children: [new TextRun({ text: "Berufserfahrung", bold: true, size: 32 })],
                                            spacing: { after: 200 },
                                        }),
                                        ...data.experience.map((exp: any, index: number) => [
                                            // 1. Role and Date Line (Role is bold, Date is right-aligned)
                                            new Paragraph({
                                                indent: { left: 600, right: 600 },
                                                spacing: { before: 200 },
                                                tabStops: [{ type: TabStopType.RIGHT, position: 8000 }],
                                                children: [
                                                    new TextRun({ text: exp.role, bold: true, size: 22 }), // Role Style
                                                    new TextRun({ text: `\t${exp.startDate} - ${exp.endDate}`, size: 18 }),
                                                ],
                                            }),
                                            // 2. Company Line (Bold as per Image 1)
                                            new Paragraph({
                                                indent: { left: 600, right: 600 },
                                                children: [new TextRun({ text: exp.company, bold: true, size: 18 })],
                                            }),
                                            // 3. Bullet Points
                                            ...exp.bullets.map((bullet: string) =>
                                                new Paragraph({
                                                    indent: { left: 900, right: 600 },
                                                    spacing: { before: 40 },
                                                    children: [new TextRun({ text: `• ${bullet}`, size: 18 })],
                                                })
                                            ),
                                            // 4. Skills Line (Bold label + list)
                                            new Paragraph({
                                                indent: { left: 600, right: 600 },
                                                spacing: { before: 100, after: 200 },
                                                children: [
                                                    new TextRun({ text: "Skills: ", bold: true, size: 18 }),
                                                    new TextRun({ text: exp.skills, size: 18 }) // Using your JSON key "skils"
                                                ],
                                            }),
                                        ]).flat(),
                                    ],
                                }),
                            ],
                        }),
                    ],
                }),
            ],
        }],
    });

    return Packer.toBuffer(doc);
}