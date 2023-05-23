import { ObjectId } from "mongoose";
import { PLANS, USER_TYPES } from "../constants/constants";
import { IUser } from "../models/user.model";
import moment from 'moment';
export class User implements IUser{
     
    email: string;
    company: string;
    firstName: string;
    lastName: string;
    password: string;
    type:string;
    plan:number;
    author: ObjectId | null;
    created: Date;
    updated:Date;
    

    constructor(jsonObject:IUser){
        this.email=jsonObject.email ?? '';
        this.company=jsonObject.company ?? '';
        this.firstName=jsonObject.firstName ?? '';
        this.lastName=jsonObject.lastName ?? '';
        this.password=jsonObject.password ?? '';
        this.type=jsonObject.type ?? USER_TYPES.ADMIN;
        this.plan=jsonObject.plan ?? PLANS.BASIC;
        this.author=jsonObject.author ?? null;
        this.created=jsonObject.created ?? moment().utc().toDate();
        this.updated=jsonObject.updated ?? moment().utc().toDate();
    }
    
    
}

