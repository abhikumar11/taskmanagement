const express=require("express");

const app=express();
require("dotenv").config();
const cors=require("cors");
const bodyparser = require("body-parser");
const mongoose=require("mongoose");
const adminRoute=require("./routes/adminRoute");
mongoose.connect(process.env.DBCONN).then(()=>console.log("Db connected successfully"))
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());

app.use("/admin",adminRoute);
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})