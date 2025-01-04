import { NextRequest, NextResponse } from "next/server";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "@/helpers/constants";
import { db } from "@/lib/db";
import { enrollCourseSchema } from "@/helpers/zod";

export async function GET (req: NextRequest) {
    
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
                },
                include: {
                    startedCourses: {
                        include: {
                            Course:  true
                        }
                    }
                }
            });

            if (!userDetails) {
                return NextResponse.json(
                    {
                        error: 'User not found',
                    },
                    { status: 404 }
                );
            }

            const enrolledCourses = userDetails.startedCourses.map((startedCourse) => ({
                id: startedCourse.id,
                progress: startedCourse.progress,
                course: startedCourse.Course, // Include the course object
            }));

            return NextResponse.json({
                enrolledCourses
            });
        } else {
            return new NextResponse(
                JSON.stringify({
                    msg: "Unauthorized user"
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

export async function POST (req: NextRequest) {

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

            if (!userDetails) {
                return NextResponse.json({
                    error: 'User not found'
                }, {
                   status: 404
                });
            }

            const body = await req.json();
            const parsedBody = enrollCourseSchema.safeParse(body);

            if (!parsedBody.success) {
                return NextResponse.json({
                    error: 'Invalid inputs'
                }, {
                   status: 400
                });
            } 

            const { courseId } = parsedBody.data;

            const course = await db.course.findUnique({
                where: {
                    id: courseId
                }
            });

            if (!course) {
                return NextResponse.json({
                    error: 'Course not found'
                }, {
                   status: 404
                });
            }

            const existingEnrollment = await db.startedCourse.findUnique({
                where: {
                    userId_courseId: {
                        userId: userDetails.id,
                        courseId: course.id,
                    },
                },
            });

            if (existingEnrollment) {
                return NextResponse.json(
                    { error: 'User is already enrolled in this course' },
                    { status: 409 }
                );
            }

            const enrollCourse = await db.startedCourse.create({
                data: {
                    userId: userDetails?.id,
                    courseId: course.id
                }
            });

            return NextResponse.json({
                message: 'Enrollment successful',
                enrollCourse
            }, {
               status: 201
            });
        } else {
            return NextResponse.json({
                error: 'Unauthorized access'
            }, {
               status: 403
            });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            error: 'Enrollment failed'
        }, {
           status: 500
        });
    }
}