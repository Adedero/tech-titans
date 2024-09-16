const express = require('express')
const router = express.Router()
const Auth = require('../models/auth.model')

router.get('/', async (req, res) => {
    try {
        const formState = await Auth.find()
        return res.status(200).json(formState)
    } catch (error) {
        return res.status(500).json(error)
    }
})

module.exports = router