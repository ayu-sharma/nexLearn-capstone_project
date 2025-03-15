import { NextRequest, NextResponse } from "next/server";
import Material from "@/models/material";
import connectToDatabase from "@/lib/mongo";

export async function GET(req: NextRequest,
    { params }: { params: { materialId: String } }
) {
    try {
        await connectToDatabase();

        const { materialId } = params;

        const material = await Material.findById(materialId);

        const questions = material?.assessment;

        return NextResponse.json({
            questions
        }, {
            status: 200
        });
    } catch (error) {
        console.error("Assessment fetch failed: ", error);
        return NextResponse.json({
            error: "Internal Server Error"
        }, {
            status: 500
        });
    }
}