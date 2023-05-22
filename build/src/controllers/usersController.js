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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const user_service_1 = require("../services/user.service");
//import DatabaseService from ".././services/database.service";
const tsoa_1 = require("tsoa");
const typescript_ioc_1 = require("typescript-ioc");
let UsersController = class UsersController extends tsoa_1.Controller {
    testAPI() {
        return __awaiter(this, void 0, void 0, function* () {
            return { test: true };
        });
    }
    login(request) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return (_a = this.userService) === null || _a === void 0 ? void 0 : _a.loginWithEmailPassword(request);
        });
    }
    signup(request) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            return (_a = this.userService) === null || _a === void 0 ? void 0 : _a.signupWithEmail(request);
        });
    }
};
__decorate([
    typescript_ioc_1.Inject,
    __metadata("design:type", user_service_1.UserService)
], UsersController.prototype, "userService", void 0);
__decorate([
    (0, tsoa_1.Get)("/test"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "testAPI", null);
__decorate([
    (0, tsoa_1.Post)('/login'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "login", null);
__decorate([
    (0, tsoa_1.Post)('/signup'),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signup", null);
UsersController = __decorate([
    (0, tsoa_1.Route)("/users")
], UsersController);
exports.UsersController = UsersController;
