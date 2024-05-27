const express = require('express');
const router = express.Router();
const postcontroller = require('../controller/post.controller');
const storage = require('../middlewear/storage');
const authentication = require('../middlewear/authentication');

router.post('/create',authentication,storage, postcontroller.createPost);

router.get('/',authentication ,postcontroller.getPosts);

router.get('/postdata/:id',authentication,postcontroller.getPostidController)

module.exports = router;
