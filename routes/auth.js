var express = require("express")
var router = express.Router()
var passport = require("passport")
 var User = require("../models/user")


// ROOT ROUTE 
router.get("/",function(req,res){
    res.render("landing.ejs")
})


//++++++++++++++++++++++++++++++++++++++
//AUTH ROUTES 
//+++++++++++++++++++++++++++++++++++++++

// SHOW REGISTER 
router.get("/register",function(req, res) {
    res.render("register.ejs")
})

//handle singup logic
router.post("/register",function(req, res) {
    var newUser = new User({username: req.body.username})
    User.register(newUser,req.body.password,function(err,user){
        if(err){
            // req.flash("error",err.message)
            return res.render("register.ejs",{"error":err.message})
        }else{
            passport.authenticate("local")(req,res,function(){
                req.flash("success","Welcome to YelpCamp"+User.username)
                res.redirect("/campground")
            })
        }
    })
})

// SHOW LOGIN 
router.get("/login",function(req, res) {
    res.render("login.ejs")
})

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect:"/campground",
        failureRedirect:"/login"
    }),function(req, res) {
})

// LOGOUT 
router.get("/logout",function(req, res) {
    req.logout()
    req.flash("success","Logged you out!")
    res.redirect("/campground")
})


function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }else
    res.redirect("/login")
}

module.exports = router