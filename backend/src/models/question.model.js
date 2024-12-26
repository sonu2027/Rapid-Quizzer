import mongoose, { Schema } from "mongoose";

const questionSchema = new Schema(
  {
    question: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    options: {
      type: Array,
      required: true,
    },
    answer: {
      type: Number,
      required: true,
    },
    difficulty: {
      type: Number,
      required: true,
    },
    subject: {
      type: String,
      required: true,
      index: true,
    },
    chapter: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Question = mongoose.model("Question", questionSchema);
