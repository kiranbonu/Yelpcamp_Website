var express = require("express")
var router = express.Router()
var campGround = require("../models/campground")
var middleware = require("../middleware")

var newCamp
var newImage
var newDesc

// INDEX 
router.get("/",function(req,res){
    campGround.find({},function(err,resp){
    if(err){
        console.log("Something is wrong with find the cat")
    }else{
        res.render("campgrounds/Index.ejs",{campings:resp,currentUser:req.user})
    }
})
    // res.render("campage.ejs",{campings:camps})
})

// CREATE  
router.post("/",middleware.isLoggedIn,function(req,res){
     newCamp = req.body.camp_name
     newImage = req.body.camp_image
     newDesc = req.body.camp_description
     var author = {
         id: req.user._id,
         username: req.user.username
     }
     var campground = {Title:newCamp,Image:newImage,description:newDesc,author:author}
    //  camps.push(campground)
    campGround.create(campground,function(err,resp){
        if(err){
            console.log("err")
        }else{
            res.redirect("/campground")      
        }
    })
})

// NEW 
router.get("/new",middleware.isLoggedIn, function(req, res) {
    res.render("campgrounds/new.ejs")
})


// SHOW ROUTE 
router.get("/:id",function(req, res) {
    campGround.findById(req.params.id).populate("comments").exec(function(err,resp){
        if(err){
            console.log("id not found")
        }else{
            res.render("campgrounds/description.ejs",{campground:resp})      
        }
    })
})

// EDIT CAMPGROUND ROUTE 
router.get("/:id/edit",middleware.authandauthen,function(req, res) {
        campGround.findById(req.params.id,function(err,foundcampground){
                res.render("campgrounds/edit.ejs",{campground:foundcampground})            
    })
})


// UPDATE CAMPGROUND ROUTE 
router.put("/:id",middleware.authandauthen, function(req,res){
    newCamp = req.body.camp_name
    newImage = req.body.camp_image
    newDesc = req.body.camp_description
    var campground = {Title:newCamp,Image:newImage,description:newDesc}
    campGround.findByIdAndUpdate(req.params.id, campground, {new: true}, function(err,resp){
        if(err){
            res.redirect("/campground")
        }else{
            res.redirect("/campground/"+req.params.id)
        }
    })
})

// DESTROY CAMPGROUN 

router.delete("/:id",middleware.authandauthen, function(req,res){
    campGround.findByIdAndRemove(req.params.id,function(err){
        if(err){
            console.log("/campground")
        }else{
            res.redirect("/campground")
        }
    })    
})


module.exports = router