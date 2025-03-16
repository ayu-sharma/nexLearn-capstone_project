import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "@/helpers/constants";
import connectToDatabase from "@/lib/mongo";
import user from "@/models/user";
import mongoose from "mongoose";
import Enrollment from "@/models/enrollment";
import Material from "@/models/material";
import Module from "@/models/module";

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

        const enrolledCourses = await Enrollment.find({ userId: userId }).populate("course");

        const coursesWithProgress = await Promise.all(
            enrolledCourses.map(async (enrollment) => {
                const courseId = enrollment.course._id;

                // Fetch all modules for the course
                const courseModules = await Module.find({ course: courseId }).select("_id");

                // Extract module IDs
                const moduleIds = courseModules.map((module) => module._id);
                
                // Get total materials in the course
                const totalMaterials = await Material.countDocuments({ module: { $in: moduleIds } });
                
                // Get completed materials count
                const completedMaterialsCount = enrollment.completedMaterials.length;
                
                // Calculate completion percentage
                const completionPercentage = totalMaterials > 0 ? (completedMaterialsCount / totalMaterials) * 100 : 0;

                return {
                    course: enrollment.course,
                    completionPercentage: completionPercentage.toFixed(0), // Rounded to 2 decimal places
                };
            })
        );

        return NextResponse.json({ courses: coursesWithProgress }, { status: 200 });
        // course id's => enrolledCourses.course
        // use this to fetch all enrolled courses
    } catch (error) {
        console.error("Error fetching enrolled courses:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}