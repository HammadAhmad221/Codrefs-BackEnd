
import { ProjectService } from "../services/project.service";
import {Body,Controller,Post,Route,Delete,Path} from "tsoa";
import { Inject } from "typescript-ioc";
import { IAddProjectRequest } from "../models/requests/addproject.request";
   
  
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
  
  }

  
