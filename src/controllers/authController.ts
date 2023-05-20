import { Controller, Route,Post,Get, Body} from 'tsoa';
import { Inject } from 'typescript-ioc';

// import passport from '../passport/passport.strategies';
import AuthService from '../authentication/passportAuth';
import { User } from '../entities/user';



@Route('auth')
export class AuthController extends Controller {
  @Inject private authService!: AuthService;


  @Post('/signup')
  public async signup(@Body()user: User): Promise<String> {
    const result = await this.authService.signup(user);
    return result.message;
  }

  @Post('/login')
  public async login(@Body() user: User): Promise<string> {
    const result = await this.authService.login(user);
    return result.message;
  }
  @Get('google')
  public async googleLogin(): Promise<any> {
    

     
     
    /*
    passport.authenticate('google', { scope: ['profile', 'email'] }, (error: any, user: any, info: any) => {
      if (error) {
        // Handle authentication error
        return console.log("Error",{ message: 'Authentication Error' },error);
      }

      if (!user) {
        // Handle authentication failure
        console.log("Failed",{ message: 'Authentication Failed' });
      }

      // Handle successful authentication
      // You can redirect to a success page or return an authentication token
      console.log("Success",{ message: 'Authentication Successful' },info);
    })(req, resp);
  */
     
  
  }

  @Get('login/google/callback')
  // @SuccessResponse('200', 'Redirect to home page')
  public googleLoginCallback(): any {
    return {success:true,data:"req"};
    return this.authService.googleLoginCallback();
  }
  
}
