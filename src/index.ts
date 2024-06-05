import cors from "cors";
import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
dotenv.config();

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 5001;

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is working fine!!" });
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT: ${PORT}`);
});
