import passport from "../../passport/passport.strategies";

export function setupGoogleAuthMiddleware(app){
    app.use('/google',passport.authenticate('google', { scope: ['profile','email'] },(response:any)=>{
        console.log("Response in direct callback:",response);
      }));
      
      app.use('/auth/login/google/callback',passport.authenticate('google',{ session: false }),(req,res)=>{
        //console.log("Requestsss:",req.user._json);
        res.json(req.user._json);
      });
      
      
}