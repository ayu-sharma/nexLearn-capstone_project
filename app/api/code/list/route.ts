import connectToDatabase from "@/lib/mongo";
import Problem from "@/models/problem";
import Topic from "@/models/topic";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        const topics = await Topic.find().sort({ order: 1 });

        const topicsWithProblems = await Promise.all(
            topics.map(async (topic) => {
                const problems = await Problem.find({ _id: { $in: topic.problems } });
                return { ...topic.toObject(), problems };
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