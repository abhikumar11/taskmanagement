const express=require("express");
const admincontoller= require("../controllers/AdminController");

const router=express.Router();

router.post("/login",admincontoller.loginUser);

module.exports=router;