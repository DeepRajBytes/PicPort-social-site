const mongoose = require('mongoose');

const userSchema =new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    userProfile:{
        type:String,
    },
    posts:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'post'
    }],
    savedpost:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post'
    }],
    follower:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    following:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    }],
    
    bio:{
        type:String
    }

})

const User = mongoose.model('user',userSchema);

module.exports = User;