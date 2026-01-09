import {
    Document,
    Packer,
    Paragraph,
    TextRun,
} from "docx";

export async function generateResumeDocx(data: any) {
    const doc = new Document({
        sections: [
            {
                children: [
                    new Paragraph({
                        children: [
                            new TextRun({
                                text: data.personal.fullName,
                                bold: true,
                                size: 32,
                            }),
                        ],
                    }),
                    new Paragraph(data.personal.email),
                    new Paragraph(data.summary),
                    new Paragraph("Experience"),
                    ...data.experience.flatMap((job: any) => [
                        new Paragraph({
                            children: [
                                new TextRun({ text: job.role, bold: true }),
                                new TextRun(` – ${job.company}`),
                            ],
                        }),
                        ...job.bullets.map(
                            (b: string) => new Paragraph(`• ${b}`)
                        ),
                    ]),
                ],
            },
        ],
    });

    return Packer.toBuffer(doc);
}
