const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const db = require("./Config/mongoose_connection");
const usersRouter = require("./Routes/userRouter");
const assetRouter = require("./Routes/assetRouter");
const postRouter = require('./Routes/postRouter')
const expressSession = require("express-session");
const path = require('path');

const flash = require("connect-flash");
require("dotenv").config();

app.use(cors({
    origin: 'http://localhost:5173', // Frontend URL
    credentials: true,
}));
app.use('/Upload', express.static(path.join(__dirname, 'Upload')));
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.SESSION_SECRET,
        cookie: { secure: false } // Set to true if using HTTPS
    })
);

app.use('/user', usersRouter);  // User routes
app.use('/api/asset', assetRouter);  // Asset routes (Changed prefix to /api/asset)
app.use('/api/community', postRouter);
app.use('api/asset', assetRouter);
app.use('api/asset', assetRouter);
app.use('api/community', postRouter)
app.use('/api/community', postRouter)


const PORT = process.env.PORT || 3000; // Use environment variable for port
app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
