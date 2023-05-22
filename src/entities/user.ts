import { IUser } from "../models/user.model";

export class User implements IUser{
    email: string;
    company: string;
    firstName: string;
    lastName: string;
    password: string;
    created: Date;

    constructor(jsonObject:IUser){

        this.email=jsonObject.email ?? '';
        this.company=jsonObject.company ?? '';
        this.firstName=jsonObject.firstName ?? '';
        this.lastName=jsonObject.lastName ?? '';
        this.password=jsonObject.password ?? '';
        this.created=jsonObject.created ?? new Date();

    }
    
}