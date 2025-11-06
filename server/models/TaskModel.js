const mongoose=require("mongoose");

const taskSchema=new mongoose.Schema({
    title:"String",
    description:"String",
    duration:"Number",
    empid:"String"
})
module.exports=mongoose.model("EmpTask",taskSchema); 