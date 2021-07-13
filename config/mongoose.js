const mongoose = require('mongoose');
const env = require('./environment');

// mongoose.connect(`mongodb://localhost/${env.db}`);
mongoose.connect(env.db, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true
});


const db = mongoose.connection;

db.on('error', console.error.bind(console, "Error connection to MonogDB"));

db.once('open', function () {
    console.log('Connected to Database :: MongoDB');
});

module.exports = db;