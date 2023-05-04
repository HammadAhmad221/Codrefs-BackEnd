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
const user_1 = require("../users/user");
//import { Singleton } from 'typescript-ioc';
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("passport-local");
//fake
passport_1.default.use(new passport_local_1.Strategy({ usernameField: 'username', passwordField: 'password' }, (username, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_1.UserModel.findOne({ username }).exec();
    if (!user) {
        return done(null, false, { message: 'User not found' });
    }
    if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password' });
    }
    return done(null, user);
})));
//fakeend
//pure
let DatabaseService = class DatabaseService {
    //pureend
    //fake
    signup(user) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const existingUser = yield user_1.UserModel.findOne({ username: user.username }).exec();
                if (existingUser) {
                    return { success: false, message: 'User already exists' };
                }
                yield user_1.UserModel.create(user);
                return { success: true, message: 'User created successfully' };
            }
            catch (err) {
                console.error(err);
                return { success: false, message: 'Error creating user' };
            }
        });
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return new Promise((resolve, reject) => {
                passport_1.default.authenticate('local', (err, user, info) => {
                    if (err) {
                        console.error(err);
                        return reject({ success: false, message: 'Internal server error' });
                    }
                    if (!user) {
                        return resolve({ success: false, message: info.message });
                    }
                    return resolve({ success: true, message: 'Login successful' });
                })({ username: user.username, password: user.password });
            });
        });
    }
    //fakeend
    //pure
    testFunction() {
        return "Message from test function service";
    }
    //testing
    testingFunction() {
        return "I am ok why post is not working";
    } //endtesting
};
DatabaseService = __decorate([
    typescript_ioc_1.Singleton
], DatabaseService);
exports.default = DatabaseService;
//pureend
