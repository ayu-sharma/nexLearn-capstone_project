import mongoose, { Schema } from "mongoose";

const moduleSchema = new Schema({
    course: { type: mongoose.Types.ObjectId, ref: "Course", required: true },
    index: { type: Number, required: true }, // Order of the module
    title: { type: String, required: true },
    materials: [{ type: mongoose.Types.ObjectId, ref: "Material" }]
});
  
const Module = mongoose.models.Module || mongoose.model("Module", moduleSchema);

export default Module;