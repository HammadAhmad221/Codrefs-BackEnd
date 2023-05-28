import passport from 'passport';
import { Strategy as GitHubStrategy } from 'passport-github';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';


//used passportGoogleOauth2 Stratigy
passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.GOOGLE_SECRET || '',
        callbackURL: '/auth/login/google/callback',
        scope:['profile','email'],
       passReqToCallback: true, // Pass the request object to the callback function
      },
      function verify(accessToken, refreshToken,object0, profile, done) {
       
        done(null,profile);
      })
    
  );
//used passportGithub Stratigy
  passport.use(

    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID || '',
        clientSecret: process.env.GITHUB_SECRET||'',
        callbackURL: '/auth/login/github/callback',
      },
      function verify(accessToken, refreshToken, profile, done) {
        // Handle user authentication logic here (e.g., create session, JWT token, etc.)
        // ...
        return done(null, profile);
      }
    )
  );
  export default passport;