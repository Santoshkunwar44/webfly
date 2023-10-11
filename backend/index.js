const express= require('express');
const morgan  = require('morgan');
const cors= require('cors');
const { cloudinary } = require('./utils/setup');
const app = express();
require('dotenv').config();
 
app.use(cors({
origin:['http://localhost:5173','http://localhost:5500',process.env.FRONTEND_URL],
methods:['GET','POST','DELETE','PUT'],
credentials:true
}));
 
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({ limit:'50mb', extended:true}))


const TEN_MINUTES = 600000;
app.use((req, res, next) => {
  req.setTimeout(TEN_MINUTES);
  next();
});


app.use(morgan('common'))
 
app.post('/api/upload/image', async (req, res) => {
    console.log("icoming request ",req.body.data)

    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
             upload_preset: "sharefile",
        });

        console.log(uploadResponse.secure_url);
        res.json({ message: uploadResponse.secure_url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});


app.post('/api/upload/video', async (req, res) => {
    console.log("icoming request ",req.body.data)

    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
             resource_type: "video",    
             upload_preset: "vidoes",
        });
        console.log(uploadResponse.secure_url);
        res.json({ message: uploadResponse.secure_url });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});


 
const PORT = process.env.PORT || 8000;
app.listen(8000,()=>console.log(`server started at 8000`))
