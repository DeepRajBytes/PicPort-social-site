const usercontroller = require('../controller/user.controller');
const express = require('express');
const authenticated = require('../middlewear/authentication');
const storage = require('../middlewear/storage')
const router = express.Router();


router.post('/signup',storage,usercontroller.resgister);
router.post('/signin',usercontroller.loginuser);
router.get('/profile',authenticated , usercontroller.getProfile);
router.get('/profile/:id' , authenticated,usercontroller.userProfile)

router.post('/follow', authenticated, usercontroller.followUser);
router.post('/unfollow', authenticated, usercontroller.unfollowUser);

router.put('/profileUpdate', storage,authenticated,usercontroller.editProfile);

module.exports = router;