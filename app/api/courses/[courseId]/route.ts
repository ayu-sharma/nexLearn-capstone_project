import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET (req: NextRequest,
    { params }: { params: { courseId: string } }
) {
    try {
        const { courseId } = params;

        if (!courseId) {
            return NextResponse.json({
                error: "Course ID is required"
            }, {
                status: 400
            });
        }

        const course = await db.course.findUnique({
            where: {
                id: courseId
            },
            include: {
                modules: {
                    include: {
                        materials: {
                            include: {
                                questions: {
                                    include: {
                                        questions: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        if (!course) {
            return NextResponse.json({
                error: "Course not found",
            }, {
                status: 404
            });
        }

        return NextResponse.json({
            course,
        }, {
            status: 201
        });
    } catch (error) {
        console.error("Course GET failed");
        return NextResponse.json({
            error
        }, {
            status: 500
        });
    }
}