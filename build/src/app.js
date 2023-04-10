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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.app = void 0;
// src/app.ts
const express_1 = __importStar(require("express"));
const routes_1 = require("../build/routes");
const swaggerUi = __importStar(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("../build/swagger.json"));
const util_1 = require("util");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const isomorphic_git_1 = __importDefault(require("isomorphic-git"));
const node_1 = __importDefault(require("isomorphic-git/http/node"));
exports.app = (0, express_1.default)();
// Use body parser to read sent json payloads
exports.app.use((0, express_1.urlencoded)({
    extended: true,
}));
exports.app.use((0, express_1.json)());
exports.app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
(0, routes_1.RegisterRoutes)(exports.app);
exports.app.get('/:platform/:username/:repositoryName', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { platform, username, repositoryName } = req.params;
    let repositoryUrl;
    let auth = { username: '', password: '' };
    if (platform === 'github') {
        repositoryUrl = `https://github.com/${username}/${repositoryName}.git`;
        auth = {
            username: 'HammadAhmad221',
            password: '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',
        };
    }
    else if (platform === 'bitbucket') {
        repositoryUrl = `https://bitbucket.org/${username}/${repositoryName}.git`;
        auth = {
            username: 'HammadAhmad221',
            password: 'ATBBaz9RJ2LKXGFphTTufSUk3DbV73545F35',
        };
    }
    else {
        return res.status(400).send('Invalid platform');
    }
    try {
        const repoDir = path_1.default.join(__dirname, repositoryName);
        yield (0, util_1.promisify)(fs_1.default.mkdir)(repoDir);
        const files = yield isomorphic_git_1.default.clone({
            dir: repoDir,
            url: repositoryUrl,
            http: node_1.default,
            fs: fs_1.default,
            onAuth: () => auth,
        });
        res.send(files);
    }
    catch (error) {
        console.error(error);
        res.status(500).send(error);
    }
    return;
}));
