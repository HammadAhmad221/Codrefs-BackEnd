import { ObjectId } from "mongoose";

export interface IProject{
    name:string;
    sourceControl:number;
    repositoryURL:string;
    accessToken:string;
    author:ObjectId | null;
    gitusername:string;
    branch:string,
    created:Date;
    updated:Date;
}