const Vendor=require('../models/Vendor')
const bcrypt=require('bcryptjs')
const jwt=require("jsonwebtoken")
const dotenv=require("dotenv")

dotenv.config()
const secretKey=process.env.whatIsYourName

const vendorRegister= async(req,res)=>{
    const {username,email,password}=req.body
    try{
        const vendorEmail=await Vendor.findOne({email})
        if(vendorEmail){
            return res.status(400).json('Email already taken')
        }
        const hashedpassword=await bcrypt.hash(password,10) 
        const newVendor= new Vendor({
            username,
            email,
            password:hashedpassword
        })
        await newVendor.save()
        res.status(201).json({message:"vendor registered successfully"})
    }
    catch (error){
        console.log(error)
        res.status(500).json({error:"internal server error"})
    }
}

const vendorLogin=async (req,res)=>{
    const{email,password}=req.body
    try{
        const vendor=await Vendor.findOne({email})
        if(!vendor || !(await bcrypt.compare(password,vendor.password))){
            return res.status(401).json({error:"Invalid username or password"})
        }
        const token=jwt.sign({vendorId:vendor._id},secretKey,{expiresIn:"1h"})
        res.status(200).json({sucess:"Login succesful",token})
        console.log(email,token)
    }
    catch(error){
        return res.status(404).json({error:"login failed"}) 
        console.log(error)
    }

}
const getAllVendors =async(req,res)=>{
    try{
    const allVendors=await Vendor.find().populate("firm")
    res.json({allVendors})
    }catch(error){
     console.log(error)
     return res.status(500).json({error:"internal error"})
    }
}
const getVendorById=async(req,res)=>{
    const vendorId=req.params.id
    try {
        const vendor=await Vendor.findById(vendorId).populate('firm');
        if(!vendor){
            return res.status(404).json({error:"vendor not found"})
        }
        res.status(200).json({vendor})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"internal server error"})
    }
}
module.exports={vendorRegister,vendorLogin,getAllVendors,getVendorById}