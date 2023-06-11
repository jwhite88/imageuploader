const {Schema, model} = require("mongoose");


const imageSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: true 
    },
    originalname: {
        type: String,
        required: true
    },
    signature: {
        type: String,
        required: false
    }
})

const Image = model("Image", imageSchema)

module.exports = Image;