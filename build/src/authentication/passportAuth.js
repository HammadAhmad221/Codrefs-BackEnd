"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
const typescript_ioc_1 = require("typescript-ioc");
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth2_1 = require("passport-google-oauth2");
const passport_local_1 = require("passport-local");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../database/mongodb/schema/user");
passport_1.default.use(new passport_google_oauth2_1.Strategy({
    clientID: '364608439523-7kbcap43n3sk2d1ldvc7h50b0ju4o4u4.apps.googleusercontent.com',
    clientSecret: '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',
    callbackURL: 'https://stage.gradvantage.co/auth/login/google/callback'
}, (accessToken, refreshToken, profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Existing user found:', profile);
    console.log('Access Token:', accessToken);
    console.log('Refresh Token:', refreshToken);
    done(null, true);
    /*
    try {
      const existingUser = await UserModel.findOne({ email: profile.email }).exec();

      if (existingUser) {
        console.log('Existing user found:', existingUser);
        console.log('Access Token:', accessToken);
        console.log('Refresh Token:', refreshToken);
        return done(null, existingUser);
      } else {
        console.log('New user detected');
        return done(null, false);
      }
    } catch (error) {
      console.error('Error during authentication:', error);
      return done(error);
    }

    */
})));
//import { IsNotEmpty } from 'class-validator';
//import { Body } from 'tsoa';
passport_1.default.use(new passport_local_1.Strategy({ usernameField: 'email', passwordField: 'password' }, (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.UserModel.findOne({ email }).exec();
    if (!user) {
        return done(null, false, { message: 'User not found' });
    }
    if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password' });
    }
    return done(null, user);
})));
let AuthService = class AuthService {
    signup(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                //console.log("Received user object:", user);
                const existingUser = yield user_1.UserModel.findOne({ email: user.email }).exec();
                //console.log("Existing user:", existingUser);
                if (existingUser) {
                    return { success: false, message: 'Username already exists.Please enter different one.' };
                }
                if (!user.email || !user.password) {
                    return { success: false, message: 'Username and password are required' };
                }
                // Hash the password
                const hashedPassword = yield bcrypt_1.default.hash(user.password, 10);
                // Create a new user object with the hashed password
                const newUser = Object.assign(Object.assign({}, user), { password: hashedPassword });
                yield user_1.UserModel.create(newUser);
                return { success: true, message: 'User created successfully' };
            }
            catch (err) {
                console.error(err);
                return { success: false, message: 'Error creating user' };
            }
        });
    }
    login(user) {
        return new Promise((resolve, reject) => {
            passport_1.default.authenticate('local', (err) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    console.error(err);
                    return reject({ success: false, message: 'Internal server error' });
                }
                const existingUser = yield user_1.UserModel.findOne({ email: user.email }).exec();
                if (!existingUser) {
                    return resolve({ success: false, message: `Email:${user.email} does not exist. Please enter the correct username` });
                }
                // Compare the hashed password
                const passwordMatch = yield bcrypt_1.default.compare(user.password, existingUser.password);
                if (!passwordMatch) {
                    return resolve({ success: false, message: `please enter correct password:Mr.${user.email}` });
                }
                return resolve({ success: true, message: 'Login successful' });
            }))({ user });
        });
    }
    googleLogin() {
        console.log('Redirecting to Google login');
        try {
            passport_1.default.authenticate('google', { scope: ["profile"] });
        }
        catch (error) {
            console.log("errorrs:", error);
        }
    }
    googleLoginCallback() {
        console.log('Handling Google login callback');
        return passport_1.default.authenticate('google', { failureRedirect: 'https://localhost/auth/login/google', successRedirect: 'https://localhost/auth/login/google/callback' });
    }
};
AuthService = __decorate([
    typescript_ioc_1.Singleton
], AuthService);
exports.default = AuthService;
//Without Hashing WC
/*public async signup(user: User): Promise<{ success: boolean; message: string }> {
  try {
    console.log("Received user object:", user);
    const existingUser = await UserModel.findOne({ username: user.username }).exec();
    console.log("Existing user:", existingUser);
    if (existingUser) {
      return { success: false, message: 'User already exists' };
    }
    if (!user.username || !user.password) {
      return { success: false, message: 'Username and password are required' };
    }
    await UserModel.create(user);
    return { success: true, message: 'User created successfully' };
  } catch (err) {
    console.error(err);
    return { success: false, message: 'Error creating user' };
  }
}
public async login(user: User): Promise<{ success: boolean; message: string }> {
const existingUser = await UserModel.findOne({ username: user.username }).exec();
  return new Promise((resolve, reject) => {
    passport.authenticate('local', (err:any) => {
      if (err) {
        console.error(err);
        return reject({ success: false, message: 'Internal server error' });
      }
      
      if (!existingUser) {
        return resolve({ success: false, message: `Username: ${user.username} does not exists.Please enter correct username` });
      }
      if (existingUser.password!==user.password) {
        return resolve({ success: false, message: `please enter correct password:Mr.${user.username}` });
      }
      return resolve({ success: true, message: 'Login successful' });
    })({ user });
  });
}*/
