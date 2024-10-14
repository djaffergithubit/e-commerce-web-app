const express = require('express')
const createBrandController = require('../Controllers/Admin/createBrandController')
const getCategoryBrandsController = require('../Controllers/getCategoryBrandsController')
const getBrandsController = require('../Controllers/getBrandsController')
const removeBrandController = require('../Controllers/Admin/removeBrandController')
const getBrandByIdController = require('../Controllers/getBrandByIdController')
const isAdmin = require('../middleware/isAdmin')
const router = express.Router()

router.get('', getBrandsController)
router.get('/:categoryName', getCategoryBrandsController)
router.get('/brand-name/:brandId', getBrandByIdController)
router.post('/create', isAdmin, createBrandController)
router.delete('/brand-delete/:id', isAdmin, removeBrandController)

module.exports = router