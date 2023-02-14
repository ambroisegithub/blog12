import mongoose from "mongoose";
import dotenv from "dotenv";
// import bodyParser from "body-parser"
dotenv.config();
import app from "./app.js";

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 2222;
app.listen(PORT || 2222, () => {
  console.log(`The server is running on port ${PORT}`);
});
