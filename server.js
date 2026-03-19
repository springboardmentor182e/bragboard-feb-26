const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

let employees = [];

app.get("/employees",(req,res)=>{
  res.json(employees);
});

app.post("/employees",(req,res)=>{
  employees.push(req.body);
  res.json({message:"Employee added"});
});

app.listen(5000,()=>{
  console.log("Server running on port 5000");
});