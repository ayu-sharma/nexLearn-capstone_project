import connectToDatabase from "@/lib/mongo";
import Course from "@/models/course";
require("@/models/module");
require("@/models/material");
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,
    { params }: { params: { courseId: string } }
) {
    try {
        await connectToDatabase();
        
        const { courseId } = params;
        if (!courseId || courseId === undefined) {
            return NextResponse.json({
                error: "Course ID not valid"
            }, {
                status: 400
            });
        }

        const myCourse = await Course.find({_id: courseId})
        .populate({
            path: "modules",
            populate: { path: "materials" }
        });

        return NextResponse.json({
            myCourse
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Course GET failed: ", error);
        return NextResponse.json({
            error
        }, {
            status: 500
        });
    }
}