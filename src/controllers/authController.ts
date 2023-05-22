import { Controller, Route,Post,Get, Body} from 'tsoa';
import { Inject } from 'typescript-ioc';
<<<<<<< HEAD
import { User } from '../users/user';
=======

// import passport from '../passport/passport.strategies';
>>>>>>> d550c8a18b0d0549f8afae7196e70ddb76925197
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
<<<<<<< HEAD
  public googleLogin(): any {
    console.log("on google login");
    return this.authService.googleLogin();
=======
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
     
  
>>>>>>> d550c8a18b0d0549f8afae7196e70ddb76925197
  }


  @Get('login/google/callback')
  public googleLoginCallback(): any {
    return this.authService.googleLoginCallback();
  }
}
