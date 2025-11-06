const express=require("express");
const admincontoller= require("../controllers/AdminController");

const router=express.Router();

router.post("/login",admincontoller.loginUser);
router.post("/createemployee",admincontoller.newEmplyee);
router.post("/assigntask",admincontoller.assignTask);

module.exports=router;