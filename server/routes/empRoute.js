const express=require("express");
const EmpController = require("../controllers/EmpController");
const router=express.Router();

router.get("/allemployees",EmpController.fetchAllEmployee);

module.exports=router;