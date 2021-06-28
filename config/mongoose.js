const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/codeial_development');

const db = mongoose.connection;

db.on('error',console.error.bind(console,"Error connection to MonogDB"));

db.once('open' , function(){
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;