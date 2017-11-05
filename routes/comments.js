var express = require("express")
var router = express.Router()
var campGround = require("../models/campground")
var comment = require("../models/comments")
var middleware = require("../middleware")


// ====== comments route
// COMMENTS NEW 
router.get("/campground/:id/comments/new",middleware.isLoggedIn, function(req, res) {
    campGround.findById(req.params.id,function(err,resp){
        if(err){
            console.log(err)
        }else{
            res.render("comments/new.ejs",{campground:resp})      
        }
    })
})

// COMMENTS CREATE 
router.post("/campground/:id/comments",middleware.isLoggedIn,function(req,res){
    campGround.findById(req.params.id,function(err,resp){
        if(err){
            console.log(err)
            res.redirect("/campgrounds")
        }else{
            console.log(req.body.comment)
            comment.create(req.body.comment,function(err,resp_comment){
                if(err){
                    req.flash("error","Something went wrong")
                    console.log(err)
                }else{
                    //add username and id to comment 
                    resp_comment.author.id = req.user._id
                    resp_comment.author.username = req.user.username
                    resp_comment.save()
                    resp.comments.push(resp_comment)
                    resp.save()
                    req.flash("success","successfully added new comment")
                    res.redirect("/campground/"+resp._id)
                }
            })
        }
    }) 
})

// COMMENT EDIT
router.get("/campground/:id/comments/:comment_id/edit",middleware.commentAuthorShip,function(req,res){
    comment.findById(req.params.comment_id,function(err, resp) {
        if(err){
            res.redirect("back")
        }else{
            res.render("comments/edit.ejs",{campground_id:req.params.id,comment:resp})
        }
    })
})

// COMMENT UPDATE
router.put("/campground/:id/comments/:comment_id",middleware.commentAuthorShip,function(req,res){
    comment.findByIdAndUpdate(req.params.comment_id,req.body.comment,function(err,resp){
        if(err){
            res.redirect("back")
        }else{
            res.redirect("/campground/"+req.params.id)
        }
    })
})

// DELETE COMMENT 

router.delete("/campground/:id/comments/:comment_id",middleware.commentAuthorShip,function(req,res){
    comment.findByIdAndRemove(req.params.comment_id,function(err){
        if(err){
            res.redirect("back")
        }else{
            req.flash("success","comment deleted")
            res.redirect("/campground/"+ req.params.id)
        }
    })
})

module.exports = router