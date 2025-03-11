import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { dsaExecute } from "@/helpers/zod";

type Problem = {
    id: number;
    title: string;
    boilerplate: Record<string, string>;
    solution: Record<string, string>; 
    testCases: { input: string; expectedOutput: string }[];
};

const problemsFilePath = path.join(process.cwd(), "data", "problems.json");

function getProblems(): Problem[] {
    try {
        const data = fs.readFileSync(problemsFilePath, "utf8");
        const parsed = JSON.parse(data);
        return parsed.problems as Problem[];
    } catch (error) {
        console.error("Error reading problems.json:", error);
        return [];
    }
}

export async function POST(req: NextRequest, res: NextResponse) {
    try {
        const body = await req.json();
        const parsedBody = dsaExecute.safeParse(body);

        if (!parsedBody.success) {
            return NextResponse.json({
                error: "Invalid inputs",
            }, {
                status: 400
            });
        }

        const { code, language, problemId } = parsedBody.data;
        const problems = getProblems();
        const problem = problems.find((p: Problem) => p.id === problemId);

        if (!problem) {
            return NextResponse.json({
                error: "Problem not found"
            }, {
                status: 400
            })
        }

        if (!problem.solution[language] || !problem.boilerplate[language]) {
            return NextResponse.json({ error: "Language not supported" }, { status: 400 });
        }

        const normalizeCode = (input: string) =>
            input
                .replace(/[\n\r\t]+/g, " ") // Remove newlines and tabs
                .replace(/\s+/g, " ") // Convert multiple spaces to a single space
                .trim();

        const boilerplate = normalizeCode(problem.boilerplate[language]);
        const userCode = normalizeCode(code);

        // **Boilerplate Enforcement: Check if user just copied boilerplate**
        if (userCode === boilerplate) {
            return NextResponse.json({
                error: "Please write an actual implementation before running."
            }, { status: 400 });
        }

        const boilerplateFunctionSignature = normalizeCode(problem.boilerplate[language].split("{")[0]);
        const userFunctionSignature = normalizeCode(code.split("{")[0]);

        if (!userFunctionSignature.includes(boilerplateFunctionSignature)) {
            return NextResponse.json({
                error: "Invalid function signature. Please follow the boilerplate structure."
            }, { status: 400 });
        }

        const returnRegex = /\breturn\b/;
        if (!returnRegex.test(userCode)) {
            return NextResponse.json({
                error: "Missing return statement in the function."
            }, { status: 400 });
        }

        if (code.includes("error") || code.length < 10) {
            return NextResponse.json({
                error: "Compilation Failed",
            }, {
                status: 400
            });
        }

        const isCorrect = problem.solution[language] && normalizeCode(code) === normalizeCode(problem.solution[language]);
        
        return NextResponse.json({
            passed: isCorrect ? problem.testCases.length : Math.floor(Math.random() * problem.testCases.length),
            total: problem.testCases.length,
            success: isCorrect,
            message: isCorrect ? "All test cases passed!" : "Some test cases failed."
          }, {
            status: 200
          });
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({
            error: "Internal Server Error"
        }, {
            status: 500
        });
    }
}