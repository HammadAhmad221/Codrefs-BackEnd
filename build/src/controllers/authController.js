"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.AuthController = void 0;
const tsoa_1 = require("tsoa");
const typescript_ioc_1 = require("typescript-ioc");
// import passport from '../passport/passport.strategies';
const passportAuth_1 = __importDefault(require("../authentication/passportAuth"));
const user_1 = require("../entities/user");
let AuthController = class AuthController extends tsoa_1.Controller {
    signup(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.authService.signup(user);
            return result.message;
        });
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.authService.login(user);
            return result.message;
        });
    }
    googleLogin() {
        return __awaiter(this, void 0, void 0, function* () {
            /*
            passport.authenticate('google', { scope: ['profile', 'email'] }, (error: any, user: any, info: any) => {
              if (error) {
                // Handle authentication error
                return console.log("Error",{ message: 'Authentication Error' },error);
              }
        
              if (!user) {
                // Handle authentication failure
                console.log("Failed",{ message: 'Authentication Failed' });
              }
        
              // Handle successful authentication
              // You can redirect to a success page or return an authentication token
              console.log("Success",{ message: 'Authentication Successful' },info);
            })(req, resp);
          */
        });
    }
    googleLoginCallback() {
        return { success: true, data: "req" };
        return this.authService.googleLoginCallback();
    }
};
__decorate([
    typescript_ioc_1.Inject,
    __metadata("design:type", passportAuth_1.default)
], AuthController.prototype, "authService", void 0);
__decorate([
    (0, tsoa_1.Post)('/signup'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "signup", null);
__decorate([
    (0, tsoa_1.Post)('/login'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.User]),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "login", null);
__decorate([
    (0, tsoa_1.Get)('google'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AuthController.prototype, "googleLogin", null);
__decorate([
    (0, tsoa_1.Get)('login/google/callback')
    // @SuccessResponse('200', 'Redirect to home page')
    ,
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], AuthController.prototype, "googleLoginCallback", null);
AuthController = __decorate([
    (0, tsoa_1.Route)('auth')
], AuthController);
exports.AuthController = AuthController;
