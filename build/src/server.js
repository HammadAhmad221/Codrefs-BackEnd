"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bootstrap_1 = __importDefault(require("./bootstrap/bootstrap"));
const typescript_ioc_1 = require("typescript-ioc");
const database_service_1 = require("./common/services/database.service");
const port = process.env.PORT || 3000;
const databaseService = typescript_ioc_1.Container.get(database_service_1.DatabaseService);
databaseService.connectToDB();
bootstrap_1.default.listen(port, () => console.log(`CodeRefs listening at http://localhost:${port}`));
