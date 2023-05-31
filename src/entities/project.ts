import moment from "moment";
import { IProject } from "../models/project.model";
import { SOURCE_CONTROL } from "../constants/constants";
import { Types } from "mongoose";

export class Project implements IProject{
    name: string;
    sourceControl: number;
    repositoryURL: string;
    accessToken: string;
    author: Types.ObjectId | null;
    gitusername: string;
    branch: string;
    created: Date;
    updated: Date;
    
    constructor(json:IProject){
        this.name=json.name ?? "";
        this.sourceControl=json.sourceControl ?? SOURCE_CONTROL.GITHUB;
        this.repositoryURL=json.repositoryURL ?? "";
        this.accessToken=json.accessToken ?? "";
        this.author=json.author ?? null;
        this.gitusername=json.gitusername ?? "";
        this.branch=json.branch??"";
        this.created=json.created ?? moment().utc().toDate();
        this.updated=json.updated ?? moment().utc().toDate();
    }
}