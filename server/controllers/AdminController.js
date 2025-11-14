const Admin = require("../models/AdminModel");
const Employee = require("../models/EmployeeModel");
const Task = require("../models/TaskModel");
const nodemailer = require("nodemailer");
require("dotenv").config();
const { generatePassword } = require("../middleware/RandomPassword");

const loginUser = async (req, res) => {
     const { email, password } = req.body;
     console.log(req.body);
     const temp = await Admin.findOne({ email });
     if (temp) {
          if (temp.password === password) {
               const user={userid:temp._id,name:temp.name,email:temp.email};
               res.status(200).send({ msg: "login success", user });
          } else {
               res.status(401).send("invalid password");
          }
     } else {
          res.status(401).send("user not found");
     }
};

const newEmplyee = async (req, res) => {
     try {
          const { username, useremail, userdes } = req.body;
          const password = generatePassword();

          const transporter = nodemailer.createTransport({
               service: "gmail",
               auth: {
                    user: process.env.MAILEREMAIL,
                    pass: process.env.NODEMAILERPASS,
               },
          });

          const mailOptions = {
               from: `"Admin" <${process.env.MAILEREMAIL}>`,
               to: useremail,
               subject: "User Credentials for Task Manager",
               text: `Hello ${username},
Your account has been successfully created.

Here are your login details:
Email: ${useremail}
Password: ${password}

Please keep this information safe and do not share it with anyone.

Best regards,
The Admin Team
      `,
               html: `
      <div style="font-family: Arial, sans-serif; line-height: 1.6;">
        <h2>Welcome to Our Platform</h2>
        <p>Hi <b>${username}</b>,</p>
        <p>Your account has been successfully created.</p>
        <h3>Login Details:</h3>
        <p><b>Email:</b> ${useremail}</p>
        <p><b>Password:</b> ${password}</p>
        <p style="color: red; font-size: 0.9rem;">
        Please keep this information safe and do not share it with anyone.
        </p>
        <br/>
        <p>Best regards,<br><b>The Admin Team</b></p>
      </div>
      `,
          };
          const newEmployee = await Employee.create({
               name: username,
               email: useremail,
               designation: userdes,
               password,
          });

          const info = await transporter.sendMail(mailOptions);
          console.log("Email sent successfully:");

          res.status(201).json({
               success: true,
               message: "User created and email sent successfully",
               employee: newEmployee,
          });
     } catch (error) {
          console.error("Error:", error);
          res.status(500).json({
               success: false,
               error: error.message,
          });
     }
};
const assignTask=async(req,res)=>{

          try {
               console.log(req.body);
               const temp=await Task.create(req.body);
               if(temp){
                    res.status(200).send("Task assigned");
               }
               else{
                    res.status(400).send("Unable to assign task");
               }
          } catch (err) {
               res.status(500).send("Something went wrong");
          }
}

  const getDashboardData = async (req, res) => {
  try {

    const users = await Employee.find();
    const tasks = await Task.find();

    const activeTasks = tasks.filter(task => task.status === "In Progress").length;
    const pendingTasks = tasks.filter(task => task.status === "Not Completed").length;

    const recentActivity = tasks
      .slice(-5)
      .reverse()
      .map(task => ({
        title: task.title,
        empid: task.empid,
        status: task.status,
        assigndate: task.assigndate,
      }));

    res.status(200).json({
      stats: {
        totalUsers: users.length,
        activeTasks,
        pendingTasks,
      },
      recentActivity,
    });
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
    res.status(500).json({ message: "Error fetching dashboard data" });
  }
};
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("employeeId", "name email");
    res.json({ tasks });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error fetching all tasks" });
  }
};
const updateProfile=async(req,res)=>{
     const {userid,password}=req.body;
     console.log(req.body);
          try {
               const temp=await Admin.findByIdAndUpdate(userid,{password:password});
               if(temp){
                    res.status(200).send("Password updated");
               }
               else{
                    res.status(401).send("Unable to change the password");
               }
          } catch (err) {
               res.status(500).send("Something went wrong");
          }         
}

module.exports = { loginUser, newEmplyee,assignTask,getDashboardData,getAllTasks,updateProfile};
