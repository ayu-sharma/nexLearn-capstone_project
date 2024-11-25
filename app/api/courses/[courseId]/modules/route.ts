import { moduleSchema } from "@/helpers/zod";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";


export async function POST(
    request: NextRequest, 
    { params }: { params: { courseId: string } }
) {
    try {
        const { courseId } = params;

        if (!courseId || isNaN(parseInt(courseId))) {
            return NextResponse.json(
              { error: "Invalid courseId" },
              { status: 400 }
            );
          }
        
        const body = await request.json();
        const parsedBody = moduleSchema.safeParse(body);

        if (!parsedBody.success) {
            return NextResponse.json({
                error: parsedBody.error.message
            }, {
                status: 400
            });
        }

        const { title, type, content, videoUrl } = parsedBody.data;

        const moduleData: any = {
            title,
            courseId: parseInt(courseId),
        }

        if (type === "READING" && content) {
            moduleData.content = {
              create: {
                heading: content.heading,
                subhead1: content.subhead1,
                subhead2: content.subhead2,
                paragraph1: content.paragraph1,
                paragraph2: content.paragraph2,
              },
            };
          } else if (type === "VIDEO" && videoUrl) {
            moduleData.videoUrl = videoUrl;
          }
      
          const newModule = await db.module.create({
            data: moduleData,
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