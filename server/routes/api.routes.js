const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')

//GET ALL USERS
router.get('/', Controller.getAllUsers)

//GET SINGLE USER
router.get('/:id', Controller.getSingleUser)

//ADD NEW USER
router.post('/add-details', Controller.addDetails)

//EDIT DETAILS
router.put('/edit-details/:id', Controller.editDetails)

//DELETE USER
router.delete('/delete-user/:id', Controller.deleteUser)
module.exports = router