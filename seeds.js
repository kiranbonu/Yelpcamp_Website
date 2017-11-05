var mongoose = require("mongoose")

var campGround = require("./models/campground")


var comment = require("./models/comments")

var data = [
    {
        Title: "Solid Rocks Campground, PL, USA",
        Image:"https://images.unsplash.com/photo-1484960055659-a39d25adcb3c?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=a9a52b28723bcc57f87d62dd8a1cd620",
        description: "Lorem ipsum dolor sit amet, case quas convenire qui no, ex vim oblique veritus epicurei, sit ad suas tritani. Ei est porro libris, propriae maluisset prodesset ei eos. Nibh velit conclusionemque ex eos, in ferri munere percipit mei. Molestiae voluptatum pro ex, quem mentitum patrioque ea cum."
    },
    {
        Title: "Ben Arthur Campground, AL, USA",
        Image:"https://images.unsplash.com/photo-1487730116645-74489c95b41b?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=ee413266c2b4438b00a53be2bc214420",
        description: "Lorem ipsum dolor sit amet, case quas convenire qui no, ex vim oblique veritus epicurei, sit ad suas tritani. Ei est porro libris, propriae maluisset prodesset ei eos. Nibh velit conclusionemque ex eos, in ferri munere percipit mei. Molestiae voluptatum pro ex, quem mentitum patrioque ea cum."
    },
    {
        Title: "Morning Sun campground, TN, USA",
        Image:"https://images.unsplash.com/photo-1496545672447-f699b503d270?ixlib=rb-0.3.5&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max&s=b5b5a265aa808475989c41252861e603",
        description: "Lorem ipsum dolor sit amet, case quas convenire qui no, ex vim oblique veritus epicurei, sit ad suas tritani. Ei est porro libris, propriae maluisset prodesset ei eos. Nibh velit conclusionemque ex eos, in ferri munere percipit mei. Molestiae voluptatum pro ex, quem mentitum patrioque ea cum."
    },
    ]



function seedDB(){
    campGround.remove({},function(err){
    console.log("removed all the campgrounds")
    })    
//     data.forEach(function(seed){
//     campGround.create(seed,function(err,resp){
//         if(err){
//             console.log(err)
//         }else{
//             console.log("added camp ground")
//             comment.create({
//                 text: "This place is great, its also good to have an internet",
//                 author: "holt"
//             },function(err,comment){
//                 if(err){
//                     console.log(err)
//                 }
//                 else{
//                     resp.comments.push(comment)
//                     resp.save()
//                     console.log("created new comment")
//                 }
//             })
//         }
//     })
// })    
}

module.exports = seedDB