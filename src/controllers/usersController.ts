
import { UserService } from "../services/user.service";
//import DatabaseService from ".././services/database.service";
import {
    Controller,
    Get,
    // Path,
    // Query,
    Route,
    // SuccessResponse,
  } from "tsoa";
import { Inject } from "typescript-ioc";
  // import { User } from "./user";
  // import { UsersService, UserCreationParams } from "./usersService";
  
  @Route("/users")
  export class UsersController extends Controller {
    
    // @Inject
    // private databaseService?:DatabaseService;
    @Inject 
    private userService?:UserService;
    
    @Get("/test")
    public async testAPI(
      
    ): Promise<any> {
      return {test:this.userService?.getUser()};
    }}
