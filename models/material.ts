import mongoose, { Schema, Document, Model, Types } from "mongoose";

export type MaterialType = "READING" | "VIDEO" | "ASSESSMENT";

type CorrectAnswer = "a" | "b" | "c" | "d";

interface IQuestion extends Document {
  text: string;
  options: {
    a: string;
    b: string;
    c: string;
    d: string;
  },
  correctAnswer: CorrectAnswer;
}

interface IMaterial extends Document {
  module: Types.ObjectId;
  title: string;
  type: MaterialType;
  videoUrl?: string;
  textContent?: string;
  assessment?: IQuestion[];
}

const questionSchema = new Schema({
    text: { type: String, required: true },
    options: {
      a: { type: String, required: true },
      b: { type: String, required: true },
      c: { type: String, required: true },
      d: { type: String, required: true }
    },
    correctAnswer: { type: String, enum: ["a", "b", "c", "d"], required: true }
});

const materialSchema = new Schema<IMaterial>({
  module: { type: Schema.Types.ObjectId, ref: "Module", required: true },
  title: { type: String, required: true },
  type: { type: String, enum: ["READING", "VIDEO", "ASSESSMENT"], required: true },
  videoUrl: { type: String, required: false }, 
  textContent: { type: String, required: false },
  assessment: [questionSchema]
});

materialSchema.pre<IMaterial>("save", function (next) {
  if (this.type === "VIDEO") {
    if (!this.videoUrl) return next(new Error("videoUrl is required for VIDEO type materials."));
    if (this.textContent) return next(new Error("textContent is not allowed for VIDEO type materials."));
    if (this.assessment && this.assessment.length > 0) return next(new Error("assessment is not allowed for VIDEO type materials."));
  }

  if (this.type === "READING") {
    if (!this.textContent) return next(new Error("textContent is required for READING type materials."));
    if (this.videoUrl) return next(new Error("videoUrl is not allowed for READING type materials."));
    if (this.assessment && this.assessment.length > 0) return next(new Error("assessment is not allowed for READING type materials."));
  }

  if (this.type === "ASSESSMENT") {
    if (!this.assessment || this.assessment.length === 0) {
      return next(new Error("At least one assessment question is required for ASSESSMENT type materials."));
    }
    if (this.videoUrl) return next(new Error("videoUrl is not allowed for ASSESSMENT type materials."));
    if (this.textContent) return next(new Error("textContent is not allowed for ASSESSMENT type materials."));
  }

  next();
});

const Material: Model<IMaterial> = mongoose.models.Material || mongoose.model<IMaterial>("Material", materialSchema);

export default Material;
