import { dsaProblemSchema, dsaTopicSchema } from "@/helpers/zod";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parsedBody = dsaProblemSchema.safeParse(body);

        if (!parsedBody.success) {
            return NextResponse.json({
                error: "Invalid inputs",
            }, {
                status: 400
            });
        }

        const { 
            topicId, 
            title, 
            difficulty, 
            problemStatement,
            sampleInput1,
            sampleInput2,
            sampleOutput1,
            sampleOutput2,
        } = parsedBody.data;

        const topic = await db.dSATopic.findUnique({
            where: {
                id: topicId
            }
        });

        if (!topic) {
            return NextResponse.json({
                error: "DSA topic not found"
            }, {
                status: 404
            });
        }

        const problem = await db.problem.create({
            data: {
                topicId,
                title,
                problemStatement,
                difficulty,
                sampleInput1,
                sampleInput2,
                sampleOutput1,
                sampleOutput2
            }
        });

        return NextResponse.json({
            message: "Successfully created new DSA problem",
            problem
        }, {
            status: 201
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "Internal Server Error"
        }, {
            status: 500
        });
    }
}