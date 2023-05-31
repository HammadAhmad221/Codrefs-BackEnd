import { Types } from "mongoose";


export interface IUser {
    
    email: string;
    company:string;
    firstName:string;
    lastName:string;
    password: string;
    type:string;
    plan:number;
    author:Types.ObjectId | null;
    created:Date;
    updated:Date;

  }  