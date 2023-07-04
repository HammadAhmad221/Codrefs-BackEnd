import moment from "moment";
import { IProject } from "../models/project.model";
import { SOURCE_CONTROL } from "../constants/constants";
import { Types } from "mongoose";

export class Project implements IProject {
  name: string;
  versionControl: number;
  repositoryURL: string;
  accessToken: string;
  author: Types.ObjectId | null;
  gitUsername: string;
  branch: string;
  created: Date;
  updated: Date;

  constructor(json: IProject) {
    this.name = json.name ?? "";
    this.versionControl = json.versionControl ?? SOURCE_CONTROL.GITHUB;
    this.repositoryURL = json.repositoryURL ?? "";
    this.accessToken = json.accessToken ?? "";
    this.author = json.author ?? null;
    this.gitUsername = json.gitUsername ?? "";
    this.branch = json.branch ?? "";
    this.created = json.created ?? moment().utc().toDate();
    this.updated = json.updated ?? moment().utc().toDate();
  }
}
