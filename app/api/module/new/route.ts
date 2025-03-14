import connectToDatabase from "@/lib/mongo";
import Course from "@/models/course";
import Module from "@/models/module";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const { course, index, title } = await req.json();
        
        const newModule = new Module({
            course,
            index,
            title
        });

        await newModule.save();

        await Course.findByIdAndUpdate(course, {
            $push: { modules: newModule._id }
        });

        return NextResponse.json({
            message: "New module added!",
            newModule
        }, {
            status: 201
        });
    } catch (error) {
        console.error("Module creation failed: ", error);
        return NextResponse.json({
            error: "Internal Server Error"
        }, {
            status: 500
        });
    }
}
