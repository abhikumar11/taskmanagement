const Admin=require("../models/AdminModel");
const Employee=require("../models/EmployeeModel");
const { generatePassword } = require("../middleware/RandomPassword");

const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    console.log(req.body);
    const temp=await Admin.findOne({email});
    if(temp){
        if(temp.password===password){
            
            const user={name:temp.name,email:temp.email}
            res.status(200).send({msg:"login success",user});
        }
        else{
            res.status(401).send("invalid password");
        }
    }
    else{
        res.status(401).send("user not found");
    }
}

const newEmplyee=async(req,res)=>{
    const {username,useremail,userdes}=req.body;
    console.log(req.body)
    
}

module.exports={loginUser,newEmplyee};