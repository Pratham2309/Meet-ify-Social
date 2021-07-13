const dotenv = require('dotenv').config();
const fs = require('fs');
const rfs = require('rotating-file-stream');
const path = require('path');

const logDirectory = path.join(__dirname , '../production_logs');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);

const accessLogStream = rfs.createStream('access.log' , {
    interval : '1d',
    path : logDirectory
});


if (dotenv.error) {
    throw result.error
  }
const development = {
    name : 'development',
    asset_path : '/assets',
    session_cookie_key : 'blahsomething',
    db : 'mongodb://localhost/codeial_development',
    smtp :  {
        service  : 'google',
        host : 'smtp.gmail.com',
        port : 587,
        secure : false,
        auth : {
            user : 'hrmaildevelopment@gmail.com',
            pass : 'Pratham@123'
        }
    },
    google_client_id : "878697946388-kr91bd0okjoaaubg0gm15v2v8m3h9crl.apps.googleusercontent.com",
    google_client_secret : "EHaxqVoW32TCzRWaDjxj0ooS",
    google_callback_url : "http://localhost:8000/users/auth/google/callback",
    jwt_secret : 'codeial',
    morgan : {
        mode : 'dev',
        options : {stream : accessLogStream}
    }
}
// console.log(process.env);
// console.log(process.env.CODEIAL_JWT_SECRET);

const production = {
    name : 'production',
    asset_path : process.env.CODEIAL_ASSET_PATH,
    session_cookie_key : process.env.CODEIAL_SESSION_COOKIE_KEY,
    db : process.env.CODEIAL_DB,
    smtp :  {
        service  : 'google',
        host : 'smtp.gmail.com',
        port : 587,
        secure : false,
        auth : {
            user : process.env.CODEIAL_GMAIL_USERNAME,
            pass : process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_id : process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret : process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_callback_url : process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret : process.env.CODEIAL_JWT_SECRET,
    morgan : {
        mode : 'combined',
        options : {stream : accessLogStream}
    }
}


module.exports = eval(process.env.CODEIAL_ENVIRONMENT) == undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT);