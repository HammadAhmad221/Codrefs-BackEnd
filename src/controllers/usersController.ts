// src/users/usersController.ts
//fake
import { User } from '../users/user';
//fakeend
import DatabaseService from ".././services/database.service";
import {
     Body,
    Controller,
    Get,
    // Path,
     Post,
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

    @Get("/testing")
    public async testingAPI(
      
    ): Promise<any> {
      return {testing:"success"};
    }
/*
    @Get("/test")
    public async testAPI(
      
    ): Promise<any> {
      return {test:this.databaseService?.testFunction()};
    }
    //fake
  */

    @Post('/signup')
  public async signup(@Body() user: User): Promise<string> {
    const result = await this.databaseService?.signup(user);
    if(result){ return result.message;} else {return 'result is undefined'}
  }
  //fakeend
  }
