import { NextRequest, NextResponse } from 'next/server';
import { materialSchema } from "@/helpers/zod";
import { db } from "@/lib/db";

export async function POST (request: NextRequest, { params }: { params: { moduleId: string } }) {
    try {
        const { moduleId } = params;
        
        if (!moduleId) {
            return NextResponse.json(
              { error: "Invalid moduleId" },
              { status: 400 }
            );
        }

        const body = await request.json();
        const parsedBody = materialSchema.safeParse(body);

        if (!parsedBody.success) {
            return NextResponse.json({
                error: parsedBody.error.message
            }, {
                status: 400
            });
        }

        const { type, title, videoUrl, content, questions } = parsedBody.data;

        let materialData: any = {
            type,
            title,
            moduleId: moduleId
        }

        if (type === "VIDEO") {
            materialData.videoUrl = videoUrl;
        } else if (type === "READING") {
            materialData.content = content;
        } else if (type === "ASSESSMENT") {
            const material = await db.material.create({
                data: materialData
            });

            if (Array.isArray(questions)) {
                await db.assessment.create({
                    data: {
                        materialId: material.id,
                        questions: {
                            create: questions.map((question: any) => ({
                                text: question.text,
                                optionA: question.optionA,
                                optionB: question.optionB,
                                optionC: question.optionC,
                                optionD: question.optionD,
                                correctAnswer: question.correctAnswer,
                            })),
                        }
                    }
                })
            } else {
                throw new Error('Questions must be an array');
            }
            
            return NextResponse.json({
                message: 'Assessment material created successfully'
            }, {
                status: 201
            });
        }

        const material = await db.material.create({
            data: materialData
        });

        return NextResponse.json({
            message: "Material created successfully",
            material,
        }, {
            status: 201
        });
        
    } catch (error) {
        return NextResponse.json({
            error: "Material creation failed",
            err: error
        }, {
            status: 500
        });
    }
}