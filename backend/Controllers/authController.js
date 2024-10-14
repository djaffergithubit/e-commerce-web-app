const bcrypt = require('bcryptjs')
const { User } = require('../Models/users')
const jwt = require('jsonwebtoken')

const authController = async (req, res) => {
    try {
        const { email, password } = req.body
        const userFind = await User.findOne({email})

        if (!userFind) {
            return res.status(400).json({ 'message': 'email or password incorrect' })
        }

        const verifyMatch = await bcrypt.compare(password, userFind.password)

        if (!verifyMatch) {
            return res.status(401).json({ 'message': 'email or password incorrect' })
        }

        const token = await jwt.sign({id: userFind._id, email: email, role: userFind.role}, process.env.SECRET_TOKEN,
            {expiresIn: '1h'}
            )
        res.cookie('token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'strict'
        })

        return res.status(201).json({ user: userFind, access_token: token, message:'login successful'})

    } catch (error) {
        return res.status(500).json({ 'message': 'Internal server Error' })
    }
}

module.exports = authController