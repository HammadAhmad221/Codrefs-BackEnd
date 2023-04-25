"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupInversify = void 0;
const inversify_config_1 = __importDefault(require("../di/inversify.config"));
function setupInversify(app) {
    app.locals.container = inversify_config_1.default;
}
exports.setupInversify = setupInversify;
