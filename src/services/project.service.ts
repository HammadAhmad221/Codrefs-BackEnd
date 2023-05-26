import { clone } from 'isomorphic-git';
import http from 'isomorphic-git/http/node';
import fs from 'fs';
import { Inject } from "typescript-ioc";
import { ProjectRepository } from "../repositories/project.repository";
import ResponseBuilder from "../common/response.builder";
import { IAddProjectRequest } from "../models/requests/addproject.request";
import { IAddProjectResponce } from "../models/responses/addproject.responce";


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
        request.gitusername,
        request.branch
      );
      const { repositoryURL,accessToken,gitusername,branch } = addProjectResponse;
       // Clone the repository
      let auth = { username:gitusername,password:accessToken};
      await clone({
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
        gitusername: addProjectResponse.gitusername,
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
  
}

