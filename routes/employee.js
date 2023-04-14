const express  = require('express')
const router  =  express.Router()

const EmployController = require('../controllers/EmployeeController')
const upload           = require('../middleware/upload')

router.get('/', EmployController.index)
router.post('/show',EmployController.show)
router.post('/store', upload.array  ('avatar[]'),EmployController.store)
router.post('/update', EmployController.update)
router.post('/delete', EmployController.deleteEmploye)

module.exports = router 