const Post = require('../models/post');

module.exports.home = function(req,res){
    // console.log(req.cookies);
    // res.cookie('user_id',25);
    // return res.end("<h1>Express is up for Codeial</h1>");

    // Post.find({},function(err,posts){
    //     return res.render('home',{
    //         title : "Home Page",
    //         posts : posts
    //     }); 
    // });

    //populate the user of each post
    Post.find({})
    .populate('user')
    .populate({
        path : 'comments',
        populate : {
            path : 'user'
        }
    })
    .exec(function(err,posts){
        return res.render('home',{
            title : "Home Page",
            posts : posts
        }); 
    });
    
}
 