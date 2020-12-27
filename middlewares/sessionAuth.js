function sessionAuth(req,res,next){
    //set varialbe for every pug file
    res.locals.user=req.session.user;
    next();
}

module.exports=sessionAuth;