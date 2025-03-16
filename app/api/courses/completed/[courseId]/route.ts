import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "@/helpers/constants";
import connectToDatabase from "@/lib/mongo";
import user from "@/models/user";
import mongoose from "mongoose";
import Enrollment from "@/models/enrollment";

export async function GET(req: NextRequest,
    { params }: { params: { courseId: string } }
) {
    try {
        await connectToDatabase();

        const  { courseId } = params;
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

        let idUser;
        if (isUser) {
            const userInfo = await user.findOne({ _id: new mongoose.Types.ObjectId((isUser as any).id) });
            idUser = userInfo._id;
        }

        if (!idUser) {
            return NextResponse.json({
                error: "User id not found",
            }, {
                status: 400
            });;
        }

        const enrolled = await Enrollment.findOne({
            userId: idUser,
            course: courseId
        });

        const completed = enrolled.completedMaterials;

        return NextResponse.json({
            completedMaterials: completed.map((c: { materialId: mongoose.Types.ObjectId }) => c.materialId)
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Error fetching enrollments:", error);
        return NextResponse.json({ 
            error: "Internal Server Error" 
        }, { 
            status: 500 
        });
    }
}