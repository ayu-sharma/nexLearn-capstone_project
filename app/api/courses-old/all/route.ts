import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
    try {
        const courses = await db.course.findMany({
            include: {
                modules: true
            }
        });

        return NextResponse.json({
            courses
        }, {
            status: 201
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: 'Failed to fetch courses'
        }, {
            status: 500
        });
    }
}