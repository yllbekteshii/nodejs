const express = require("express");
const router = express.Router();

const EmployController = require("../controllers/EmployeeController");
const upload = require("../middleware/upload");
const authenticate = require ("../middleware/authenticate")

router.get("/", authenticate, EmployController.index);
router.post("/show", authenticate, EmployController.show);
router.post(
  "/store",
  authenticate,
  upload.array("avatar[]"),
  EmployController.store
);
router.post("/update", authenticate, EmployController.update);
router.post("/delete", authenticate, EmployController.deleteEmploye);

module.exports = router;
