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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.User = void 0;
/*export interface User {
    id: number;
    email: string;
    name: string;
    status?: "Happy" | "Sad";
    phoneNumbers: string[];
  }*/
const class_validator_1 = require("class-validator");
const mongoose_1 = require("mongoose");
/*export class User {
  @IsNotEmpty()
  @MinLength(5)
  username!: string;
  @IsNotEmpty()
  password!: string;
}
const userSchema = new Schema<User>({
username: { type: String, unique: true,required:true },
password: {type: String, required:true}
});*/
class User {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.MinLength)(12),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], User.prototype, "company", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], User.prototype, "firstName", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], User.prototype, "lastName", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.MinLength)(5),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
exports.User = User;
const userSchema = new mongoose_1.Schema({
    email: { type: String, unique: true, required: true },
    company: { type: String },
    firstName: { type: String },
    lastName: { type: String },
    password: { type: String, required: true },
    created: { type: Date, default: new Date() }
    //plan: {type:Schema.Types.ObjectId,ref:"Plan"}
});
exports.UserModel = (0, mongoose_1.model)('User', userSchema);
