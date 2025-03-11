import connectToDatabase from "@/lib/mongo";
import Problem from "@/models/problem";
import Topic from "@/models/topic";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const {
            title,
            serial,
            difficulty,
            problemStatement,
            sampleInput1,
            sampleInput2,
            sampleOutput1,
            sampleOutput2,
            topic
        } = await req.json();

        const newProblem = new Problem({
            title,
            serial,
            difficulty,
            problemStatement,
            sampleInput1,
            sampleInput2,
            sampleOutput1,
            sampleOutput2,
            topic
        });

        await newProblem.save();

        const updatedTopic = await Topic.findByIdAndUpdate(
            topic,  // Find the topic by ID
            { $push: { problems: newProblem._id } }, // Push the problem ID into the problems array
            { new: true, runValidators: true } // Return updated document
        );

        if (!updatedTopic) {
            return NextResponse.json(
                { err: "Topic not found" },
                { status: 404 }
            );
        }

        return NextResponse.json({
            message: "New problem added",
            newProblem,
            updatedTopic
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