import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest,
    { params }: { params: { materialId: string }}
) {
    try {
        const { materialId } = params;

        const material = await db.material.findUnique({
            where: {
                id: materialId
            },
            include: {
                questions: {
                    include: {
                        questions: true
                    }
                }
            }
        });

        if (!material) {
            return NextResponse.json({
                error: "Material not found"
            }, {
                status: 404
            });
        }

        return NextResponse.json({
            allQuestions: material.questions[0].questions
        }, {
            status: 201
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Something went wrong"
        }, {
            status: 500
        });
    }
}