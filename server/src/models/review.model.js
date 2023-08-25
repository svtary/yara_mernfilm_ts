import mongoose, { Schema } from "mongoose";
import modelOptions from "./model.options.js";

export default mongoose.model(
  "Review",
  mongoose.Schema(
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      // contentstyle: {
      //   type: Schema.Types.ObjectId,
      //   ref: "ContentStyle",
      //   required: true,
      // },
      contentstyle: {
        style: {
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
          },
          textDecoration: { type: String },
          fontSize: {
            type: String,
          },
          lineHeight: { type: String },
          fontFamily: { type: String },
        },
      },

      content: {
        type: String,
        required: true,
      },
      mediaType: {
        type: String,
        enum: ["tv", "movie"],
        required: true,
      },
      mediaId: {
        type: String,
        required: true,
      },
      mediaTitle: {
        type: String,
        required: true,
      },
      mediaPoster: {
        type: String,
        required: true,
      },
    },
    modelOptions
  )
);
