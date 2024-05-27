const postService = require('../services/post.service')

const createPost = async (req,res) =>{
try {
  const reqData = req.body;
  const imagedata  = req.file.filename;
  const user = req.user
  post = await postService.createPost(user,reqData,imagedata);
  res.status(200).send(post);
} catch (error) {
  res.status(404).send(error)
}
}

const getPosts = async(req,res)=>{
  try {
    const posts = await postService.getPost();
    res.status(200).send(posts)
  } catch (error) {
    res.status(404).send(error)
  }
}

const getPostidController = async (req , res) =>{
  try {
     const postId = req.params.id;
     const postData = await postService.getPostfromId(postId);
     res.status(200).send(postData)
  } catch (error) {
    res.status(404).send(error);  
  }
}

module.exports = {createPost , getPosts, getPostidController}