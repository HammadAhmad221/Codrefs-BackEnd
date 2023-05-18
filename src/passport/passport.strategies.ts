import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth2';

passport.use(
    new GoogleStrategy(
      {
        clientID: '364608439523-7kbcap43n3sk2d1ldvc7h50b0ju4o4u4.apps.googleusercontent.com',
        clientSecret: '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',
        callbackURL: '/auth/login/google/callback',
        scope: ['email']
      },
      function(accessToken, refreshToken, profile) {
        console.log("Access Token;",accessToken);
        console.log("Refresh Token;",refreshToken);
        console.log("Profile ;",profile);
        
      }
    
    )
    
  );
  
   
  export default passport;