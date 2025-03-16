import { NextRequest, NextResponse } from "next/server";
import connectToDatabase from "@/lib/mongo";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "@/helpers/constants";
import Score from "@/models/score";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const authHeader = req.headers.get('authorization') || '';
        const { material, score, total, timeTaken } = await req.json();

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

        const existingScore = await Score.findOne({ user: userId, material });
        if (existingScore) {
            existingScore.score = score;
            existingScore.total = total;
            existingScore.timeTaken = timeTaken;
            await existingScore.save();

            return NextResponse.json({
                message: "Score updated successfully!",
                updatedScore: existingScore
            }, { status: 200 });
        } else {
            const newScore = new Score({
                user: userId,
                material,
                score,
                total,
                timeTaken
            });
    
            await newScore.save();

            return NextResponse.json({
                message: "User score saved!",
                newScore
            }, {
                status: 201
            });
        }
    } catch (error) {
        console.error("Score POST failed: ", error);
        return NextResponse.json({
            error: "Internal Server Error",
            operation: "Score POST"
        }, {
            status: 500
        });
    }
}