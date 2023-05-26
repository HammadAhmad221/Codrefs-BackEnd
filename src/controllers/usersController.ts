
import { UserService } from "../services/user.service";
import {Body,Controller,Get,Post,Route,Delete,Path} from "tsoa";
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
    @Delete('/deleteuser/{id}')
    public async deleteProject(@Path() id: string): Promise<any> {
      return this.userService?.deleteUserById(id);
    }
  }

  
