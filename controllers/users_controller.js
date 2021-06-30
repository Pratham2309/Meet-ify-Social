const User = require('../models/user')


module.exports.profile = function(req,res){
    // res.end("<h1>User Profile</h1>");
    return res.render('user_profile',{
        title : "Profile"
    });
}

//render the sign up page
module.exports.signUp = function(req,res){
    return res.render('user_sign_up', {
        title : "Codeial | Sign Up"
    });
}

//render the sign in page
module.exports.signIn = function(req,res){
    return res.render('user_sign_in', {
        title : "Codeial | Sign In"
    });
}

//get the sign up data
module.exports.create = function(req,res){
    //TODO Later
    if(req.body.password != req.body.confirm_password){
        return res.redirect('back');
    }
    User.findOne({email : req.body.email}, function(err,user){
        if(err){
            console.log('Error in finding user in signing up' , err);
            return;
        }
        if(!user){
            User.create(req.body, function(err,user){
                if(err){
                    console.log('Error in creating user' , err);
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else{
            return res.redirect('back');
        }
    });
}

//get the sign in data
module.exports.createSession = function(req,res){
    //TODO Later
}
