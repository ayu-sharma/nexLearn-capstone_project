import { courseSchema } from "@/helpers/zod";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const courses = await db.course.findMany({
            include: {
                modules: true
            }
        });

        return NextResponse.json({
            courses
        }, {
            status: 201
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: 'Failed to fetch courses'
        }, {
            status: 500
        });
    }
}

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parsedBody = courseSchema.safeParse(body);

        if (!parsedBody.success) {
            return NextResponse.json({
                error: parsedBody.error.message
            }, {
                status: 400
            });
        }

        const { title, goal, type, description } = parsedBody.data;

        const newCourse = await db.course.create({
            data: {
                title, 
                type, 
                goal,
                description
            },
        });

        return NextResponse.json({
            msg: "Success",
            newCourse
        }, {
            status: 201
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
    }
}