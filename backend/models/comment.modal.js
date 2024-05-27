const mongoose = require('mongoose')

const comentSchema =new mongoose.Schema({
    comment:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post'
    }
},{
    timeStamp:true,
})

const comment = mongoose.model('comment',comentSchema);

module.exports = comment;