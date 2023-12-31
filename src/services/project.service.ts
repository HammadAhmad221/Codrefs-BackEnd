import { clone } from "isomorphic-git";
import http from "isomorphic-git/http/node";
import fs from "fs";
import { Inject } from "typescript-ioc";
import { SOURCE_CONTROL } from "../constants/constants";
import { ProjectRepository } from "../repositories/project.repository";
import ResponseBuilder from "../common/response.builder";
import { IAddProjectRequest } from "../models/requests/addandcloneproject.request";
import { IAddProjectResponce } from "../models/responses/addandcloneproject.responce";
import { IListBranchesRequest } from "../models/requests/getlistofbranches.request";
const { Octokit } = require("@octokit/rest");
import axios from "axios";
import { Types } from "mongoose";
import { IUserSession } from "../models/user.session";

export class ProjectService {
  constructor(
    @Inject private projectRepository: ProjectRepository,
    @Inject private responseBuilder: ResponseBuilder
  ) {}

  async addAndCloneProject(
    request: IAddProjectRequest,
    session: IUserSession
  ): Promise<any> {
    try {
      let addProjectResponse: any = await this.projectRepository.addProject(
        request.name,
        request.repositoryURL,
        request.accessToken,
        request.gitUsername,
        request.branch,
        session.id,
        request.versionControl
      );
      var { repositoryURL, accessToken, gitUsername, branch } =
        addProjectResponse;

        var auth;// = { username: gitUsername, password: accessToken };
        if(request.versionControl==SOURCE_CONTROL.GITHUB){
          auth={username:accessToken};
        }else if(request.versionControl==SOURCE_CONTROL.BITBUCKET){
          auth={username:request.gitUsername,password:request.accessToken};

          let urlPart=repositoryURL.split("@")[1];
          repositoryURL="https://x-token-auth:"+accessToken+"@"+urlPart;
        
        }

  
     
    clone({
        http,
        fs,
        dir: "/home/ec2-user/repositories/" + addProjectResponse._id,
        url: repositoryURL,
        singleBranch: true,
        ref: branch, 
         onAuth: () => auth,
      });
      let projectResponse: IAddProjectResponce = {
        _id:addProjectResponse._id,
        name: addProjectResponse.name,
        versionControl: addProjectResponse.versionControl,
        repositoryURL: addProjectResponse.repositoryURL,
        gitUsername: addProjectResponse.gitUsername,
        accessToken: addProjectResponse.accessToken,
        branch: addProjectResponse.branch,
        created: addProjectResponse.created,
        updated: addProjectResponse.updated,
      };
    

      return this.responseBuilder.successResponse(projectResponse);
    } catch (error) {
      return this.responseBuilder.errorResponse(error);
    }
  }

  async deleteProjectById(id: string): Promise<any> {
    try {
      await this.projectRepository.deleteProjectById(id);
      return this.responseBuilder.successResponse(
        "Project deleted successfully"
      );
    } catch (error) {
      return this.responseBuilder.errorResponse(error);
    }
  }

  async getBranchNames(request: IListBranchesRequest): Promise<any> {
    if (request.versionControl === SOURCE_CONTROL.GITHUB) {
      const octokit = new Octokit({
        auth: request.accessToken,
      });

      try {
        const response = await octokit.rest.repos.listBranches({
          owner: request.gitUsername,
          repo: request.repositoryName,
        });

        const branchNames = response.data.map((branch) => branch.name);
        return this.responseBuilder.successResponse(branchNames);
      } catch (error) {
        return this.responseBuilder.errorResponse(error);
      }
    }
    if (request.versionControl === SOURCE_CONTROL.BITBUCKET) {
      const url = `https://api.bitbucket.org/2.0/repositories/${request.gitUsername}/${request.repositoryName}/refs/branches`;
      try {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${request.accessToken}`,
          },
        });

        const branchNames: string[] = response.data.values.map(
          (branch: any) => branch.name
        );
        return this.responseBuilder.successResponse(branchNames);
      } catch (error) {
        return this.responseBuilder.errorResponse(error);
      }
    }
  }
  async getProjectsByAuthor(session: IUserSession): Promise<any> {
    try {
      const projects = await this.projectRepository.getProjectsByAuthor(
        new Types.ObjectId(session.id)
      );
      return this.responseBuilder.successResponse(projects);
    } catch (error) {
      return this.responseBuilder.errorResponse(error);
    }
  }
}
