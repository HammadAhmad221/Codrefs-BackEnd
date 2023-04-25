"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appMiddleware = void 0;
const authentication_1 = require("../../authentication");
// @ts-ignore
function appMiddleware(req, res, next) {
    let isValid = (0, authentication_1.validateAuthHeader)(req.headers.authorization);
    if (isValid == false) {
        res.status(403).send('Access denied');
    }
    next();
}
exports.appMiddleware = appMiddleware;
