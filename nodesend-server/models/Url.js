const mongoose = require("mongoose")
const Schema = mongoose.Schema


const urlSchema = new Schema({
    url: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    original_name: {
        type: String,
        require: true
    },
    downloads: {
        type: Number,
        default: 1
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        default: null
    },
    created: {
        type: Date,
        default: Date.now()
    },
    password: {
        type: String,
        default: null
    }
})

module.exports = mongoose.model("Url", urlSchema)