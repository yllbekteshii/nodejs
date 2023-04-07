const mongoose = require("mongoose");
const Schema = mongoose.Schema;

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
      type: string,
    },
    age: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Employee = mongoose.model("Employee", employeSchema);
module.exports = Employee;
