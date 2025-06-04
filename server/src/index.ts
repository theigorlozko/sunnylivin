import express from "express";
import helmet from "helmet";
import dotenv from "dotenv";
import morgan from "morgan";
import bodyParser from "body-parser";
import cors from "cors";
import multer from "multer";
// import { PrismaClient } from "@prisma/client";

const app = express();
// const upload = multer(); // Initialize multer

// Middleware
dotenv.config();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
// app.use(upload.any()); // Parse multipart/form-data

// Routes
app.get("/", (req, res) => {
  res.send("This is home route!");
});

// app.use("/shops", shopsRoutes);
// app.use("/users", authMiddleware(["buyer", "vendor", "user"]), userRoutes);
// app.use('/vendors', authMiddleware(['vendor', 'users', 'buyer']), vendorRoutes);

// Server
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});