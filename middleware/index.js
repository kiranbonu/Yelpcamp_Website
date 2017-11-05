var campGround = require("../models/campground")
var comment = require("../models/comments")
var middlewareObj = {}

middlewareObj.authandauthen = function(req,res,next){
    if(req.isAuthenticated()){
        campGround.findById(req.params.id,function(err,foundcampground){
        if(err){
            req.flash("error","Campground not found")
            res.redirect("back")
        } else {
            if(foundcampground.author.id.equals(req.user._id)){
                next()
            } else {
                req.flash("error","You dont have permission to do that")
                res.redirect("back")
            }
         }
    })   
    }else{
        req.flash("error","You need to be logged in to do that")
        res.redirect("back")
    }
}

middlewareObj.commentAuthorShip = function(req,res,next){
    if(req.isAuthenticated()){
        comment.findById(req.params.comment_id,function(err,foundcomment){
        if(err){
            res.redirect("back")
        } else {
            if(foundcomment.author.id.equals(req.user._id)){
                next()
            } else {
                req.flash("error","You dont have permission to do that")
                res.redirect("back")
            }
         }
    })   
    }else{
        req.flash("error","You need to be logged in to do that")
        res.redirect("back")
    }
}

middlewareObj.isLoggedIn = function(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }else
    req.flash("error","You need to be logged in to do that")
    res.redirect("/login")
}

module.exports = middlewareObj