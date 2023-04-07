const express  = require('express')
const router  =  express.Router()

const EmployController = require('../controllers/EmployeeController')


router.get('/', EmployController.index)
router.post('/show',EmployController.show)
router.post('/store', EmployController.store)
router.post('/update', EmployController.update)
router.post('/delete', EmployController.deleteEmploye)

module.exports = router