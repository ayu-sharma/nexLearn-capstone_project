import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { moduleSchema } from '@/helpers/zod';

export async function POST(request: NextRequest, { params }: { params: { courseId: string } }) {
    try {
            const { courseId } = params;
    
            if (!courseId) {
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
    
            const { title, index } = parsedBody.data;
    
            const moduleData: any = {
                title,
                courseId,
                index
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
  