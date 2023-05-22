import { Schema,model } from "mongoose";

import { PLANS, USER_TYPES } from "../../../constants/constants";
import { User } from "../../../entities/user";


const userSchema = new Schema<User>({
    email: { type: String , unique: true,required:true },
    company: {type: String},
    firstName: {type: String},
    lastName: {type: String},
    password: {type: String, required:true},
    type:{type: String, required:true,default:USER_TYPES.ADMIN},
    plan:{type: Number, required:true,default:PLANS.BASIC},
    created:{type:Date,default:new Date()},
    updated:{type:Date,default:new Date()}
    });
    
    export const UserModel = model<User>('User', userSchema);