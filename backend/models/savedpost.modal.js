const mongoose= require('mongoose')

const savedpostSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'post'
    }
},{
    timestamps:true
})

const Savedpost = mongoose.model('saved',savedpostSchema);

module.exports = Savedpost