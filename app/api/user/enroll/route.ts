import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "@/helpers/constants";
import connectToDatabase from "@/lib/mongo";
import user from "@/models/user";
import mongoose from "mongoose";
import Enrollment from "@/models/enrollment";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const { course } = await req.json();

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

        const existingEnrollment = await Enrollment.findOne({
            course: course,
            userId: userId
        });

        if (existingEnrollment) {
            return NextResponse.json({
                message: "Already Enrolled!",
            }, {
                status: 400
            });
        }

        const newEnrolment = new Enrollment({
            course,
            userId
        });

        await newEnrolment.save();

        return NextResponse.json({
            message: "New Course Enrolled!",
        }, {
            status: 201
        });
    } catch (error) {
        console.error("Enrollment failed:", error);
        return NextResponse.json({
            error: error
        }, {
            status: 500
        });
    }
}