import connectToDatabase from "@/lib/mongo";
import Course from "@/models/course";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const { title, description, type } = await req.json();

        const newCourse = new Course({
            title,
            description,
            type
        });

        await newCourse.save();

        return NextResponse.json({
            message: "New Course added!"
        }, {
            status: 201
        });
    } catch (error) {
        console.error("Course creation failed: ", error);
        return NextResponse.json({
            err: "Internal Server error",
        }, {
            status: 500
        });
    }
}