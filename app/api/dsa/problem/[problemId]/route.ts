import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest,
    { params }: { params: { problemId: string } }
) {
    try {
        const problemId = Number(params.problemId);

        if (isNaN(problemId) || !problemId) {
            return NextResponse.json({
                error: "Problem ID invalid"
            }, {
                status: 404
            });
        }

        const problem = await db.problem.findUnique({
            where: {
                id: problemId
            }
        });

        return NextResponse.json({
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