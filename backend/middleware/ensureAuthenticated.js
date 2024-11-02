export async function ensureAuthenticated(req,res,next){

    if(req.isAuthenticated()){
        return next();
    }
    res.redirect('https://github-2-frontend.netlify.app/login')
}