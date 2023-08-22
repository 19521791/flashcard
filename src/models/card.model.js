import mongoose from "mongoose";

mongoose.Promise = global.Promise;

const flashCard = new mongoose.Schema({
    creator: String,
    title: String,
    message: String,
    tags: [String],
    selectedFile: String,
    likes: {
        type: [String],
        default: [],
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
});

export default mongoose.model('Card', flashCard);