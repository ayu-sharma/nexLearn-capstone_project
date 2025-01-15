import { testCaseSchema } from "@/helpers/zod";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();
        const parsedBody = testCaseSchema.safeParse(body);

        if (!parsedBody.success) {
            return NextResponse.json({
                error: "Invalid inputs",
            }, {
                status: 400
            });
        }

        const { problemId, input, expected } = parsedBody.data;

        const problem = await db.problem.findUnique({
            where: {
                id: problemId
            }
        });

        if (!problem) {
            return NextResponse.json({
                error: "DSA problem not found"
            }, {
                status: 404
            });
        }

        const testCase = await db.testCase.create({
            data: {
                problemId,
                input,
                expected
            }
        });

        return NextResponse.json({
            message: "Successfully created new testcase",
            testCase
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