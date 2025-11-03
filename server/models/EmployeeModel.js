const mongoose=require("mongoose");

const employeeSchema=new mongoose.Schema({
    name:String,
    email:String,
    designation:String,
    password:String
})
module.exports=mongoose.model("Employee",employeeSchema);