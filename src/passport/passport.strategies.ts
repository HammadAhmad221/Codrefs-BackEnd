import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';
import { Strategy as LocalStrategy } from 'passport-local';
import { UserModel } from '../database/mongodb/schema/user';



passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_SECRET || '',
        callbackURL: '/auth/login/google/callback',
        scope:['profile','email'],
       passReqToCallback: true, // Pass the request object to the callback function
      },
      function verify(accessToken, refreshToken, object0, profile, done) {
       
        done(null,profile);
      }
    
    )
    
  );

  passport.use(
    new LocalStrategy(
      { usernameField: 'email', passwordField: 'password' },
  
      async (email, password, done) => {
        const user = await UserModel.findOne({ email }).exec();
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
  
   
  export default passport;