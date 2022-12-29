const mongoose = require("mongoose")

const StorySchema = new mongoose.Schema({
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

module.exports = mongoose.model("Story", StorySchema)