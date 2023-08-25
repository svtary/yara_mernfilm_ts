import mongoose from "mongoose";
import modelOptions from "./model.options.js";

const ContentstyleSchema = new mongoose.Schema(
  {
    style: [
      {
        color: {
          type: String,
          required: true,
          unique: true,
        },
        fontWeight: {
          type: String,
          required: true,
        },
        fontStyle: {
          type: String,
          required: true,
          select: false,
        },
        textDecoration: { type: String },
        fontSize: {
          type: String,
          required: true,
          select: false,
        },
        lineHeight: { type: String },
        fontFamily: { type: String },
      },
    ],
  },
  modelOptions
);

const ContentstyleModel = mongoose.model("ContentStyle", ContentstyleSchema);

export default ContentstyleModel;
