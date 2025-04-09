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
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const db_1 = require("./db");
const app = (0, express_1.default)();
app.use(express_1.default.json());
function connectDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Connecting to DB");
            yield mongoose_1.default.connect("mongodb://127.0.0.1:27017/SecondBrain");
        }
        catch (error) {
            console.error("error:", error);
        }
    });
}
connectDB();
app.post('/api/v1/signup', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    db_1.UserModel.create({
        username: username,
        password: password
    });
    res.json({
        message: "User signed up"
    });
});
app.post('/api/v1/login', (req, res) => {
});
app.post('/api/v1/content', (req, res) => {
});
app.get('/api/v1/content', (req, res) => {
});
app.post('/api/v1/brain/share', (req, res) => {
});
app.get('/api/v1/brain/share', (req, res) => {
});
const port = 3000;
app.listen(port, () => {
    console.log(`Server running on localhost:${port}`);
});
