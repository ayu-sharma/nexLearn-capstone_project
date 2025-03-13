import mongoose, { Schema, Document } from "mongoose";

export enum Goal {
    INTERNSHIP = "INTERNSHIP",
    PLACEMENT = "PLACEMENT"
}

export interface IUser extends Document {
    name?: string;
    email: string;
    password: string;
    goal: Goal;
    enrolledCourses: mongoose.Types.ObjectId[];
    createdAt: Date;
    updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
    {
      name: { type: String, default: null }, 
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      goal: { type: String, enum: Object.values(Goal), default: Goal.PLACEMENT },
      enrolledCourses: [{ type: mongoose.Types.ObjectId, ref: "Enrollment" }]
    },
    { timestamps: true }
);
  
export default mongoose.models.User || mongoose.model<IUser>("User", UserSchema);