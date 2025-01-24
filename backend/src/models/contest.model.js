import mongoose, { Schema } from "mongoose";

const contestSchema = new Schema(
  {
    date: {
      type: Array,
      required: true,
    },
    subject: {
      type: String,
      required: true,
    },
    chapter: {
      type: String,
    },
    totalQuestion: {
      type: Number,
      required: true,
    },
    userRegistered: {
      type: Array,
    },
  },
  {
    timestamps: true,
  }
);

export const Contest = mongoose.model("Contest", contestSchema);
