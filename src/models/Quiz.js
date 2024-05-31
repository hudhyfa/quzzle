import mongoose from "mongoose";

const { Schema } = mongoose;

const quizSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    totalNumberOfQuestions: {
      type: Number,
      required: true,
    },
    qna: [
        {
            question: {
                type: String,
                required: true,
            },
            answers: {
                type: [String],
                required: true
            },
            correctAnswer: {
                type: String,
                required: true,
            }
        }
    ]
  },
  { timestamps: true }
);

export default mongoose.models.Quiz || mongoose.model("Quiz", quizSchema);