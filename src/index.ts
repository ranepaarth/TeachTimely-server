import cloudinary from "cloudinary";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import { connectDB } from "./config/db.config";
import { errorHandler, notFoundError } from "./middlewares/error.middleware";
import { adminRoutes } from "./routes/admin.routes";
import { authRoutes } from "./routes/auth.routes";
import { courseRoutes } from "./routes/courses.routes";

dotenv.config();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app: Express = express();
const PORT = process.env.PORT || 5001;

const corsOptions = {
  origin: process.env.ALLOWED_URLS,
  credentials: true,
  methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Access-Control-Allow-Private-Network"],
};

app.use(cors(corsOptions));
app.options("*", cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/courses", courseRoutes);

app.get("/", async (req: Request, res: Response) => {
  res.status(200).json({ message: "Server working fine!!" });
});

app.use(errorHandler);
app.use(notFoundError);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`${new Date()} Server is running on PORT: ${PORT}`);
  });
});
