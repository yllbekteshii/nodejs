const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const  mongoosePagination = require('mongoose-paginate-v2');

const employeSchema = new Schema(
  {
    name: {
      type: String,
    },
    designation: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    age: {
      type: Number,
    },
    avatar:{
      type:String
    },
    nicknames:{
      type:Object
    }
  },
  { timestamps: true }
);
employeSchema.plugin(mongoosePagination)
const Employee = mongoose.model("Employee", employeSchema);
module.exports = Employee;
