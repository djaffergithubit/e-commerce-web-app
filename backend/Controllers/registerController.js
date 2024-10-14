const { User } = require("../Models/users")
const bcrypt = require('bcryptjs')

const registerController = async(req, res) => {
    try {
        const { Name, email, password, confirmPassword, role } = req.body
        const userExist = await User.findOne({email})

        if (userExist) {
            return res.status(400).json({ 'message': 'user already exist' })
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ 'message': 'password doesn\'t match' })
        }

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            Name,
            email,
            password: hashedPassword,
            confirmPassword: hashedPassword,
            profileImage: req.file ? req.file.filename : '',
            role: role
        })

        await newUser.save()
        return res.status(200).json({ 'message': 'user registered successfully' })

    } catch (error) {
        return res.status(500).json({ 'message': 'Internal server Error' })
    }
}

module.exports = registerController