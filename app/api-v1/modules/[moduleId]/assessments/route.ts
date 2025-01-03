import { assessmentSchema } from "@/helpers/zod";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function POST(
    request: NextRequest, 
    { params }: { params: { moduleId: string } }
) {
    try {
        const { moduleId } = params;
        const { type, level, question, options, correctAnswer } = await request.json();

        const parsedData = assessmentSchema.safeParse({
            type,
            level,
            question,
            options,
            correctAnswer,
          });
      
          if (!parsedData.success) {
            return NextResponse.json({ error: parsedData.error }, { status: 400 });
          }
          
        const newAssessment = await db.assessment.create({
            data: {
            type,
            level,
            question,
            options: options || [],
            correctAnswer,
            moduleId: parseInt(moduleId),
            },
        });
  
      return NextResponse.json(newAssessment, { status: 201 });
    } catch (error) {
        console.error(error);
      return NextResponse.json({ 
        error: 'Failed to create assessment' 
    }, { status: 500 });
    }
  }