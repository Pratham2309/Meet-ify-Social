const nodemailer = require('nodemailer');
const path = require('path');
const ejs = require('ejs');
const { relative } = require('path');


let transporter = nodemailer.createTransport({
    service  : 'google',
    host : 'smtp.gmail.com',
    port : 587,
    secure : false,
    auth : {
        user : 'hrmaildevelopment@gmail.com',
        pass : 'Pratham@123'
    }
});

let renderTemplate = (data, relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname, '../views/mailers' , relativePath),
        data,
        function(err , template){
            if(err){
                console.log('Error in rendering template' , err);
                return;
            }

            mailHTML = template;
        }
    )

    return mailHTML;
}

module.exports = {
    transporter : transporter,
    renderTemplate : renderTemplate
}