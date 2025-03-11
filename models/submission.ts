import mongoose, { Document, ObjectId } from "mongoose";

interface ISubmission extends Document {
    problemId: number;
    userId: ObjectId;
    isSolved: boolean;
    isCorrect: boolean;
}

const SubmissionSchema = new mongoose.Schema({
    problemId: { type: Number, required: true },
    userId: { type: mongoose.Types.ObjectId, required: true, ref: "User" },
    isSolved: { type: Boolean, default: false },
    isCorrect: { type: Boolean }
});

const Submission = mongoose.models.Submission || mongoose.model<ISubmission>("Submission", SubmissionSchema);

export default Submission;