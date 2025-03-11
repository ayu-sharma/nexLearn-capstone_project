import connectToDatabase from "@/lib/mongo";
import topic from "@/models/topic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const { name, order } = await req.json();

        const newTopic = new topic({
            name,
            order
        });

        await newTopic.save();

        return NextResponse.json({
            message: "New topic added"
        }, {
            status: 201
        });
    } catch (error) {
        console.error("Something went wrong: ", error);
        return NextResponse.json({
            err: "Internal Server error",
        }, {
            status: 500
        });
    }
}