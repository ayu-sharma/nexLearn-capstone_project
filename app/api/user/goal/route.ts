import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "@/helpers/constants";
import { db } from "@/lib/db";
import { upgateGoal } from "@/helpers/zod";

export async function PUT (req: NextRequest, res: NextResponse) {
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
        const parsedBody = upgateGoal.safeParse(body);

        if (!parsedBody.success) {
            return NextResponse.json({
                err: "Invalid inputs",
            }, {
                status: 400
            });
        }

        const { goal } = parsedBody.data;
        const userId = userDetails?.id;

        if (!goal) {
            return NextResponse.json({
                error: 'Goal missing',
            }, {
                status: 400
            });
        }

        const updatedUser = await db.user.update({
            where: {
                id: userId
            },
            data: {
                goal: goal
            }
        });

        return NextResponse.json({
            msg: "Goal updated successfully",
            user: updatedUser
        }, {
            status: 200
        });
    } catch (error) {
        return NextResponse.json({
            err: "Could not update goal"
        }, {
            status: 500
        });
    }
}