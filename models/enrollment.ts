import mongoose, { Schema } from "mongoose";

const enrollmentSchema = new Schema({
    course: { type: mongoose.Types.ObjectId, required: true, ref: "Course" },
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" }
});

const Enrollment = mongoose.models.Enrollment || mongoose.model("Enrollment", enrollmentSchema);

export default Enrollment;