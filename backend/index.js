const express= require('express');
const morgan  = require('morgan');
const cors= require('cors');
const app = express();
require('dontenv').config();
 
app.use(cors({
origin:['http://localhost:3000',process.env.FRONTEND_URL],
methods:['GET','POST','DELETE','PUT'],
credentials:true
}));
 
app.use(express.json());
app.use(morgan('common'))
 

 
const PORT = process.env.PORT || 8000;
app.listen(8000,()=>console.log(`server started at 8000`))