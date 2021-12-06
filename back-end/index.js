import express from "express";
import morgan from "morgan";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";

import postRoutes from "./routes/Posts.js";
import userRoutes from "./routes/Users.js";

const app = express();
// middle wears
app.use(cors());
app.use(morgan("combined"));
app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(
  "mongodb+srv://memories:memories@cluster0.xpclj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("SuccessFully connected to DB")
);

// Routers
app.use("/post", postRoutes);
app.use("/user", userRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`App is Running in ${PORT}`));
