import mongoose from "mongoose";

const progressSchema = new mongoose.Schema({
    enrollment: { type: mongoose.Types.ObjectId, ref: "Enrollment", required: true },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    course: { type: mongoose.Types.ObjectId, ref: "Course", required: true },
    completedModules: [{ type: mongoose.Types.ObjectId, ref: "Module" }],
    completedMaterials: [{ type: mongoose.Types.ObjectId, ref: "Material" }],
    scores: [{
      material: { type: mongoose.Types.ObjectId, ref: "Material" },
      score: { type: Number, required: true }
    }]
});

const Progress = mongoose.models.Progress || mongoose.model("Progress", progressSchema);

export default Progress;