"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateResumeDocx = generateResumeDocx;
const docx_1 = require("docx");
async function generateResumeDocx(data) {
    const doc = new docx_1.Document({
        sections: [
            {
                children: [
                    new docx_1.Paragraph({
                        children: [
                            new docx_1.TextRun({
                                text: data.personal.fullName,
                                bold: true,
                                size: 32,
                            }),
                        ],
                    }),
                    new docx_1.Paragraph(data.personal.email),
                    new docx_1.Paragraph(data.summary),
                    new docx_1.Paragraph("Experience"),
                    ...data.experience.flatMap((job) => [
                        new docx_1.Paragraph({
                            children: [
                                new docx_1.TextRun({ text: job.role, bold: true }),
                                new docx_1.TextRun(` – ${job.company}`),
                            ],
                        }),
                        ...job.bullets.map((b) => new docx_1.Paragraph(`• ${b}`)),
                    ]),
                ],
            },
        ],
    });
    return docx_1.Packer.toBuffer(doc);
}
//# sourceMappingURL=generateDocx.util.js.map