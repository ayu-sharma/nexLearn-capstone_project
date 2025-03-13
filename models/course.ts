import mongoose, { Schema } from "mongoose";

const courseSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["CODING", "APTITUDE", "LANGUAGE"], required: true },
    modules: [{ type: mongoose.Types.ObjectId, ref: "Module" }]
});
  
const Course =  mongoose.models.Course || mongoose.model("Course", courseSchema);

export default Course;