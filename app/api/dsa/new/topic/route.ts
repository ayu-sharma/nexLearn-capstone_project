import { dsaTopicSchema } from "@/helpers/zod";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parsedBody = dsaTopicSchema.safeParse(body);

        if (!parsedBody.success) {
            return NextResponse.json({
                error: "Invalid inputs",
            }, {
                status: 400
            });
        }

        const { title } = parsedBody.data;

        const topic = await db.dSATopic.create({
            data: {
                title
            }
        });

        return NextResponse.json({
            message: "Added new topic successfully",
            topic
        }, {
            status: 201
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            err: "Internal Server error"
        }, {
            status: 500
        });
    }
}