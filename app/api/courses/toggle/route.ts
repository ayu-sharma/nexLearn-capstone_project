import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "@/helpers/constants";
import connectToDatabase from "@/lib/mongo";
import user from "@/models/user";
import mongoose from "mongoose";
import Enrollment from "@/models/enrollment";
import Material from "@/models/material";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const { courseId, materialId } = await req.json();
        
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

        const findMaterial = await Material.findById(materialId);
        if (!findMaterial) {
            return NextResponse.json({
                error: "Material not found",
            }, {
                status: 404
            });
        }
        let enrollment = await Enrollment.findOne({userId: userId, course: courseId});
        console.log(enrollment)

        if (!enrollment) {
            return NextResponse.json({ 
                message: "Enrollment not found." 
            }, {
                status: 400
            });
        }

        const materialObjectId = new mongoose.Types.ObjectId(materialId);

        const isCompleted = enrollment.completedMaterials.some((entry: any) => entry.materialId.equals(materialObjectId));

        if (isCompleted) {
            enrollment.completedMaterials = enrollment.completedMaterials.filter((entry: any) => !entry.materialId.equals(materialObjectId));
        } else {
            enrollment.completedMaterials.push({ materialId: materialObjectId });
        }

        await enrollment.save();

        return NextResponse.json({
            message: isCompleted ? "Material unmarked as completed." : "Material marked as completed.",
            enrollment
        }, { 
            status: 200 
        });
    } catch (error) {
        console.error("Error toggling material completion:", error);
        return NextResponse.json({ 
            message: "Internal server error." 
        }, { 
            status: 500 
        });
    }
}