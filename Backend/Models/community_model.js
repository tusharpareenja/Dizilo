const mongoose = require('mongoose');
const { Schema } = mongoose;

const communitySchema = new Schema({
  
  description: { type: String, required: true }, // Post description
  mediaURL: [String], // Array of URLs for uploaded images
  authorId: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }, // Reference to the user
  likes: [
    { userId: { type: mongoose.Types.ObjectId, ref: 'User' }, likedAt: { type: Date, default: Date.now } }
  ], // List of users who liked the post
  comments: [
    {
      userId: { type: mongoose.Types.ObjectId, ref: 'User' },
      commentText: { type: String, required: true },
      commentedAt: { type: Date, default: Date.now }
    }
  ], // List of comments
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('CommunityPost', communitySchema);
