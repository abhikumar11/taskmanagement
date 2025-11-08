const mongoose=require("mongoose");

const taskSchema=new mongoose.Schema({
    title:"String",
    description:"String",
    duration:"Number",
    empid:"String",
    assigndate:{
        type:"Date",
        default:Date.now()
    },
    status:{
        type:"String",
        default:"Not Completed"
    },
    completeddate:"date"
})
module.exports=mongoose.model("EmpTask",taskSchema); 