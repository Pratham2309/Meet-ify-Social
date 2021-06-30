const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users_controller');
const postController = require('../controllers/post_controller');

router.get('/profile', usersController.profile);
router.get('/post',postController.post);

router.get('/sign-up' , usersController.signUp);
router.get('/sign-in',usersController.signIn);

router.post('/create' , usersController.create);
module.exports = router;