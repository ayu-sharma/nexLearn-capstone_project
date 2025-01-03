import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { moduleSchema } from "@/helpers/zod";

export async function POST (request: NextRequest) {
    try {
        const body = await request.json();
        const parsedBody = moduleSchema.safeParse(body);

        if (!parsedBody.success) {
            return NextResponse.json({
                error: "Invalid inputs",
            }, {
                status: 400
            });
        }

        const { title, courseId, index } = parsedBody.data;

        const course = await db.course.findUnique({
            where: {
                id: courseId
            }
        });

        if (!course) {
            return NextResponse.json({
                error: "No course found",
            }, {
                status: 404
            });
        }

        const newModule = await db.module.create({
            data: {
                courseId,
                title,
                index
            }
        });

        return NextResponse.json({
            msg: "Successfully created new module",
            newModule
        }, {
            status: 201
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to create module' }, { status: 500 });
    }
}