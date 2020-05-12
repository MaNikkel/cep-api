import express, { Request, Response } from "express";

import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";

import routes from "./routes";

const app = express();

app.use(bodyParser.json());

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(express.static("public"));

app.use("/", routes);

mongoose
  .connect("mongodb+srv://localhost:27017/cep_database")
  .then(() => {
    console.log("CONNECTED WITH MONGO");
  })
  .catch(err => console.log(err));

//Error handler
app.use((error: Error, req: Request, res: Response) => {
  res.status(500).json({ message: error.message, req: req.url });
});

export default app;
