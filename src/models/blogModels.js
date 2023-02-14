import mongoose from "mongoose";
const BlogShcema = new mongoose.Schema({
  image: {
    type: String,
    required: [true, "the image is required"],
  },
  title: {
    type: String,
    required: [true, "The title is required"],
  },
  description: {
    type: String,
    required: [true, "The description of image is required"],

  },
  comments: {
    type: Array,
  },
});

const BlogModel = mongoose.model("Blog", BlogShcema);
export default BlogModel;
