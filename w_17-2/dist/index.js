"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
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
const connectDb_1 = __importStar(require("./connectDb"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, connectDb_1.connectDb)();
let curr_id = null;
//@ts-ignore
app.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    try {
        const INSERTQUERY = (`INSERT INTO users (email,password) VALUES ($1,$2) RETURNING id`);
        //@ts-ignore
        const response = yield connectDb_1.default.query(INSERTQUERY, [email, password]);
        curr_id = (yield response).rows[0].id;
        console.log(curr_id);
        return res.json(response);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Internal server error" });
    }
}));
//@ts-ignore
app.post("/address", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { street, city, country } = req.body;
        const INSERTQUERY_ADDRESS = (`INSERT INTO ADDRESS (user_id,street,city,country) VALUES ($1,$2,$3,$4)`);
        //@ts-ignore
        const response = yield connectDb_1.default.query(INSERTQUERY_ADDRESS, [curr_id, street, city, country]);
        console.log(response);
        return res.json(response);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Internal server error" });
    }
}));
//@ts-ignore
app.get("/profile", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const SELECTQUERY = (`
      SELECT u.id, u.email , a.street, a.city, a.country 
      FROM users u 
      LEFT JOIN address a ON u.id = a.user_id 
      WHERE u.id = $1
      `);
        const result = yield connectDb_1.default.query(SELECTQUERY, [id]);
        console.log(result.rows);
        return res.json(result.rows);
    }
    catch (e) {
        console.log(e);
        return res.status(500).json({ error: "Internal server error" });
    }
}));
app.listen(3000);
