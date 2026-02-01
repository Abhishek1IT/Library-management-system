import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

import authRouter from "./Routes/authRouter.js";
import bookRouter from "./Routes/bookRouter.js";
import issueRouter from "./Routes/issueRouter.js";
import userRouter from "./Routes/userRouter.js";
import errorMiddleware from "./Middleware/errorMiddleware.js";

app.use("/api/auth", authRouter);
app.use("/api/books", bookRouter);
app.use("/api/issues", issueRouter);
app.use("/api/user", userRouter);
app.use(errorMiddleware);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(3000, () => console.log("Server running on port 3000"));
  })
  .catch((err) => console.error(err));
