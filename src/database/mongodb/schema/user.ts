import { Schema,model } from "mongoose";
import { User } from "../../../entities/user";

const userSchema = new Schema<User>({
    email: { type: String , unique: true,required:true },
    company: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    password: {type: String, required:true},
    created:{type:Date,default:new Date()}
    });
    
    export const UserModel = model<User>('User', userSchema);