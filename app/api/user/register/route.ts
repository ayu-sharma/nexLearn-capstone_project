import { JWT_SECRET } from "@/helpers/constants";
import { signupInput } from "@/helpers/zod";
import connectToDatabase from "@/lib/mongo";
import { genSalt, hash } from "bcrypt-ts";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";
import user, { Goal } from "@/models/user";

export async function POST(request: NextRequest) {
    try {
        await connectToDatabase();

        const reqBody = await request.json();
        const parsedBody = signupInput.safeParse(reqBody);

        if (!parsedBody.success) {
            return NextResponse.json({
                error: parsedBody.error.errors[0].message
            }, {
                status: 400
            });
        }

        const { name, email, goal, password } = reqBody;

        const existingUser = await user.findOne({ email });
        if (existingUser) {
            return NextResponse.json({
                error: "Email already in use"
            }, {
                status: 400
            });
        }

        const salt = await genSalt(10);
        const hashedPassword = await hash(password, salt);
        
        const newUser = new user({
            name,
            email,
            password: hashedPassword,
            goal: goal || Goal.PLACEMENT
        });

        await newUser.save();

        const token = sign({id: newUser._id}, JWT_SECRET);

        return NextResponse.json({ 
            message: "User created", 
            user: newUser,
            jwt: token
        }, { 
            status: 201 
        });
    } catch (error) {
        console.log(error);
        return NextResponse.json({ 
            error: "Error creating user" 
        }, { 
            status: 500 
        });
    }
}