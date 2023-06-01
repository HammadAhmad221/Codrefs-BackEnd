import dotenv from 'dotenv';
dotenv.config();
import express from "express";
import session from 'express-session';
import { RegisterRoutes } from "../../build/routes";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerDocument from "../../build/swagger.json";
import { setupMiddlewares } from "./setup.middlewares";
import passport from "../passport/passport.strategies";
import { setupGoogleAuthMiddleware } from './middlewares/google.auth.middleware';
import { setupGithubAuthMiddleware } from './middlewares/github.auth.middleware';



const app = express();

app.use(session({
  secret: process.env.SESSION_SECRET||'',
  resave: false,
  saveUninitialized: false
}));

 
app.use(passport.initialize());
app.use(passport.session());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

setupGoogleAuthMiddleware(app);
setupGithubAuthMiddleware(app);
setupMiddlewares(app);
RegisterRoutes(app);



export default app;








