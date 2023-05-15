import { Controller, Route,Post, Body } from 'tsoa';
import { Inject } from 'typescript-ioc';
import { User } from '../users/user';
import AuthService from '../authentication/passportAuth';
//import { Validate } from 'class-validator';

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
}
