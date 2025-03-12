import connectToDatabase from "@/lib/mongo";
import Problem from "@/models/problem";
import Topic from "@/models/topic";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "@/helpers/constants";
import { NextRequest, NextResponse } from "next/server";
import user from "@/models/user";
import mongoose from "mongoose";
import Submission from "@/models/submission";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        const authHeader = req.headers.get('authorization') || '';
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return NextResponse.json({
                error: 'Bearer token not found'
            }, {
                status: 403
            });
        }

        const token = authHeader.split(' ')[1];
        const isUser = verify(token, JWT_SECRET);

        let userId;
        if (isUser) {
            const decoded = verify(token, JWT_SECRET) as { id: string };
            userId = decoded.id;
        } else {
            return NextResponse.json({
                message: "You are not logged in"
            }, {
                status: 400
            });
        }

        const topics = await Topic.find().sort({ order: 1 });

        const topicsWithProblems = await Promise.all(
            topics.map(async (topic) => {
                const problems = await Problem.find({ _id: { $in: topic.problems } });
                const problemsWithSolvedStatus = await Promise.all(
                    problems.map(async (problem) => {
                        const submission = await Submission.findOne({
                            userId: userId,
                            problemId: problem.serial,
                            isCorrect: true
                        });

                        return {
                            ...problem.toObject(),
                            isSolved: !!submission
                        }
                    })
                );
                return {
                    ...topic.toObject(),
                    problems: problemsWithSolvedStatus
                }
            })
        );

        console.log(topicsWithProblems);

        return NextResponse.json({
            topicsWithProblems
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error fetching dsa list: ", error);
        return NextResponse.json({
            err: "Internal Server Error"
        }, {
            status: 500
        });
    }
}