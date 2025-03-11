import mongoose, { Document, ObjectId } from "mongoose";

interface ITopic extends Document {
    name: string;
    order: number;
    problems: ObjectId[]
}

const TopicSchema = new mongoose.Schema({
    name: { type: String, required: true, unique: true },
    order: { type: Number, required: true, unique: true },
    problems: [{ type: mongoose.Schema.Types.ObjectId, ref: "problem" }]
});

const Topic = mongoose.models.Topic || mongoose.model<ITopic>("Topic", TopicSchema);

export default Topic;