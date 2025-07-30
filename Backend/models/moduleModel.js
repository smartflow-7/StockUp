import mongoose from "mongoose";

const moduleSchema = mongoose.Schema( {
    title: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },
}, { timestamps: true });

const Module = mongoose.models.Module || mongoose.model("Module", moduleSchema);

const quizSchema = mongoose.Schema({
    moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
    title: { type: String, required: false },
} , { timestamps: true });

quizSchema.index({ moduleId: 1, title: 1 });
const Quiz = mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);

const questionSchema = mongoose.Schema({
    quizId: { type: mongoose.Schema.Types.ObjectId, ref: 'Quiz', required: true },
    questionText: { type: String, required: true },
    correctOption: { type: String, enum: ["A", "B", "C", "D"], required: true },
}, { timestamps: true });

const Question = mongoose.models.Question || mongoose.model("Question", questionSchema);

const optionSchema = mongoose.Schema({
    questionId: { type: mongoose.Schema.Types.ObjectId, ref: 'Question', required: true },
    optionText: { type: String, required: true },
    label: { type: String, enum: ["A", "B", "C", "D"], required: true },
}, { timestamps: true });

const Option = mongoose.models.Option || mongoose.model("Option", optionSchema);

export default {
    Module,
    Quiz,
    Question,
    Option
}