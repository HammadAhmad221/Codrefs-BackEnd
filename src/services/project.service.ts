import { clone } from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
import fs from 'fs';
import { Inject } from "typescript-ioc";
import { ProjectRepository } from "../repositories/project.repository";
import ResponseBuilder from "../common/response.builder";
import { IAddProjectRequest } from "../models/requests/addandcloneproject.request";
import { IAddProjectResponce } from "../models/responses/addandcloneproject.responce";
import { IListBranchesRequest } from '../models/requests/getlistofbranches.request';
const { Octokit } = require("@octokit/rest");
import axios from 'axios';



export class ProjectService {
  constructor(
    @Inject private projectRepository: ProjectRepository,
    @Inject private responseBuilder: ResponseBuilder
  ) {}

  async addAndCloneProject(request: IAddProjectRequest): Promise<any> {
    try {
      let addProjectResponse: any = await this.projectRepository.addProject(
        request.name,
        request.repositoryURL,
        request.accessToken,
        request.gitUsername,
        request.branch
      );
      const { repositoryURL,accessToken,gitUsername,branch } = addProjectResponse;
       // Clone the repository
      let auth = { username:gitUsername,password:accessToken};
     clone({
        http,
        fs,
        dir: "/"+addProjectResponse._id,
        url: repositoryURL,
        singleBranch: true,
        ref:branch,
       onAuth:()=> auth,
      });
      let projectResponse: IAddProjectResponce = {
        name: addProjectResponse.name,
        sourceControl: addProjectResponse.sourceControl,
        repositoryURL: addProjectResponse.repositoryURL,
        gitUsername: addProjectResponse.gitUsername,
        accessToken: addProjectResponse.accessToken,
        branch:addProjectResponse.branch,
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
      return this.responseBuilder.successResponse('Project deleted successfully');
    } catch (error) {
      return this.responseBuilder.errorResponse(error);
    }
  }

  async getBranchNames(request:IListBranchesRequest):Promise<any> {

    if(request.platform==='github'){  
    const octokit = new Octokit({
      auth:request.accessToken
    });
  
    try {
      const response = await octokit.rest.repos.listBranches({
        owner:request.gitUsername,
        repo:request.repositoryName,
      });
  
      const branchNames = response.data.map((branch) => branch.name);
      return this.responseBuilder.successResponse(branchNames);
    } catch (error) {
      return this.responseBuilder.errorResponse(error);
    }
  }
else{ 
    const url = `https://api.bitbucket.org/2.0/repositories/${request.gitUsername}/${request.repositoryName}/refs/branches`;
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${request.accessToken}`,
        }
      });
  
      const branchNames: string[] = response.data.values.map((branch: any) => branch.name);
      return this.responseBuilder.successResponse(branchNames);
    } catch (error) {
     return this.responseBuilder.errorResponse(error);
    }
  }

}
  
}

