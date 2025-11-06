const Employee=require("../models/EmployeeModel");

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
module.exports={fetchAllEmployee};