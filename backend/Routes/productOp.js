const express = require('express')
const createProductController = require('../Controllers/Admin/createProductController')
const getProductsController = require('../Controllers/getProductsController')
const removeProductController = require('../Controllers/Admin/removeProductController')
const getProductByIdController = require('../Controllers/getProductByIdController')
const isAdmin = require('../middleware/isAdmin')
const router = express.Router()

router.get('', getProductsController)
router.get('/product-details/:id', getProductByIdController)
router.post('/create', isAdmin, createProductController)
router.delete('/product-delete/:id', isAdmin, removeProductController)

module.exports = router