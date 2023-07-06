import mongoose from "mongoose";

const { Schema } = mongoose;

const imageSchema = new Schema(
  {
    title: {
      type: String,
    },
    tags: {
      type: Array,
    },
    image_url: [String],
    username: {
      type: String,
      // required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);

export default Image;
