const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    title: {
        type: String,
        trim: true,
        required: true
    },
    description: {
        type: String,
        trim: true
    },
    videoUrl: {
        type: String,
        trim: true,
        required: true
    },
    filename: {
        type: String,
        trim: true
    }
}, { timestamps: true });

module.exports=mongoose.model('MyVideos',videoSchema)