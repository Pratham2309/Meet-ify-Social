const express = require('express');

const router = express.Router();
const homeController =   require('../controllers/home_controllers');

console.log("router loaded");


router.get('/',homeController.home);
router.use('/users',require('./users'));
router.use('/posts',require('./posts'));
router.use('/comments',require('./comments'));

router.use('/api' , require('./api'));

//for any further router, access from here
//router.use('/routerName' , require('./routerFile'));

module.exports = router;