const Post = require('../models/post.modal');
const Like = require('../models/like.modal');
const Comments = require('../models/comment.modal');
const User = require('../models/user.modal');

const likePost = async (postId, userId) => {
    try {
       
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User does not exist!");
        }
        const post = await Post.findById(postId);
        if (!post) {
            throw new Error("Post does not exist!");
        }
        const existingLike = await Like.findOne({ user: userId, post: postId });
        if (existingLike) {
            throw new Error("User already liked this post!");
        }
        const newLike = new Like({
            user: userId,
            post: postId
        });

        const likedPost = await newLike.save();

        post.like.push(likedPost._id);
        await post.save();

        user.savedpost.push(post);
        await user.save();

        return likedPost;
    } catch (error) {
        return { error: error.message };
    }
};

const unlikePost = async (postId, userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User does not exist!");
        }

        const post = await Post.findById(postId);
        if (!post) {
            throw new Error("Post does not exist!");
        }

        const existingLike = await Like.findOne({ user: userId, post: postId });
        if (!existingLike) {
            throw new Error("Like does not exist!");
        }

        await Like.deleteOne({ _id: existingLike._id });

        post.like = post.like.filter(likeId => !likeId.equals(existingLike._id)); 
        await post.save();

        user.savedpost = user.savedpost.filter(savedPostId => !savedPostId.equals(postId)); 
        await user.save();

        return { message: "Post unliked successfully" };
    } catch (error) {
        return { error: error.message };
    }
};

const commentService = async (reqData, postId, userId) => {
    try {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User does not exist!");
        }

        const post = await Post.findById(postId);
        if (!post) {
            throw new Error("Post does not exist!");
        }
        
        const newComment = new Comments({
            comment: reqData.comment,
            user: user, 
            post: post, 
        });

        

        const freshComment = await newComment.save();
        post.comments.push(freshComment);
        post.save();
        
        return freshComment;
    } catch (error) {
      
        return { error: error.message };
    }
};

module.exports = { likePost , unlikePost , commentService};