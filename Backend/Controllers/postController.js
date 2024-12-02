const CommunityPost = require('../Models/community_model');
const userModel = require('../Models/user_model'); // Assuming this is where you have your user model
const multer = require('multer');
const path = require('path');

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("Setting upload destination for images...");
    cb(null, 'Upload/community_post'); // Specify the uploads folder
  },
  filename: (req, file, cb) => {
    console.log("Setting filename for uploaded image...");
    cb(null, Date.now() + path.extname(file.originalname)); // Rename file with timestamp
  }
});

// Multer middleware to handle file uploads
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 } // Limit file size to 10MB
}).fields([{ name: 'images', maxCount: 5 }]); // Allow up to 5 image uploads

// Add a new post
exports.addPost = [
  upload,
  async (req, res) => {
    try {
      // Ensure the user is authenticated
      if (!req.user) {
        console.log("User not authenticated");
        return res.status(400).json({ message: 'User not authenticated' });
      }

      // Check if the user exists in the database
      let user = await userModel.findOne({ username: req.user.username });
      if (!user) {
        console.log("User not found");
        return res.status(400).json({ message: 'User not found' });
      }

      const { description } = req.body;

      // Validate description
      if (!description) {
        console.log("Description is required");
        return res.status(400).json({ message: 'Description is required.' });
      }

      // Ensure files are uploaded correctly
      if (!req.files?.images) {
        console.log("No images uploaded");
      }

      const mediaPaths = req.files?.images ? req.files.images.map(file => file.path) : [];

      // Log the media paths to verify they're correct
      console.log("Media paths:", mediaPaths);

      // Create a new post
      const newPost = new CommunityPost({
        description,
        mediaURL: mediaPaths,
        authorId: user._id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      // Save the post
      const savedPost = await newPost.save();
      console.log("Post saved:", savedPost);

      // Send the success response
      res.status(201).json({
        message: 'Post created successfully!',
        post: savedPost,
      });
    } catch (err) {
      console.error("Error creating post:", err);
      res.status(500).json({ message: 'Error creating post', error: err.message });
    }
  }
];



// Fetch all posts
exports.getAllPosts = async (req, res) => {
  try {
    // Pagination logic (optional)
    const page = parseInt(req.query.page) || 1;  // Default to page 1 if not provided
    const limit = parseInt(req.query.limit) || 10; // Default to 10 posts per page

    const posts = await CommunityPost.find()
      .populate('authorId', 'name email') // Fetch posts with author details
      .sort({ createdAt: -1 }) // Sort posts by creation date (newest first)
      .skip((page - 1) * limit) // Skip posts based on the current page
      .limit(limit); // Limit the number of posts per page

    res.status(200).json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching posts', error: err.message });
  }
};

// Fetch a specific post by ID
exports.getPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await CommunityPost.findById(id)
      .populate('authorId', 'name email'); // Fetch post with author details

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching post', error: err.message });
  }
};

// Like a post
exports.likePost = async (req, res) => {
  try {
    const { postId, userId } = req.body;

    const post = await CommunityPost.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if the user has already liked the post
    const alreadyLiked = post.likes.some(like => like.userId.toString() === userId);
    if (alreadyLiked) {
      return res.status(400).json({ message: 'You have already liked this post.' });
    }

    // Add the like to the post
    post.likes.push({ userId, likedAt: new Date() });
    await post.save();

    res.status(200).json({ message: 'Post liked successfully!', post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error liking post', error: err.message });
  }
};
