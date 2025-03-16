import mongoose, { Document, Schema } from "mongoose";

interface ICompletedMaterial {
    materialId: mongoose.Types.ObjectId;
  }
  
  interface IEnrollment extends Document {
    course: mongoose.Schema.Types.ObjectId;
    userId: mongoose.Schema.Types.ObjectId;
    completedMaterials: ICompletedMaterial[];
  }

const enrollmentSchema = new Schema<IEnrollment>({
    course: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Course" },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
    completedMaterials: [{
        materialId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "Material" },
      },
    ]
});

const Enrollment = mongoose.models.Enrollment || mongoose.model<IEnrollment>("Enrollment", enrollmentSchema);

export default Enrollment;