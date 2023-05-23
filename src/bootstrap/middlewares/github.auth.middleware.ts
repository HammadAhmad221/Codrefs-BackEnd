import passport from "../../passport/github.stratigy";

export function setupGithubAuthMiddleware(app){
    app.use('/github',passport.authenticate('github', { scope: ['profile'] },(response:any)=>{
        console.log("Response in direct(github) callback:",response);
      }));
      
      app.use('/auth/login/github/callback',passport.authenticate('github',{ session: false }),(req,res)=>{
        //console.log("Requestsss:",req.user._json);
        res.json(req.user._json);
      });
      
      
}