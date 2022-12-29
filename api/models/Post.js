const mongoose = require("mongoose")

const PostSchema = new mongoose.Schema({
    desc: {
        type: String,
        max: 50
    },
    img: {
        type: String,
        default: ""
    },
    userId: {
        type: Number
    }
},
    {
        timestamps: true
    }
)

module.exports = mongoose.model("Post", PostSchema)