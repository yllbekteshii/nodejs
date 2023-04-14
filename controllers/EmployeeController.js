const Employee = require('../models/Employees')

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
    phone: req.body.phone,
    age: req.body.age,
  });
 if(req.files){
  let path = ''
  req.files.forEach(function(files,index,arr){
    path = path + files.path + ','
  });
  path = path.substring(0,path.lastIndexOf(','))
  employee.avatar  = path
 }
  employee.save()
    .then(response => {
      res.json({
        message: 'Employee added successfully'
      });
    })
    .catch(error => {
      res.json({
        message: 'An error occurred'
      });
    });
};


//Update Employ

const update   =  (req,res,next) =>{
    let  employeeID = req.body.employeeID
    let updatedData =  {
        name:req.body.name,
        designation:req.body.designation,
        phone:req.body.phone,
        age:req.body.age
    }
    Employee.findByIdAndUpdate(employeeID, {$set:updatedData})
    .then(()=>{
        res.json({
            message: 'Employee Updated Succesfully'
        })
    }).catch(err=>{
      res.json({
          message:'Error Occured!'
      })
  })
}

const deleteEmploye = (req,res,next) =>{
let employeId = req.body.employeeID;
Employee.findByIdAndDelete(employeId)
.then(()=>{
  res.json({
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