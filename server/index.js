const express=require("express");

const app=express();
require("dotenv").config();
const cors=require("cors");
const bodyparser = require("body-parser");

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cors());


app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`)
})