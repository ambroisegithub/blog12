import postRoute from "../src/routes/blogRoutes";
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
app.use(upload.single("image"));
// app.use("/", (req, res) => {
//   res.status(200).json({
//     code: 500,
//     message: "welcome to my Api",
//   });
// });


import swaggerUi from "swagger-ui-express"
import  swaggerJsDoc from "swagger-jsdoc"

const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "My APIs documentation",
      version: "1.0.0",
      description: "This is my API documentation",
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerformat: "JWT",
        },
      },
    },
    securit: [
      {
        bearerAuth: [],
      },
    ],
    servers: [
      {
        url: "https://blogapi12.onrender.com",
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/modules/*.js"],
};
const specs = swaggerJsDoc(options);
app.use(cors());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("*", (req, res) => {
  return res.status(404).json({
    status: "failed",
    message: "Invalid URL",
  });
});
export default app;


