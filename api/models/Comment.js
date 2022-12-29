const mongoose = require("mongoose")

const CommentSchema = new mongoose.Schema({
    desc: {
        type: String,
        max: 100
    },
    userId: {
        type: Number
    },
    postId: {
        type: Number
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Comment", CommentSchema)