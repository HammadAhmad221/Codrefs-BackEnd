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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/app.ts
const express_1 = __importDefault(require("express"));
const routes_1 = require("../../build/routes");
const swaggerUi = __importStar(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("../../build/swagger.json"));
const setup_middlewares_1 = require("./setup.middlewares");
const passport_strategies_1 = __importDefault(require("../passport/passport.strategies"));
//import session from 'express-session';
const app = (0, express_1.default)();
/*app.use(session({
  secret: 'sufi1234',
  resave: false,
  saveUninitialized: false
}));*/
app.use(passport_strategies_1.default.initialize());
//app.use(passport.session());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/google', passport_strategies_1.default.authenticate('google', { scope: ['profile'] }));
(0, setup_middlewares_1.setupMiddlewares)(app);
(0, routes_1.RegisterRoutes)(app);
//app.use(express.json());
//app.use(passport.initialize());
exports.default = app;
// import { promisify } from 'util';
// import fs from 'fs';
// import path from 'path';
// import listFiles from 'isomorphic-git';
// import http from 'isomorphic-git/http/node';
/*
app.get('/:platform/:username/:repositoryName', async (req, res) => {
  const { platform, username, repositoryName } = req.params;

  let repositoryUrl: string;
  let auth: { username: string; password: string } = { username: '', password: '' };

  if (platform === 'github') {
    repositoryUrl = `https://github.com/${username}/${repositoryName}.git`;
    auth = {
      username: 'HammadAhmad221',
      password: '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',
    };
  } else if (platform === 'bitbucket') {
    repositoryUrl = `https://bitbucket.org/${username}/${repositoryName}.git`;
    auth = {
      username: 'HammadAhmad221',
      password: 'ATBBaz9RJ2LKXGFphTTufSUk3DbV73545F35',
    };
  } else {
    return res.status(400).send('Invalid platform');
  }

  try {
    const repoDir = path.join(__dirname, repositoryName);
    await promisify(fs.mkdir)(repoDir);

    const files = await listFiles.clone({
      dir: repoDir,
      url: repositoryUrl,
      http,
      fs,
      onAuth: () => auth,
    });

    res.send(files);
  } catch (error)
  {
    console.error(error);
    res.status(500).send(error);
  }
  return;
});
*/
