import connectToDatabase from "@/lib/mongo";
import topic from "@/models/topic";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        await connectToDatabase();

        const topics = await topic.find().sort({ order: 1 });

        console.log(topics);

        return NextResponse.json({
            topics
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