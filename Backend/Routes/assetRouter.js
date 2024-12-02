const express = require('express');
const router = express.Router();
const assetController = require('../Controllers/assetController');
const { verifyToken } = require('../Middleware/isLoggedin');

// Route to add a new asset
router.post('/add', verifyToken, assetController.addAsset);

router.get('/category/:category', assetController.getAssetByCategory)
router.get('/find/:assetId', assetController.getAssetById)


// Route to get all assets
router.get('/', assetController.getAllAsset);  // Changed to GET

module.exports = router;
