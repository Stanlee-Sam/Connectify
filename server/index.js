import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { signup } from "./controllers/auth.controller.js";
import { createPost } from "./controllers/posts.controller.js"
import authRoute from "./routes/auth.routes.js";
import usersRoute from "./routes/users.routes.js";
import postRoute from "./routes/posts.routes.js"
import { verifyToken } from "./middleware/auth.middleware.js";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();

app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));

// Multer 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/assets/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage });

// Signup 
app.post("/api/auth/signup", upload.single("picture"), signup);
//post route
app.post('/api/posts', verifyToken, upload.single("picture"), createPost)

// Login 
app.use("/api/auth", authRoute);
//users
app.use("/api/users", usersRoute);
//posts
app.use("/api/posts", postRoute)

app.get("/test", (req, res) => {
    res.status(200).send("Hey");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
