import mongoose  from "mongoose"
import validator from "validator"
import bcrypt from "bcryptjs"
const USerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "the name is required"],
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    validator: [validator.isEmail, "please provide the valid email"],
  },
  password: {
    type: String,
    minLength: 6,
    maxLength: 12,
    select: false,
    required: [true, "please the passsword field required"],
  },

  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

USerSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  user.password = await bcrypt.hash(user.password, 10);
  next();
});

USerSchema.methods.correctPassword = async function (cpassword, password) {
  return await bcrypt.compare(cpassword, password);
};

const user = mongoose.model("User", USerSchema);

export default user;
