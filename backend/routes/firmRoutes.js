
const firmController=require("../controllers/firmController")
const express=require("express")
const verifyToken = require("../middlewares/verifyToken")

const router=express.Router()

router.post('/add-Firm',verifyToken,firmController.addFirm)

router.get('/uploads/:imageName',(req,res)=>{
const imageName=req.params.imageName
res.headersSent('Content-Type','image/jpeg')
res.sendFile(Path.join(__dirname,'..','uploads',imageName))

})

router.delete('/:firmId',firmController.deleteFirmById)
module.exports=router