const mongoose = require('mongoose')

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    company: {
        type: String
    },
    website: {
        type: String
    },
    pocs: {
        type: [String],
        required: true
    },
    locations: {
        type: [String],
        required: true
    },
    status: {
        type: String,
        required: true
    },
    target_demo: {
        type: String,
        required: true
    },
    notes: [
        {
        subject: {
            type: String,
            required: true
            },
        from: {
            type: String,
            required: true
        },
        due: {
            type: Date,
            required: true
        },
        body: {
            type: String,
            required: true
        },
        done: {
            type: Boolean,
            default: false
        },
        created: {
            type: Date,
            default: Date.now
        }
        }
    ],
    social: {
        youtube: {
            type: String
        },
        twitter: {
            type: String
        },
        facebook: {
            type: String
        },
        linkedin: {
            type: String
        },
        instagram: {
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now
    }
})




module.exports = Profile = mongoose.model('profile', ProfileSchema)