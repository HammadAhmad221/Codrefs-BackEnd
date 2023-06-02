
import { UserService } from "../services/user.service";
import {Body,Controller,Get,Post,Route,Delete,Path, Request,Security} from "tsoa";
import { Inject } from "typescript-ioc";
import { ILoginRequest } from "../models/requests/login.request";
import { ISignupRequest } from "../models/requests/signup.request";
import { ISubscriptionRequest } from "../models/requests/subscription.request";


import { Request as ExpressRequest } from 'express';
import { IUserSession } from "../models/user.session";


   
  
  @Route("/users")
  export class UsersController extends Controller {
    
    @Inject 
    private userService?:UserService;
    

    @Get("/test")
    @Security('bearerAuth')
    public async testAPI(
    @Request() request:ExpressRequest
    ): Promise<any> {
      let userSession:IUserSession|undefined=request.user as IUserSession;
      return {test:true,session:userSession.id};
    }
  
    @Post('/login')
    public async login(@Body() request: ILoginRequest): Promise<any> {
      return this.userService?.loginWithEmailPassword(request);
    }

    @Post('/signup')
    public async signup(@Body() request: ISignupRequest): Promise<any> {
      return this.userService?.signupWithEmail(request);
    }
    @Delete('/deleteuser/{id}')
    public async deleteProject(@Path() id: string): Promise<any> {
      return this.userService?.deleteUserById(id);
    }

    @Post('/subscribe')
    public async subscribe(@Body() request: ISubscriptionRequest): Promise<any> {
      return this.userService?.subscribeWithEmail(request.email);
    }
    @Get('/getusers')
    @Security('bearerAuth')
    public async getUsers(@Request() request:ExpressRequest): Promise<any> {
       let userSession:IUserSession|undefined=request.user as IUserSession;
        return this.userService?.getUsersByAuthor(userSession);
    }
  }

  
