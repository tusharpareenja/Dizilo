const jwt = require("jsonwebtoken");

// Function to generate a JWT token for the user
const generateToken = (user) => {
    return jwt.sign(
        {
            email: user.email,   // Include user's email
            id: user._id,        // Include user's unique ID
            username: user.username // Include user's username
        },
        process.env.JWT_KEY,   // Secret key from environment variables
           // Optional: Set token expiration (7 days here)
    );
};

module.exports = { generateToken };
