import "dotenv/config";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import { rateLimit } from "express-rate-limit";
import path from "path";
import { fileURLToPath } from "url";
import { coursesRouter } from "./modules/courses/courses.route.js";
import { connectDB } from "./config/db.js";
import { usersRouter } from "./modules/users/users.route.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// server config
const app = express();
const PORT = process.env.PORT || 8000;

// connect database
connectDB();

// middleware
app.use(cors());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

app.use(limiter);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// routes
app.use("/api/courses", coursesRouter);
app.use("/api/users", usersRouter);

// catch-all for undefined routes
app.all(/(.*)/, (req, res) => {
  res.status(404).json("Route Doesn't exist");
});

// start server
app.listen(PORT, () => console.log("server is running on port:", PORT));
