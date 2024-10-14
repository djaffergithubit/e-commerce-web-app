const express = require('express')
const registerController = require('../Controllers/registerController')
const authController = require('../Controllers/authController')
const router = express.Router()

router.post('/register', registerController)
router.post('/login', authController)

router.get('/logout', async(req, res)=>{
    res.clearCookie('token')
    res.status(200).json({ 'message': 'logout successfully' })
})

module.exports = router