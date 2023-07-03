import {  Types } from "mongoose";

export interface IProject{
    name:string;
    sourceControl:number;
    repositoryURL:string;
    accessToken:string;
    author:Types.ObjectId | null;
    gitUsername:string;
    branch:string,
    created:Date;
    updated:Date;
}