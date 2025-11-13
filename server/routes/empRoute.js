const express=require("express");
const EmpController = require("../controllers/EmpController");
const router=express.Router();

router.get("/allemployees",EmpController.fetchAllEmployee);
router.post("/login",EmpController.empLogin);
router.get("/tasklist/:id",EmpController.fetchTasks);
router.put("/taskreport",EmpController.updateReport);
router.put("/updateprofile",EmpController.updateProfile);
module.exports=router;