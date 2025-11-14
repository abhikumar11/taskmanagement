const express=require("express");
const admincontroller= require("../controllers/AdminController");

const router=express.Router();

router.post("/login",admincontroller.loginUser);
router.post("/createemployee",admincontroller.newEmplyee);
router.post("/assigntask",admincontroller.assignTask);
router.get("/dashboard", admincontroller.getDashboardData);
router.get("/alltasks", admincontroller.getAllTasks);
router.put("/updateprofile", admincontroller.updateProfile);

module.exports=router;