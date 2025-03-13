import connectToDatabase from "@/lib/mongo";
import Course from "@/models/course";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        await connectToDatabase();

        const allCourses = await Course.find();

        return NextResponse.json({
            allCourses
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Courses fetch failed: ", error);
        return NextResponse.json({
            err: "Internal Server error",
        }, {
            status: 500
        });
    }
}