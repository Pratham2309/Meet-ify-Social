const Post = require('../models/post');
const User = require('../models/user');

module.exports.home = async function (req, res) {
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
    // Post.find({})
    //     .populate('user')
    //     .populate({
    //         path: 'comments',
    //         populate: {
    //             path: 'user'
    //         }
    //     })
    //     .exec(function (err, posts) {
    //         User.find({}, function (err, users) {
    //                 return res.render('home', {
    //                 title: "Home Page",
    //                 posts: posts,
    //                 all_users : users
    //             });
    //         });

    //     });
    
    
    // using asycn and await to find the above proces
    try{
        let posts = await Post.find({})
        .sort('-createdAt')
        .populate('user')
        .populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

 
        let users = await User.find({});
         
        return res.render('home', {
            title: "Home Page",
            posts: posts,
            all_users : users
        });

    }
    catch(err){
        console.log("Error in home controller",err);
        return;
    }
}

// module.exports.actionName = function(req, res){}


// using then
// Post.find({}).populate('comments').then(function());

// let posts = Post.find({}).populate('comments').exec();

// posts.then()

