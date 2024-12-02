const express = require('express');
const router = express.Router();
const postController = require('../Controllers/postController');
const { verifyToken } = require('../Middleware/isLoggedin');


// Route to add a new asset
router.post('/post', verifyToken ,postController.addPost);

// Route to get all assets
router.get('/getpost', postController.getAllPosts);  // Changed to GET

module.exports = router;
