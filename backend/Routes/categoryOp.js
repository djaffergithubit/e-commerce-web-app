const express = require('express')
const createCategoryController = require('../Controllers/Admin/createCategoryController')
const getCategoriesController = require('../Controllers/getCategoriesController')
const getCategoryByIdController = require('../Controllers/getCategoryByIdController')
const removeCategoryController = require('../Controllers/Admin/removeCategory')
const isAdmin = require('../middleware/isAdmin')
const router = express.Router()

router.post('/create', isAdmin, createCategoryController)
router.get('', getCategoriesController)
router.get('/:id', getCategoryByIdController)
router.delete('/category-delete/:id', isAdmin, removeCategoryController)

module.exports = router