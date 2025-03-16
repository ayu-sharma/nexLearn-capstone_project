import mongoose from "mongoose";

const scoreSchema = new mongoose.Schema({
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    material: { type: mongoose.Types.ObjectId, ref: "Material" },
    score: { type: Number, required: true },
    total: { type: Number, required: true },
    timeTaken: { type: Number, required: true }
});

const Score = mongoose.models.Score || mongoose.model("Score", scoreSchema);

export default Score;