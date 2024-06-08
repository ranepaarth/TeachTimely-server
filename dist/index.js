"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = __importDefault(require("cloudinary"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const db_config_1 = require("./config/db.config");
const error_middleware_1 = require("./middlewares/error.middleware");
const admin_routes_1 = require("./routes/admin.routes");
const auth_routes_1 = require("./routes/auth.routes");
const courses_routes_1 = require("./routes/courses.routes");
const instructor_routes_1 = require("./routes/instructor.routes");
dotenv_1.default.config();
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5001;
const corsOptions = {
    origin: process.env.ALLOWED_URLS,
    credentials: true,
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
    allowedHeaders: ["X-CSRF-Token", "X-Requested-With", "Accept", "Accept-Version", "Content-Length", "Content-MD5", "Content-Type", "Date", "X-Api-Version", "Authorization"],
    exposedHeaders: ["Access-Control-Allow-Private-Network"],
};
app.use((0, cors_1.default)(corsOptions));
app.options("*", (0, cors_1.default)(corsOptions));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cookie_parser_1.default)());
app.use("/api/v1/auth", auth_routes_1.authRoutes);
app.use("/api/v1/admin", admin_routes_1.adminRoutes);
app.use("/api/v1/courses", courses_routes_1.courseRoutes);
app.use("/api/v1/instructor", instructor_routes_1.instructorRoutes);
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({ message: "Server working fine!!" });
}));
app.use(error_middleware_1.errorHandler);
app.use(error_middleware_1.notFoundError);
(0, db_config_1.connectDB)().then(() => {
    app.listen(PORT, () => {
        console.log(`${new Date()} Server is running on PORT: ${PORT}`);
    });
});
