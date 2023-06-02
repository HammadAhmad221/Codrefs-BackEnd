
import { ProjectService } from "../services/project.service";
import {Body,Controller,Post,Route,Delete,Path, Get,Security, Request} from "tsoa";
import { Inject } from "typescript-ioc";
import { IAddProjectRequest } from "../models/requests/addandcloneproject.request";
import { IListBranchesRequest } from "../models/requests/getlistofbranches.request";
import { Request as ExpressRequest } from "express";
import { IUserSession } from "../models/user.session";
  
  @Route("/projects")
  export class ProjectController extends Controller {
    
    @Inject 
    private projectService?:ProjectService;
    
    @Post('/addproject')
    @Security('bearerAuth')
    public async buildProject(@Body() body: IAddProjectRequest,@Request() request:ExpressRequest): Promise<any> {
      let userSession:IUserSession|undefined=request.user as IUserSession;
      return this.projectService?.addAndCloneProject(body,userSession);
    }

    @Delete('/deleteproject/{id}')
    public async deleteProject(@Path() id: string): Promise<any> {
      return this.projectService?.deleteProjectById(id);
    }
    @Post('/branches')
    public async listBranches(@Body() request:IListBranchesRequest):Promise<any>{
      return this.projectService?.getBranchNames(request);
    }
    @Get('/getprojects')
    @Security('bearerAuth')
    public async getProjects(@Request() request:ExpressRequest): Promise<any> {
      let userSession:IUserSession|undefined=request.user as IUserSession;
        return this.projectService?.getProjectsByAuthor(userSession);
    }
    
    
  }

  
