const Employee=require("../models/EmployeeModel");
const Task=require("../models/TaskModel");

const fetchAllEmployee=async(req,res)=>{
        try {
            const temp=await Employee.find();
            if(temp){
                    res.status(200).send(temp);
            }
            else{
                res.status(200).send({msg:"no record found"});
            }
        } catch (err) {
            res.status(501).send({res:"Something went wrong"});
        }
}
const empLogin=async(req,res)=>{
     const { email, password } = req.body;
         console.log(req.body);
         const temp = await Employee.findOne({ email });
         if (temp) {
              if (temp.password === password) {
                   const user={userid:temp._id,name:temp.name,email:temp.email};
                   res.status(200).send({msg:"login success",user});
              } else {
                   res.status(401).send("invalid password");
              }
         } else {
              res.status(401).send("user not found");
         }
}
const fetchTasks=async(req,res)=>{
     try{
          const empid=req.params.id;
          const temp=await Task.find({empid});
          if(temp){
               res.status(200).send({tasks:temp});
          }
          
     }catch(err){
          res.status(501).send({res:"Something went wrong"});
     }
}
module.exports={fetchAllEmployee,empLogin,fetchTasks};