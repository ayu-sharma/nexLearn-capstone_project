import { JWT_SECRET } from "@/helpers/constants";
import { loginInput } from "@/helpers/zod";
import connectToDatabase from "@/lib/mongo";
import user from "@/models/user";
import { compare } from "bcrypt-ts";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();

        const reqBody = await request.json();
        const parsedBody = loginInput.safeParse(reqBody);

        if (!parsedBody.success) {
            return NextResponse.json({
                error: parsedBody.error.errors[0].message
            }, {
                status: 400
            });
        }

        const { email, password } = reqBody;

        const isUser = await user.findOne({ email });

        if (!isUser) {
            return NextResponse.json({
                error: "User not found"
            }, {
                status: 400
            });
        }

        const validPassword = await compare(password, isUser.password);

        if (!validPassword) {
            return NextResponse.json({
                error: "Incorrect password"
            }, {
                status: 403
            });
        } else {
            const token = sign({ id: isUser._id }, JWT_SECRET);
            return NextResponse.json({
                message: "User logged in successfully",
                jwt: token
            }, {
                status: 200
            });
        }
    } catch (error) {
        console.log(error);
        return NextResponse.json({ 
            error: "Error logging in user" 
        }, { 
            status: 500 
        });
    }
}