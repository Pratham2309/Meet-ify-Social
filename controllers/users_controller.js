const User = require('../models/user')
const fs = require('fs');
const path = require('path');

//lets keep it same as before(Async)
module.exports.profile = function (req, res) {
    // res.end("<h1>User Profile</h1>");
    User.findById(req.params.id, function (err, user) {
        if (user) {
            return res.render('user_profile', {
                title: "User Profile",
                profile_user: user
            });
        }
        else {
            return res.render('user_profile', {
                title: "User Profile",
                profile_user: req.user
            });
        }
    });
}

module.exports.update = async function (req, res) {
    // if(req.user.id == req.params.id){
    //     User.findByIdAndUpdate(req.params.id, req.body, function(err,user){
    //         req.flash('success', 'Updated!');
    //         return res.redirect('back');
    //     });
    // }
    // else{
    //     req.flash('error', 'Unauthorized!');
    //     return res.status(401).send('Unauthorized');
    // }
    if (req.user.id == req.params.id) {
        try {
            let user = await User.findById(req.params.id);
            User.uploadedAvatar(req, res, function (err) {
                if (err) {
                    console.log('********Multer Error : ', err);
                    return;
                }
                user.name = req.body.name;
                user.email = req.body.email;
                if (req.file) {
                    // this is saving the path of the uploaded file into the avatar field in the user
                    if (user.avatar) {
                        // fs access is used to check whether the file exists or not

                        fs.access(user.avatar, fs.constants.F_OK, (err) => {
                            if (err) {
                                req.flash('error',err);
                                console.error('File does not exist');
                                return;
                            }
                            else {
                                fs.unlinkSync(path.join(__dirname + '..' + user.avatar));
                                console.log('File does exist');
                            }
                        });
                    }

                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }
                user.save();
                return res.redirect('back');
            });
        }
        catch (err) {
            req.flash('error', err);
            return res.redirect('back');
        }
    }
    else {
        req.flash('error', 'Unauthorized!');
        return res.redirect(401).send('Unauthorized');
    }
}

//render the sign up page
module.exports.signUp = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }

    return res.render('user_sign_up', {
        title: "Codeial | Sign Up"
    });
}

//render the sign in page
module.exports.signIn = function (req, res) {
    if (req.isAuthenticated()) {
        return res.redirect('/users/profile');
    }
    return res.render('user_sign_in', {
        title: "Codeial | Sign In"
    });
}

//get the sign up data
module.exports.create = function (req, res) {
    //TODO Later
    if (req.body.password != req.body.confirm_password) {
        req.flash('error', 'Password and Confirm Password does not match!');
        return res.redirect('back');
    }
    User.findOne({ email: req.body.email }, function (err, user) {
        if (err) {
            req.flash('error', err);
            console.log('Error in finding user in signing up', err);
            return;
        }
        if (!user) {
            User.create(req.body, function (err, user) {
                if (err) {
                    req.flash('error', err);
                    console.log('Error in creating user', err);
                    return;
                }
                return res.redirect('/users/sign-in');
            });
        }
        else {
            req.flash('error', 'Email already registered!');
            return res.redirect('back');
        }
    });
}

//get the sign in data
module.exports.createSession = function (req, res) {
    //TODO Later
    req.flash('success', 'Logged in successfully');
    return res.redirect('/');
}

module.exports.destroySession = function (req, res) {
    req.logout();
    req.flash('success', 'You have logged out!');
    return res.redirect('/');
}