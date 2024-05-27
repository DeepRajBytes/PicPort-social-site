const { error } = require('console');
const Post = require('../models/post.modal');
const User = require('../models/user.modal')

const createPost = async (userdata,reqData,imagedata) =>{
    try {
        const {title , description ,topic} = reqData;
        const image = 'http://localhost:2121/images/' + imagedata ; 
        const newPost = new Post({
            title,
            description,
            topic,
            image,
            user:userdata
        })
    
        const createdPost = await newPost.save(); 

        const user = await User.findById(userdata._id);
        if (!user) {
        throw new Error("User does not exist!");
        }

        user.posts.push(createdPost._id);
        await user.save();

        return createdPost;
    } catch (error) {
        return error
    }
}

const getPost = async()=>{
    try {
        const posts = await Post.find().populate('user');
        return posts;
    } catch (error) {
        return error;
    }
}

const getPostfromId = async(postId)=>{
    try {
        const postbyId = await Post.findById(postId).populate({path: 'comments',populate: {
              path: 'user',
              model: 'user'}}).populate('user');
        if(!postbyId){
            throw new error("Post does not found")
        }
        return postbyId;
    } catch (error) {
        return error
    }
}

module.exports = {createPost , getPost , getPostfromId} ;