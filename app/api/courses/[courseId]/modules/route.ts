import { moduleSchema } from "@/helpers/zod";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(
    request: NextRequest, 
    { params }: { params: { courseId: string } }
) {
    try {
        const { courseId } = params;
        console.log(courseId);
        
        const body = await request.json();
        const parsedBody = moduleSchema.safeParse(body);

        if (!parsedBody.success) {
            return NextResponse.json({
                error: parsedBody.error.message
            }, {
                status: 400
            });
        }

        const { title, content, videoUrl } = parsedBody.data;

        const newModule = await db.module.create({
            data: {
              title,
              content,
              videoUrl,
              courseId: parseInt(courseId),
            },
        });

        return NextResponse.json({
            msg: 'Success',
            newModule
        }, { 
            status: 201 
        });
    } catch (error) {
        // console.error(error);
        return NextResponse.json({ 
            error: 'Failed to create module' 
        }, { 
            status: 500 
        });
    }
}