
import { UserService } from "../services/user.service";
//import DatabaseService from ".././services/database.service";
import {
  Body,
    Controller,
    Get,
    Post,
    Route,
  } from "tsoa";
import { Inject } from "typescript-ioc";
import { ILoginRequest } from "../models/requests/login.request";
import { ISignupRequest } from "../models/requests/signup.request";
   
  
  @Route("/users")
  export class UsersController extends Controller {
    
    @Inject 
    private userService?:UserService;
    

    @Get("/test")
    public async testAPI(
      
    ): Promise<any> {
      return {test:true};
    }
  
    @Post('/login')
    public async login(@Body() request: ILoginRequest): Promise<any> {
      return this.userService?.loginWithEmailPassword(request);
    }

    @Post('/signup')
    public async signup(@Body() request: ISignupRequest): Promise<any> {
      return this.userService?.signupWithEmail(request);
    }
  
  
  
  }

  
