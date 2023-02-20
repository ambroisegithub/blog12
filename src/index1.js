import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
import app from "./app1.js";

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE1)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT1 = process.env.PORT1 || 3333;
app.listen(PORT1 || 3333, () => {
  console.log(`The server is running on port ${PORT1}`);
});

export default app;