require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: "onlinecoder",
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET_KEY,
});

module.exports = { cloudinary };