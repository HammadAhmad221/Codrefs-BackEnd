// src/app.ts
import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import session from 'express-session';
import { RegisterRoutes } from "../../build/routes";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../../build/swagger.json";
import { setupMiddlewares } from "./setup.middlewares";
import passport from "../passport/passport.strategies";
<<<<<<< HEAD
//import session from 'express-session';

const app = express();
/*app.use(session({
  secret: 'sufi1234',
  resave: false,
  saveUninitialized: false
}));*/
=======
import { setupGoogleAuthMiddleware } from './middlewares/google.auth.middleware';





const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET||'', // Replace with a secure secret key
  resave: false,
  saveUninitialized: false
}));
 
>>>>>>> d550c8a18b0d0549f8afae7196e70ddb76925197
app.use(passport.initialize());
app.use(passport.session());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

setupGoogleAuthMiddleware(app);
setupMiddlewares(app);

RegisterRoutes(app);


//app.use(express.json());
//app.use(passport.initialize());
export default app;
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







