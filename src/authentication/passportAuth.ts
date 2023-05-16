import { User, UserModel } from '../users/user';
import { Singleton } from 'typescript-ioc';
import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcrypt';

//import { IsNotEmpty } from 'class-validator';
//import { Body } from 'tsoa';

passport.use(
  new LocalStrategy(
    { usernameField: 'email', passwordField: 'password' },

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
export default class AuthService {
  public async signup(user: User): Promise<{ success: boolean; message: string }> {
    try {
      //console.log("Received user object:", user);
      const existingUser = await UserModel.findOne({ username: user.email }).exec();
      //console.log("Existing user:", existingUser);
      if (existingUser) {
        return { success: false, message: 'Username already exists.Please enter different one.' };
      }
      if (!user.email || !user.password) {
        return { success: false, message: 'Username and password are required' };
      }
      
      // Hash the password
      const hashedPassword = await bcrypt.hash(user.password, 10);
  
      // Create a new user object with the hashed password
      const newUser = { ...user, password: hashedPassword };
  
      await UserModel.create(newUser);
      return { success: true, message: 'User created successfully' };
    } catch (err) {
      console.error(err);
      return { success: false, message: 'Error creating user' };
    }
  }
  public login(user: User): Promise<{ success: boolean; message: string }> {
    
   
    return new Promise((resolve, reject) => {
      passport.authenticate('local', async (err:any) => {
        if (err) {
          console.error(err);
          return reject({ success: false, message: 'Internal server error' });
        }
        const existingUser = await UserModel.findOne({ username: user.email }).exec();
        
        if (!existingUser) {
          return resolve({ success: false, message: `Username:${user.email} does not exist. Please enter the correct username` });
        }
  
        // Compare the hashed password
        const passwordMatch =await bcrypt.compare(user.password, existingUser.password);
        
         if (!passwordMatch) {
          return resolve({ success: false, message: `please enter correct password:Mr.${user.email}`});
        }
        return resolve({ success: true, message: 'Login successful' });
      })({ user });
    });
  }
    //Without Hashing WC
  /*public async signup(user: User): Promise<{ success: boolean; message: string }> {
    try {
      console.log("Received user object:", user);
      const existingUser = await UserModel.findOne({ username: user.username }).exec();
      console.log("Existing user:", existingUser);
      if (existingUser) {
        return { success: false, message: 'User already exists' };
      }
      if (!user.username || !user.password) {
        return { success: false, message: 'Username and password are required' };
      }
      await UserModel.create(user);
      return { success: true, message: 'User created successfully' };
    } catch (err) {
      console.error(err);
      return { success: false, message: 'Error creating user' };
    }
}
public async login(user: User): Promise<{ success: boolean; message: string }> {
  const existingUser = await UserModel.findOne({ username: user.username }).exec();
    return new Promise((resolve, reject) => {
      passport.authenticate('local', (err:any) => {
        if (err) {
          console.error(err);
          return reject({ success: false, message: 'Internal server error' });
        }
        
        if (!existingUser) {
          return resolve({ success: false, message: `Username: ${user.username} does not exists.Please enter correct username` });
        }
        if (existingUser.password!==user.password) {
          return resolve({ success: false, message: `please enter correct password:Mr.${user.username}` });
        }
        return resolve({ success: true, message: 'Login successful' });
      })({ user });
    });
  }*/

}
