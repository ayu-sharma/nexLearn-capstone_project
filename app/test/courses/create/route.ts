import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { courseSchema } from "@/helpers/zod";

export async function POST (request: NextRequest) {
    try {
        const body = await request.json();
        const parsedBody = courseSchema.safeParse(body);

        if (!parsedBody.success) {
            return NextResponse.json({
                error: "Invalid inputs",
            }, {
                status: 400
            });
        }

        const { title, description, type, goal } = parsedBody.data;

        const newCourse = await db.course.create({
            data: {
                title, 
                type, 
                goal,
                description
            },
        });

        return NextResponse.json({
            msg: "Successfully created new course",
            newCourse
        }, {
            status: 201
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create course' }, { status: 500 });
    }
}