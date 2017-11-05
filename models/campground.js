var mongoose = require("mongoose")
// schema setup 

var campGroundSchema = new mongoose.Schema({
    Title: String,
    Image: String,
    description: String,
    author:{
        id:{
            type: mongoose.Schema.Types.ObjectId,
            ref:"user"
        },
        username:String
    },
    comments :[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "comment"
        }
        ]
})


module.exports = mongoose.model("campGround",campGroundSchema)

