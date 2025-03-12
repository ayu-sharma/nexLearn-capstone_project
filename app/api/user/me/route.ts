import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "@/helpers/constants";
import connectToDatabase from "@/lib/mongo";
import user from "@/models/user";
import mongoose from "mongoose";

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

        if (isUser) {
            const userInfo = await user.findOne({ _id: new mongoose.Types.ObjectId((isUser as any).id) });
            
            return NextResponse.json({
                details: userInfo
            }, {
                status: 200
            });
        } else {
            return NextResponse.json({
                message: "You are not logged in"
            }, {
                status: 400
            });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            error: "Invalid token"
        }, {
            status: 500
        });
    }
}