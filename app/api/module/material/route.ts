import connectToDatabase from "@/lib/mongo";
import Material from "@/models/material";
import Module from "@/models/module";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        await connectToDatabase();

        const { module, title, type, videoUrl, textContent, assessment } = await req.json();
        
        const newMaterial = new Material({
            module,
            title,
            type,
            videoUrl,
            textContent,
            assessment
        });

        await newMaterial.save();

        await Module.findByIdAndUpdate(module, {
            $push: { materials: newMaterial._id }
        });

        return NextResponse.json({
            message: "New material added!",
            newMaterial
        }, {
            status: 201
        });
    } catch (error) {
        console.error("Material creation failed: ", error);
        return NextResponse.json({
            error: "Internal Server Error"
        }, {
            status: 500
        });
    }
}
