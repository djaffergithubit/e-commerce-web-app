const jwt = require('jsonwebtoken')

const verifyToken = (req, res, next)=>{
    // change this line const token = req.cookies.jwt
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) {
        return res.status(401).json({ 'message': 'unauthorized' })
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN)
        req.user = decoded
        next()
    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

module.exports = verifyToken