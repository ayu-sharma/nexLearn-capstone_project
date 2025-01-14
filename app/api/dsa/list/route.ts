import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {
        const topics = await db.dSATopic.findMany({
            include: {
                problems: true
            }
        });

        return NextResponse.json({
            topics
        }, {
            status: 201
        });
    } catch (error) {
        return NextResponse.json({
            msg: "Internal Server Error",
            error
        }, {
            status: 500
        });
    }
}