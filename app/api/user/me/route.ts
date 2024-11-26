import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "@/helpers/constants";
import { db } from "@/lib/db";
import { lastViewedSchema } from "@/helpers/zod";

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
                email: userDetails?.email,
                lastViewed: userDetails?.lastViewedCourseId
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

export async function PUT(req: NextRequest, res: NextResponse) {
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

        const userDetails = await db.user.findUnique({
            where: {
                id: (user as any).id
            }
        });

        const body = await req.json();
        const parsedBody = lastViewedSchema.safeParse(body);

        if (!parsedBody.success) {
            return NextResponse.json({
                err: "Invalid inputs",
                error: parsedBody.error.errors
            }, {
                status: 400
            });
        }

        const { courseId } = parsedBody.data;
        const userId = userDetails?.id;

        if (!courseId) {
            return NextResponse.json({ 
                error: 'Course ID is required' 
            }, {
                status: 400
            });
        }

        const updatedUser = await db.user.update({
            where: { 
                id: userId 
            },
            data: { 
                lastViewedCourseId: courseId 
            },
        });

        return NextResponse.json({
            msg: "Last viewed course updated",
            user: updatedUser
        }, {
            status: 200
        });

    } catch (error) {
        console.error(error);
        return NextResponse.json({
            err: "Something went wrong"
        }, {
            status: 500
        });
    }
}