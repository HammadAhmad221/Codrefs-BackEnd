"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// inversify.config.ts
require("reflect-metadata");
const inversify_1 = require("inversify");
const database_service_1 = require("./services/database.service");
const usersController_1 = require("./controllers/usersController");
const container = new inversify_1.Container();
container.bind(database_service_1.DatabaseService).toSelf();
container.bind(usersController_1.UsersController).toSelf();
exports.default = container;
