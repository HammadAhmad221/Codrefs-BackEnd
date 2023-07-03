import { Schema,model } from "mongoose";
import { Project } from "../../../entities/project";


const projectSchema = new Schema<Project>({
    name: {type: String , required:true },
    sourceControl: {type: Number},
    repositoryURL: {type: String,unique:true},
    accessToken: {type: String},
    author: {type: Schema.Types.ObjectId,ref:"User"},
    gitUsername: {type: String},
    branch:{type:String},
    created: {type: Date},
    updated: {type: Date},
    });
    
    export const ProjectModel = model<Project>('Project', projectSchema);

 