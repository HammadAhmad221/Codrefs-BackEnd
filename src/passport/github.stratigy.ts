import passport from "passport";
import { Strategy as GitHubStrategy } from 'passport-github';

passport.use(
  new GitHubStrategy(
    {
      clientID: 'c43f3670702d49094f68',
      clientSecret: '89dde2d85b9ecfb4a14bf74c531bb7a835006346',
      callbackURL: 'http://localhost:3000/auth/login/github/callback',
    },
    function (accessToken, refreshToken, profile, done) {
      // Handle user authentication logic here (e.g., create session, JWT token, etc.)
      // ...
      console.log(accessToken);
      console.log(refreshToken);
      return done(null, profile);
    }
  )
);
export default passport;