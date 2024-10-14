const express = require('express')
const app = express()
const cors = require('cors')
const Connect = require('./dbConfig/dbConfig')
const handleError = require('./middleware/handleError')
const port = 3500

app.use(cors(
    {
        origin: 'http://localhost:5173',
        credentials: true
    }
))

app.use((err, req, res, next) => {
    handleError(err, req, res, next);
});

require('dotenv').config()
app.use(express.json())

// multer
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, './uploads')
    },
    filename: (req, file, cb)=>{
        cb(null, file.originalname)
    }
})
const upload = multer({storage: storage}) 
app.use('/uploads', express.static('uploads'))

// routes
app.use('/users', upload.single('profileImage'), require('./Routes/authenticate'))
app.use('/categories', require('./Routes/categoryOp'))
app.use('/brands', require('./Routes/brandOp'))
app.use('/products', upload.array('productImages', 5), require('./Routes/productOp'))
app.use('/coupons', require('./Routes/couponsOp'))
app.use('/orders', require('./Routes/orderOp'))
app.use('/reviews', require('./Routes/reviewOp'))
app.use('/payment', require('./Routes/paymentRoute'))

app.listen(port, ()=>{
    console.log(`server running on port ${port}`)
    Connect()
}
)