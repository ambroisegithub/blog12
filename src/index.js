import mongoose from "mongoose";
import dotenv from "dotenv";
// import bodyParser from "body-parser"
dotenv.config();
import app from "./app.js";

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
        url: "http://localhost:4444",
      },
    ],
  },
  apis: ["./src/routes/*.js", "./src/modules/*.js"],
};
const specs = swaggerJsDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

mongoose.set("strictQuery", false);
mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("DB CONNECTED");
  })
  .catch((err) => {
    console.log(err);
  });

const PORT = process.env.PORT || 4444;
app.listen(PORT || 4444, () => {
  console.log(`The server is running on port ${PORT}`);
});
app.use('*', (req, res)=>{
  res.status(404).json({status:"fail", data:"Not Found"})
});

export default app;