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
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDb = void 0;
const pg_1 = require("pg");
const client = new pg_1.Client("postgresql://neondb_owner:npg_eTYdHhyNu7t3@ep-curly-rain-a4vdd0sn-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require");
const connectDb = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield client.connect();
        console.log("DB connected successfully");
        client.query("CREATE TABLE IF NOT EXISTS users(id serial primary key,email varchar(50) unique not null,password varchar(50) not null);");
        return client;
    }
    catch (e) {
        console.log(e);
    }
});
exports.connectDb = connectDb;
