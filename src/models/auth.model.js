import mongoose from 'mongoose';

const authen = mongoose.Schema({
    name: { type: String, required: true},
    email: { type: String, required: true},
    password: { type: String, required: true},
    id: { type: String}
});

export default mongoose.model("user", authen);