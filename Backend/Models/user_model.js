// User.js
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true, trim: true, minLength: 3 },
    name: String,
    email: { type: String, unique: true, required: true },
    password: String,
    profilePicture: String,
    bio: String,
    role: { type: String, default: 'buyer' },
    assetsPurchased: [mongoose.Schema.Types.ObjectId],
    assetsUploaded: [mongoose.Schema.Types.ObjectId],
    likedPosts: [mongoose.Schema.Types.ObjectId],
});
module.exports = mongoose.model('User', userSchema);
