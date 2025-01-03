import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
    request: NextRequest, 
    { params }: { params: { courseId: string }}
) {
    const { courseId } = params;

    if (!courseId) {
        return NextResponse.json({ 
            error: 'Missing courseId' 
        }, { 
            status: 400 
        });
    }
    try {
        const course = await db.course.findUnique({
            where: { id: parseInt(courseId) },
            include: {
              modules: true
            },
          });

          if (!course) {
            return NextResponse.json({
                error: 'Course not found'
            }, {
                status: 404
            });
          }

          return NextResponse.json(course, {
            status: 200
          });
    } catch (error) {
        console.error('Error fetching course:', error);
        return NextResponse.json({ 
            error: 'Internal server error' 
        }, { 
            status: 500 
        });
    }
}