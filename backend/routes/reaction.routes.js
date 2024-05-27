const express = require('express');
const router = express.Router();
const reactionController = require('../controller/reaction.controller');
const authentication = require('../middlewear/authentication');

router.post('/like',authentication,reactionController.likePostcontroller);
router.delete('/unlike', authentication, reactionController.unlikePostController);
router.post('/comment/:id', authentication , reactionController.commentController);

module.exports = router ; 