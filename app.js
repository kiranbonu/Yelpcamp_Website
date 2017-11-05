var express = require("express")
var bodyParser = require("body-parser")
var mongoose = require("mongoose")
var flash = require("connect-flash")
var passport = require("passport")
var LocalStrategy = require("passport-local")
var methodOverride = require("method-override")
var User = require("./models/user")
var campGround = require("./models/campground")
var comment = require("./models/comments")
var seedDB = require("./seeds")

// REQUIRING ROUTES 
var commentRoutes = require("./routes/comments")
var campgroundRoutes = require("./routes/campgrounds")
var authRoutes = require("./routes/auth")


var app = express()
app.use(bodyParser.urlencoded({extended:true}))
mongoose.connect("mongodb://localhost/yelpCamp",{useMongoClient: true})

app.use(express.static(__dirname + "/public"))
app.use(methodOverride("_method"))
app.use(flash())

// seedDB()

// PASSPORT CONFIGURATION 

app.use(require("express-session")({
    secret: "kbonu authentication starts",
    resave:false,
     saveUninitialized: false
    
}))

app.use(passport.initialize())
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use(function(req,res,next){
    res.locals.currentUser = req.user
    res.locals.error = req.flash("error")
    res.locals.success = req.flash("success")
    next()
})



app.use(authRoutes)
app.use(commentRoutes)
app.use("/campground",campgroundRoutes)


app.listen(process.env.PORT,process.env.IP,function(){
    console.log("YelpCamp Server has started")
})