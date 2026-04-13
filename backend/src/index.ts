import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./database/db"
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { globalErrorHandler } from "./middlewares/error.middleware";
import authRouter from "./routes/auth.route";
import profileRouter from "./routes/profile.route";
import noteRouter from "./routes/note.route";
import httpLogger from './middlewares/httpLogger.middleware';
import logger from './utils/logger';
import likeRouter from './routes/like.route';

// dotenv config
dotenv.config();
const app = express();
// helmet
app.use(helmet());
//cors
app.use(cors({
  origin: process.env.CLIENT_URL,
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(express.json());
app.use(cookieParser());

//database connection
connectDB();
//http logger
app.use(httpLogger);
//routes
app.use("/api/auth", authRouter);
app.use("/api/profile", profileRouter);
app.use("/api/notes", noteRouter);
app.use('/api/likes', likeRouter);


app.use(globalErrorHandler)
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
