import mongoose, { Document } from "mongoose";

interface IProblem extends Document {
    title: string;
    serial: number;
    difficulty: "EASY" | "MEDIUM" | "HARD";
    problemStatement: string;
    sampleInput1: string;
    sampleInput2: string;
    sampleOutput1: string;
    sampleOutput2: string;
    topic: mongoose.Schema.Types.ObjectId;
}

const ProblemSchema = new mongoose.Schema({
    title: { type: String, required: true, unique: true },
    serial: { type: Number, required: true, unique: true },
    difficulty: { type: String, enum: ["EASY", "MEDIUM", "HARD"], required: true },
    problemStatement: { type: String, required: true },
    sampleInput1: { type: String, required: true },
    sampleInput2: { type: String, required: true },
    sampleOutput1: { type: String, required: true },
    sampleOutput2: { type: String, required: true },
    topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true }
});

const Problem = mongoose.models.Problem || mongoose.model<IProblem>("Problem", ProblemSchema);
export default Problem;