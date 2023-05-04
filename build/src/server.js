"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bootstrap_1 = __importDefault(require("./bootstrap/bootstrap"));
const db_1 = require("./db");
// Connect to MongoDB
(0, db_1.connectDB)();
const port = process.env.PORT || 3000;
bootstrap_1.default.listen(port, () => console.log(`CodeRefs listening at http://localhost:${port}`));
//disconnectDB();
