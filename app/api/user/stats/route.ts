import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "@/helpers/constants";
import connectToDatabase from "@/lib/mongo";
import user from "@/models/user";
import mongoose from "mongoose";
import Submission from "@/models/submission";
import Score from "@/models/score";

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
            const userInfo = await user.findOne({ _id: new mongoose.Types.ObjectId((isUser as any).id) });
            userId = userInfo._id;
        }

        if (!userId) {
            return NextResponse.json({
                error: "User id not found",
            }, {
                status: 400
            });;
        }

        const solvedProblems = await Submission.aggregate([
            { $match: { userId: new mongoose.Types.ObjectId(userId), isCorrect: true } },
            { 
                $lookup: {
                    from: "problems",
                    localField: "problemId",
                    foreignField: "serial",
                    as: "problemDetails",
                }
            },
            { $unwind: "$problemDetails" },
            { 
                $group: {
                    _id: "$problemDetails.difficulty",
                    count: { $sum: 1 }
                }
            }
        ]);

        let totalSolved = 0;
        let easySolved = 0, mediumSolved = 0, hardSolved = 0;

        solvedProblems.forEach(({ _id, count }) => {
            totalSolved += count;
            if (_id === "EASY") easySolved = count;
            if (_id === "MEDIUM") mediumSolved = count;
            if (_id === "HARD") hardSolved = count;
        });

        const scores = await Score.find({ user: userId });

        let totalMCQs = 0;
        let totalScore = 0;
        let totalTimeTaken = 0;

        scores.forEach(({ total, score, timeTaken }) => {
            totalMCQs += total;
            totalScore += score;
            totalTimeTaken += timeTaken;
        });

        const avgTimePerQuestion = totalMCQs > 0 ? totalTimeTaken / totalMCQs : 0;
        const accuracy = totalMCQs > 0 ? (totalScore / totalMCQs) * 100 : 0;

        return NextResponse.json({
            totalSolved,
            easySolved,
            mediumSolved,
            hardSolved,
            totalMCQs,
            totalScore,
            avgTimePerQuestion: avgTimePerQuestion.toFixed(2),
            accuracy: accuracy.toFixed(2)
        }, { status: 200 });
    } catch (error) {
        console.error("Server error:", error);
        return NextResponse.json({
            error: "Internal Server Error"
        }, {
            status: 500
        });
    }
}