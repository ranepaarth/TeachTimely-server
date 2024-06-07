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
exports.requireAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const requireAuth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("-----------------------------------------------------------REQUIRE AUTH START---------------------------------------");
    try {
        const authToken = (_a = req
            .header("Authorization" || "authorization")) === null || _a === void 0 ? void 0 : _a.replace("Bearer ", "");
        console.log({ authToken });
        if (!authToken) {
            return res
                .status(403)
                .json({ success: false, message: "Unauthorized access denied" });
        }
        const decoded = yield jsonwebtoken_1.default.verify(authToken, process.env.ACCESS_TOKEN_SECRET);
        console.log({ decoded });
        if (!decoded) {
            return res.json(403).json({ message: "Forbidden" });
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        console.log("inside requireAuth catch");
        console.log(error);
        const expParams = {
            error: "expired_access_token",
            error_description: "access token expired",
        };
        if (error.name === "TokenExpiredError") {
            res.status(403).json(expParams);
            throw new Error("Authentication error, token lifetime exceeded");
        }
    }
});
exports.requireAuth = requireAuth;
