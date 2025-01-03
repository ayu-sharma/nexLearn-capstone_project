import { NextRequest, NextResponse } from 'next/server';
import { materialSchema } from "@/helpers/zod";
import { db } from "@/lib/db";

export async function POST (request: NextRequest) {
    try {

        const body = await request.json();
        const parsedBody = materialSchema.safeParse(body);

        if (!parsedBody.success) {
            return NextResponse.json({
                error: parsedBody.error.message
            }, {
                status: 400
            });
        }

        const { type, title, videoUrl, content, questions, moduleId } = parsedBody.data;

        const module = await db.module.findUnique({
            where: {
                id: moduleId
            }
        });

        if (!module) {
            return NextResponse.json({
                error: "No module found"
            }, {
                status: 404
            });
        }

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