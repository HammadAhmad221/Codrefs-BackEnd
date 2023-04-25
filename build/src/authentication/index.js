"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAuthHeader = void 0;
function validateAuthHeader(authHeader) {
    return true;
    if (authHeader != null && authHeader != undefined) {
        return true;
    }
    return false;
}
exports.validateAuthHeader = validateAuthHeader;
