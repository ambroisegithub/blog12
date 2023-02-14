import postRoute from "./routes/blogRoutes";
import upload from "./helpers/multer";
import bodyParser from "body-parser";
import morgan from "morgan";
// import upload from "./helpers/multer"
import UserRoute from "./routes/user"
import express from "express";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(upload.single("image"));
app.use("/api/v1", postRoute); 
app.use("/api/v1", UserRoute);
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(upload.single("image"));
app.use("/", (req, res) => {
  res.status(200).json({
    code: 500,
    message: "welcome to my Api",
  });
});
app.use("*", (req, res) => {
  return res.status(404).json({
    status: "failed",
    message: "Invalid URL",
  });
});
export default app;


