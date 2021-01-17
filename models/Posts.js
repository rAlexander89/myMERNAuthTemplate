const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'user'
    },
    text: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    likes: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        }
    }],
    comments: [{
        user: {
            type: Schema.Types.ObjectId,
            ref: 'users'
        },
        text: {
            type: String,
            required: true
        },
        name: {
            type: String
        },
        date: {
            type: Date,
            defulat: Date.now
        }
    }],
    date: {
        type: Date,
        defulat: Date.now
    }
})

module.exports = Post = mongoose.model('post', PostSchema )