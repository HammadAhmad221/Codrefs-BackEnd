import { Controller, Route,Post,Get, Body, SuccessResponse} from 'tsoa';
import { Inject } from 'typescript-ioc';
import { User } from '../users/user';
import AuthService from '../authentication/passportAuth';


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
  @Get('login/google')
  public googleLogin(): any {
    return this.authService.googleLogin();
  }

  @Get('login/google/callback')
  @SuccessResponse('302', 'Redirect to home page')
  public googleLoginCallback(): any {
    return this.authService.googleLoginCallback();
  }
  
}
