const Admin=require("../models/AdminModel");

const loginUser=async(req,res)=>{
    const {email,password}=req.body;
    console.log(req.body);
    const temp=await Admin.findOne({email});
    if(temp){
        if(temp.password===password){
            res.status(200).send("login success");
        }
        else{
            res.status(401).send("invalid password");
        }
    }
    else{
        res.status(401).send("user not found");
    }
}

module.exports={loginUser};