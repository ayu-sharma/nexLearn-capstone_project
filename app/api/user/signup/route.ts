import { signupInput } from "@/helpers/zod";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { genSalt, hash } from "bcrypt-ts";
import { sign } from "jsonwebtoken";
import { JWT_SECRET } from "@/helpers/constants";

export async function POST (request: NextRequest) {
    try {
        const reqBody = await request.json();
        const parsedBody = signupInput.safeParse(reqBody);

        if (!parsedBody.success) {
            return NextResponse.json({
                error: parsedBody.error.errors[0].message
            }, {
                status: 400
            });
        }

        console.log(reqBody);
        
        const existingUser = await db.user.findUnique({
            where: {
                email: reqBody.email
            }
        });

        if (existingUser) {
            return NextResponse.json({
                error: "User already exists"
            }, {
                status: 400
            });
        }

        const salt = await genSalt(10);
        const hashedPassword = await hash(reqBody.password, salt);

        const newUser = await db.user.create({
            data: {
                email: reqBody.email,
                name: reqBody.name,
                password: hashedPassword
            }
        });

        const token = await sign({id: newUser.id}, JWT_SECRET);

        return NextResponse.json({
            message: "User created successfully",
            jwt: token
        }, {
            status: 200
        });

    } catch (error: any) {
        return NextResponse.json({
            error: error
        }, {
            status: 500
        });
    }
}