import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const problemsFilePath = path.join(process.cwd(), "data", "problems.json");

export function getProblemById(problemId: number) {
    try {
        const data = fs.readFileSync(problemsFilePath, "utf8");
        const parsed = JSON.parse(data);
        const problem = parsed.problems.find((p: { id: number }) => p.id === problemId);

        if (!problem) {
            throw new Error(`Problem with ID ${problemId} not found`);
        }

        return problem;
    } catch (error) {
        console.error("Error reading problems.json:", error);
        return null;
    }
}

export async function GET(req: NextRequest, 
    { params }: { params: { problemId: string }}
) {
    try {
        const { problemId } = params;
        const problem = getProblemById(Number(problemId));

        if (!problem) {
            return NextResponse.json({ error: "Problem not found" }, {status: 404});
        }

        return NextResponse.json(problem, {status: 200});
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({err: "Internal Server Err"}, {status: 500});
    }
}