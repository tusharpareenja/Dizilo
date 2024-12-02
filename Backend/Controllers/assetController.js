const Product = require('../Models/asset_model');
const multer = require('multer');
const path = require('path');
const userModel = require('../Models/user_model');
const assetModel = require('../Models/asset_model');

// Define the storage engine for Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        console.log("Setting upload destination for file");
        cb(null, 'Upload/asset'); // specify the uploads folder
    },
    filename: (req, file, cb) => {
        console.log("Setting filename for uploaded file: " + file.originalname);
        cb(null, Date.now() + path.extname(file.originalname)); // rename file with timestamp
    }
});

// Set up Multer upload middleware to handle both main asset file and images
const upload = multer({
    storage: storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
}).fields([
    { name: 'mainFile', maxCount: 1 },  // Main file upload (1 file only)
    { name: 'images', maxCount: 5 }     // Additional images (up to 5 images allowed)
]);

// Asset upload handler
exports.addAsset = [
    upload, // Middleware to handle file uploads
    async (req, res) => {
        try {
            console.log("Request body:", req.body); // Log request body
            console.log("Request files:", req.files); // Log uploaded files

            // Fetch the logged-in user using req.user (ensure verifyToken middleware works)
            let user = await userModel.findOne({ username: req.user.username });
            console.log("User found:", user); // Log user details

            if (!user) {
                return res.status(400).json({ message: 'User not found' });
            }

            // Destructure form fields from req.body (use the correct fields)
            const { title, description, price, category, supportedSoftware } = req.body;

            

            // Ensure the main asset file is uploaded
            if (!req.files.mainFile) {
                console.log("Main file missing");
                return res.status(400).json({ message: 'Main file is required' });
            }

            // Get the path for the main file and images
            const mainFilePath = req.files.mainFile[0].path;
            console.log("Main file path:", mainFilePath); // Log the main file path

            const imagePaths = req.files.images ? req.files.images.map(file => file.path) : [];
            console.log("Image paths:", imagePaths); // Log the image file paths

            // Create new product asset object
            const newAsset = new Product({
                uploadedBy: user._id, // Corrected: use _id instead of _Id
                title,
                description,
                price,
                category: Array.isArray(category) ? category : [category], // Ensure category is an array
                fileUrl: mainFilePath,  // Use 'fileUrl' instead of 'mainFile' for model consistency
                images: imagePaths,     // Array of image file paths
                supportedSoftware       // Ensure this is passed correctly (optional field)
            });

            console.log("New asset object:", newAsset); // Log new asset details

            // Save the asset to the database
            await newAsset.save();
            console.log("Asset saved to database");

            // Respond with success
            res.status(201).json({
                message: 'Asset uploaded successfully',
                asset: newAsset
            });
        } catch (err) {
            console.error("Error during asset upload:", err); // Log error during the upload
            res.status(500).json({ message: 'Error uploading asset', error: err.message });
        }
    }
];

// Fetch all assets
exports.getAllAsset = async (req, res) => {
    try {
        console.log("Fetching all assets...");
        const assets = await Product.find();
        console.log("Assets found:", assets); // Log all assets

        res.status(200).json(assets);
    } catch (error) {
        console.error("Error fetching all assets:", error); // Log error fetching assets
        res.status(500).json({ message: 'Error fetching assets', error: error.message });
    }
};

exports.getAssetByCategory = async(req, res) =>{
    try {
        const category = req.params.category;
        const asset = await assetModel.find({category});
        if (!asset || asset.length === 0) {
            return res.status(404).json({ message: `No asset found in category: ${category}` });
          }
          res.json(asset);

    }catch(error){
        console.error("Error fetching asset by category:", error); // Log error fetching asset by category
        res.status(500).json({ message: 'Error fetching asset by category', error: error})
    }
}


// Fetch a specific asset by ID
exports.getAssetById = async (req, res) => {
    try {
        const assetId = req.params.assetId;
        console.log("Fetching asset by ID:", assetId); // Log asset ID being searched

        const asset = await assetModel.findById(assetId);
        if (!asset) {
            console.log("Asset not found for ID:", assetId); // Log if asset not found
            return res.status(404).json({ message: 'Asset not found' });
        }

        console.log("Asset found:", asset); // Log the asset found
        res.status(200).json(asset);
    } catch (error) {
        console.error("Error fetching asset by ID:", error); // Log error fetching asset by ID
        res.status(500).json({ message: 'Error fetching asset', error: error.message });
    }
};
