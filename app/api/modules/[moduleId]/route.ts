import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { courseId: string; moduleId: string } }
) {
  try {
    const { moduleId } = params;

    // Validate courseId and moduleId
    const parsedModuleId = parseInt(moduleId);

    if (isNaN(parsedModuleId)) {
      return NextResponse.json(
        { error: "Invalid courseId or moduleId" },
        { status: 400 }
      );
    }

    // Fetch the module and its related content
    const module = await db.module.findUnique({
      where: {
        id: parsedModuleId,
      },
      include: {
        content: true, // Include related content
      },
    });

    // Check if the module exists and belongs to the given course
    if (!module) {
      return NextResponse.json(
        { error: "Module not found or does not belong to the course" },
        { status: 404 }
      );
    }

    // Return the module and its content
    return NextResponse.json(
      {
        msg: "Module fetched successfully",
        module,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching module:", error);

    return NextResponse.json(
      { error: "Failed to fetch module" },
      { status: 500 }
    );
  }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: { moduleId: string } }
  ) {
    try {
      const { moduleId } = params;
  
      // Validate moduleId
      const parsedModuleId = parseInt(moduleId);
  
      if (isNaN(parsedModuleId)) {
        return NextResponse.json(
          { error: "Invalid moduleId" },
          { status: 400 }
        );
      }
  
      // Fetch the current module
      const module = await db.module.findUnique({
        where: {
          id: parsedModuleId,
        },
      });
  
      if (!module) {
        return NextResponse.json(
          { error: "Module not found" },
          { status: 404 }
        );
      }
  
      // Toggle the 'completed' status
      const updatedModule = await db.module.update({
        where: {
          id: parsedModuleId,
        },
        data: {
          completed: !module.completed,
        },
      });
  
      return NextResponse.json(
        {
          msg: "Module status updated successfully",
          updatedModule,
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error updating module status:", error);
  
      return NextResponse.json(
        { error: "Failed to update module status" },
        { status: 500 }
      );
    }
  }