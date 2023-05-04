/*import { User, UserModel } from '../users/user';
import { Singleton } from 'typescript-ioc';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
//import { Body } from 'tsoa';

passport.use(
  new LocalStrategy(
    { usernameField: 'username', passwordField: 'password' },
    async (username, password, done) => {
      const user = await UserModel.findOne({ username }).exec();
      if (!user) {
        return done(null, false, { message: 'User not found' });
      }
      if (user.password !== password) {
        return done(null, false, { message: 'Incorrect password' });
      }
      return done(null, user);
    }
  )
);

@Singleton
export class AuthService {
  public async signup(user: User): Promise<{ success: boolean; message: string }> {
    try {
      const existingUser = await UserModel.findOne({ username: user.username }).exec();
      if (existingUser) {
        return { success: false, message: 'User already exists' };
      }
      await UserModel.create(user);
      return { success: true, message: 'User created successfully' };
    } catch (err) {
      console.error(err);
      return { success: false, message: 'Error creating user' };
    }
  }
  
  public async login(user: User): Promise<{ success: boolean; message: string }> {
    return new Promise((resolve, reject) => {
      passport.authenticate('local', (err:any, user:any, info:any) => {
        if (err) {
          console.error(err);
          return reject({ success: false, message: 'Internal server error' });
        }
        if (!user) {
          return resolve({ success: false, message: info.message });
        }
        return resolve({ success: true, message: 'Login successful' });
      })({ username: user.username, password: user.password });
    });
  }
}*/  
