import connectToDatabase from "@/lib/mongo";
import { NextRequest, NextResponse } from "next/server";
import Problem from "@/models/problem";

export async function GET(req: NextRequest,
    { params }: { params: { problemId: string } }
) {
    try {
        await connectToDatabase();

        const problemId = Number(params.problemId);

        if (isNaN(problemId) || !problemId) {
            return NextResponse.json({
                error: "Problem ID invalid"
            }, {
                status: 404
            });
        }

        const problem = await Problem.findOne({ serial: problemId });

        console.log(problem);

        if (!problem) {
            return NextResponse.json({
                error: "Problem not found"
            }, {
                status: 404
            });
        }

        return NextResponse.json({
            problem
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error fetching problem: ", error);
        return NextResponse.json({
            err: "Internal Server Error"
        }, {
            status: 500
        });
    }
}