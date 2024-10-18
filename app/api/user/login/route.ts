import { JWT_SECRET } from "@/helpers/constants";
import { loginInput } from "@/helpers/zod";
import { db } from "@/lib/db";
import { compare } from "bcrypt-ts";
import { sign } from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

export async function POST (request: NextRequest) {
    try {
        const reqBody = await request.json();
        const parsedBody = loginInput.safeParse(reqBody);

        if (!parsedBody.success) {
            return NextResponse.json({
                error: parsedBody.error.errors[0].message
            }, {
                status: 400
            });
        }

        console.log(reqBody);

        const user = await db.user.findUnique({
            where: {
                email: reqBody.email
            }
        });

        if (!user) {
            console.log('user not found')
            return NextResponse.json({
                error: "User not found"
            }, {
                status: 400
            });
        }

        const validPassword = await compare(reqBody.password, user.password);

        if (!validPassword) {
            return NextResponse.json({
                error: "Wrong password!"
            }, {
                status: 403
            });
        } else {
            const token = await sign({ id: user.id }, JWT_SECRET);
            return NextResponse.json({
                message: "User logged in successfully",
                jwt: token
            }, {
                status: 200
            });
        }
    } catch (error: any) {
        return NextResponse.json({
            error: error.message
        }, {
            status: 500
        });
    }
}