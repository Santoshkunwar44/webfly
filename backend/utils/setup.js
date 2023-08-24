require('dotenv').config();
const cloudinary = require('cloudinary').v2;
cloudinary.config({
    cloud_name: "onlinecoder",
    api_key: "798386685195788",
    api_secret: "QMSjxlsLG1vFC6jCtctCc9Zh3jU",
});

module.exports = { cloudinary };