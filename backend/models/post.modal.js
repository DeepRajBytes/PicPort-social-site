const mongoose = require('mongoose');
const { type } = require('os');


const postSchema = new mongoose.Schema({
    image:{
        type:String,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    description:{
        type:String,
        required:true
    },
    topic:{
        type:String,
        required:true
    },
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'comment'
    }],
    like:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'like'
    }]
    
})

const Post = mongoose.model('post',postSchema)

module.exports = Post;