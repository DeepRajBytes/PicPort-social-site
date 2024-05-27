const reactionService = require('../services/reaction.service');

const likePostcontroller = async (req, res) =>{
    try {
        const user = req.user
        const userId = user._id
        const { postId } = req.body;
        const likedPost = await reactionService.likePost(postId,userId);
        res.status(200).send(likedPost)
    } catch (error) {
        res.status(404).send(error)
    }
}

const unlikePostController = async (req, res) => {
    try {
        const user = req.user;
        const userId = user._id;
        const { postId } = req.body;
        // console.log("User ID:", userId);
        // console.log("Post ID:", postId);
        const unlikedPost = await reactionService.unlikePost(postId, userId);
        res.status(200).send(unlikedPost);
    } catch (error) {
        res.status(404).send(error);
    }
};

const commentController = async (req,res) =>{
    try {
        const user = req.user;
        const userId = user._id
        const reqData = req.body
        const postId = req.params.id;
        // console.log("userid",userId);
        // console.log("userid",reqData);
        // console.log("userid",postId);
        const newComment = await reactionService.commentService(reqData, postId, userId);
        res.status(200).send(newComment);
    } catch (error) {
        res.status(404).send(error);
    }
}

module.exports = {likePostcontroller , unlikePostController , commentController}