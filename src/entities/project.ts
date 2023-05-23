import moment from "moment";
import { IProject } from "../models/project.model";
import { SOURCE_CONTROL } from "../constants/constants";
import { ObjectId } from "mongoose";

export class Project implements IProject{
    name: string;
    sourceControl: number;
    repositoryURL: string;
    accessToken: string;
    author: ObjectId | null;
    directoryPath: string;
    created: Date;
    updated: Date;
    
    constructor(json:IProject){
        this.name=json.name ?? "";
        this.sourceControl=json.sourceControl ?? SOURCE_CONTROL.GITHUB;
        this.repositoryURL=json.repositoryURL ?? "";
        this.accessToken=json.accessToken ?? "";
        this.author=json.author ?? null;
        this.directoryPath=json.directoryPath ?? "";
        this.created=json.created ?? moment().utc().toDate();
        this.updated=json.updated ?? moment().utc().toDate();
    }
}