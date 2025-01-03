import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH (
    request: NextRequest,
    { params }: { params: { materialId: string }}
) {
    try {
        const { materialId } = params;

        if (!materialId) {
            return NextResponse.json(
                { error: "Invalid materialId" },
                { status: 400 }
            );
        }

        const material = await db.material.findUnique({
            where: {
                id: materialId
            }
        });

        if (!material) {
            return NextResponse.json(
                { error: "Material not found" },
                { status: 404 }
            );
        }

        const updatedMaterial = await db.material.update({
            where: {
                id: materialId
            },
            data: {
                completed: !material.completed
            }
        });

        return NextResponse.json(
            {
              msg: "Material status updated successfully",
              updatedMaterial,
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating material status:", error);
  
      return NextResponse.json(
        { error: "Failed to update material status" },
        { status: 500 }
      );
    }
}