import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
    material: { type: mongoose.Types.ObjectId, ref: "Material", required: true },
    text: { type: String, required: true },
    options: {
      a: { type: String, required: true },
      b: { type: String, required: true },
      c: { type: String, required: true },
      d: { type: String, required: true }
    },
    correctAnswer: { type: String, enum: ["a", "b", "c", "d"], required: true }
});
  
const Question = mongoose.models.Question || mongoose.model("Question", questionSchema);

export default Question;  