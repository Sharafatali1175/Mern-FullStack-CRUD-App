
require('dotenv').config()


let express = require('express');
let mongoose = require('mongoose');
const enquiryRouter = require('./App/routes/web/enquiryRoutes');
let path = require("path");
const _dirname = path.resolve()

let cors =require('cors')
// require('dotenv').config()
let app = express();
app.use(cors())
app.use(express.json())

//Routes
app.use('/api/website/enquiry',enquiryRouter)
app.use(express.static(path.join(_dirname, "crud-mern-stack-app/dist")));
app.get("*" , (req,res)=>{
    res.sendFile(path.resolve(_dirname, "crud-mern-stack-app", "dist", "index.html"))
})

mongoose.connect(process.env.DBURL)
.then(()=>{
    console.log("Connected to MongoDB") 
app.listen(process.env.PORT || 3000, ()=>{
    console.log('Server is running')
})
}).catch((err)=>{
    console.log(err)
})