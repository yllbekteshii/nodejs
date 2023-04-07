import { response } from "express";
import { Employee } from "../models/Employees";

//show the list of employees
const index = (req, res, next) => {
  Employee.find()
    .then((response) => {
      res.json({
        response,
      });
    })
    .catch((error) => {
      res.json({
        message: "An error Occured!",
      });
    });
};

//Show singel product
const show = (req, res, next) => {
  let employeeID = req.body.employeeID;
  Employee.findById(employeeID).then((response) => {
    res
      .json({
        response,
      })
      .catch((error) => {
        res.json({
          message: "An error Occured!",
        });
      });
  });
};

//Add employee
const store = (req, res, next) => {
  let employee = new Employee({
    name: req.body.name,
    designation: req.body.designation,
    email: req.body.email,
    phone: req.body.phone,
    age: req.body.age,
  });
  employee.save().then((response) => {
    res
      .json({
        message: "Employee Added Succesfully!",
      })
      .catch((error) => {
        res.json({
          message: "An error Occured!",
        });
      });
  });
};


//Update Employ

const update   =  (req,res,next) =>{
    let  employeeID = req.body.employeeid
    let updatedData =  {
        name:req.body.name,
        designation:req.body.designation,
        email:req.body.email,
        phone:req.body.phone,
        age:req.body.age
    }
    Employee.findByIdAndUpdate(employeeID, {$set:updatedData})
    .then(()=>{
        res.json({
            message: 'Employee Updated Succesfully'
        })
        .catch(err=>{
            res.json({
                message:'Error Occured!'
            })
        })
    })    
}

const deleteEmploye = (req,res,next) =>{
let employeId = req.body.employeeid;

Employee.findByidAndRemove(employeId)
.then(()=>{
    req.json({
        message:'Employ Deleted Succsfully'
    })
})
.catch(err=>{
    res.json(
    {
        message:'An error Occured!'
    }
    )
})
}


module.exports = {
    index,show,store,update,deleteEmploye
}