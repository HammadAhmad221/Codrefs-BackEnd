import { Schema,model } from "mongoose";
import { Project } from "../../../entities/project";


const projectSchema = new Schema<Project>({
    name: {type: String , required:true },
    sourceControl: {type: Number},
    repositoryURL: {type: String},
    accessToken: {type: String},
    author: {type: Schema.Types.ObjectId,ref:"User"},
    gitusername: {type: String},
    branch:{type:String},
    created: {type: Date},
    updated: {type: Date},
    });
    
    export const ProjectModel = model<Project>('Project', projectSchema);

 