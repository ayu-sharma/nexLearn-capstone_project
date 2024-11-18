import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "@/helpers/constants";
import { db } from "@/lib/db";

export async function GET(req: NextRequest) {
    const authHeader = req.headers.get('authorization') || '';

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return NextResponse.json({
            error: 'Bearer token not found'
        }, {
            status: 403
        });
    }

    const token = authHeader.split(' ')[1];
    try {
        const user = verify(token, JWT_SECRET);

        if (user) {
            const userDetails = await db.user.findUnique({
                where: {
                    id: (user as any).id
                }
            });

            return NextResponse.json({
                name: userDetails?.name,
                id: userDetails?.id,
                email: userDetails?.email
            });
        } else {
            return new NextResponse(
                JSON.stringify({
                    msg: "You are not logged in"
                }),
                {
                    status: 403
                }
            )
        }
    } catch (error) {
        return new NextResponse(
            JSON.stringify({
                err: 'Invalid token ' + error
            }),
            {
                status: 500
            }
        )
    }
}