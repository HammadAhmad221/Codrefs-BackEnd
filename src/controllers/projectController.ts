
import { ProjectService } from "../services/project.service";
import {Body,Controller,Post,Route,Delete,Path, Get} from "tsoa";
import { Inject } from "typescript-ioc";
import { IAddProjectRequest } from "../models/requests/addandcloneproject.request";
import { IListBranchesRequest } from "../models/requests/getlistofbranches.request";
import { Types } from "mongoose";
   
  
  @Route("/projects")
  export class ProjectController extends Controller {
    
    @Inject 
    private projectService?:ProjectService;
    
    @Post('/addproject')
    public async buildProject(@Body() request: IAddProjectRequest): Promise<any> {
      return this.projectService?.addAndCloneProject(request);
    }

    @Delete('/deleteproject/{id}')
    public async deleteProject(@Path() id: string): Promise<any> {
      return this.projectService?.deleteProjectById(id);
    }
    @Post('/branches')
    public async listBranches(@Body() request:IListBranchesRequest):Promise<any>{
      return this.projectService?.getBranchNames(request);
    }
    @Get('/getprojects/{author}')
    public async getProjects(@Path() author: Types.ObjectId): Promise<any> {
        return this.projectService?.getProjectsByAuthor(author);
    }
    
    
  }

  
