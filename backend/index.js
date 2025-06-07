const express=require("express")
const mongoose=require("mongoose")
const dotenv=require("dotenv")
const vendorRoutes=require('./routes/vendorRoutes')
const bodyParser=require('body-parser')
const firmRoutes=require("./routes/firmRoutes")
const productRoutes = require("./routes/productRoutes")
const path=require('path')

const PORT=process.env.PORT || 4002
const app=express()

dotenv.config()
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("MOngodb connected successfully")
})
.catch((error)=>{
    console.log(error)
})
app.use(express.json())
app.use('/vendor',vendorRoutes)
app.use('/firm',firmRoutes)
app.use('/product',productRoutes)
app.use('/uploads',express.static('uploads'))

app.listen(PORT,()=>{
    console.log(`server running at  ${PORT}`);
});
app.use('/home',(req,res)=>{
    res.send("<h1>WELCOME SANJAY")
})