const jwt = require('jsonwebtoken')

const isAdmin = (req, res, next)=>{
    const token = req.header('Authorization')?.replace('Bearer ', '')
    if (!token) {
        return res.status(401).json({ 'message': 'unauthorized' })
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN)
        req.user = decoded
        
        if (req.user.role !== 'admin') {
            return res.status(401).json({ 'message': 'forbidden- unauthorized' })
        }

        next()
    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    }
}

module.exports = isAdmin