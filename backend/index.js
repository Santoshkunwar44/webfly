const express= require('express');
const morgan  = require('morgan');
const cors= require('cors');
const app = express();
require('dotenv').config();
 
app.use(cors({
origin:['http://localhost:3000',process.env.FRONTEND_URL],
methods:['GET','POST','DELETE','PUT'],
credentials:true
}));
 
app.use(express.json({limit:"50mb"}));
app.use(express.urlencoded({ limit:'50mb', extended:true}))



app.use(morgan('common'))
 
app.post('/api/upload', async (req, res) => {
    try {
        const fileStr = req.body.data;
        const uploadResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: 'sharefile',
        });
        console.log(uploadResponse);
        res.json({ msg: uploadResponse });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Something went wrong' });
    }
});

 
const PORT = process.env.PORT || 8000;
app.listen(8000,()=>console.log(`server started at 8000`))