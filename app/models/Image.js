import mongoose from "mongoose";

const { Schema } = mongoose;

const imageSchema = new Schema(
  {
    title: {
      type: String,
    },
    // tags: {
    //   type: Array,
    // },
    // image_url: [String],
    file: {
      publicId: [String],
      url: [String],
      resource_type: [String],
      format: [String],
    },
    username: {
      type: String,
      // required: true,
    },
    // resource_type: [],
    // format: [],
  },
  {
    timestamps: true,
  }
);

const Image = mongoose.models.Image || mongoose.model("Image", imageSchema);

export default Image;
