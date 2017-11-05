var mongoose = require("mongoose")
var passportLocalMongose = require("passport-local-mongoose")

var userSchema = new mongoose.Schema({
    username: String,
    password: String
})

userSchema.plugin(passportLocalMongose)

module.exports = mongoose.model("user",userSchema)