import mongoose from "mongoose";
import validator from "validator";

const CommentSchema = new mongoose.Schema({
  name: {
    type: String,
    require: [true, "The name field must Have value"],
  },
  email: {
    type: String,
    required: [true, "Title field is required"],
    validator: [validator.isEmail, "The email you provide is incorrect"],
  },
  comment: {
    type: String,
    required: [true, "The comment field oes not be empty"],
    
  },
});

const commentModel = mongoose.model("Comment", CommentSchema);

export default commentModel;