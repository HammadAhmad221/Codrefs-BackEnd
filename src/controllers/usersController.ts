// src/users/usersController.ts
import DatabaseService from ".././services/database.service";
import {
    // Body,
    Controller,
    Get,
    // Path,
    // Post,
    // Query,
    Route,
    // SuccessResponse,
  } from "tsoa";
import { Inject } from "typescript-ioc";
  // import { User } from "./user";
  // import { UsersService, UserCreationParams } from "./usersService";
  
  @Route("/users")
  export class UsersController extends Controller {
    
    @Inject
    private databaseService?:DatabaseService;
    
   /*
    @Get("{userId}")
    public async getUser(
      @Path() userId: number,
      @Query() name?: string
    ): Promise<User> {
      return new UsersService().get(userId, name);
    }
  
    @SuccessResponse("201", "Created") // Custom success response
    @Post()
    public async createUser(
      @Body() requestBody: UserCreationParams
    ): Promise<void> {
      this.setStatus(201); // set return status 201
      new UsersService().create(requestBody);
      return;
    }

*/
    @Get("/test")
    public async testAPI(
      
    ): Promise<any> {
      return {test:this.databaseService?.testFunction()};
    }
  }
  