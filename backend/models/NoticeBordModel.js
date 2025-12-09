import mongoose from "mongoose";

const noticeBordSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      default: "Human Resource Department",
      //   required: true,
    },
  },
  { timestamps: true }
);

const NoticeBord = mongoose.model("NoticeBord", noticeBordSchema);

export default NoticeBord;
