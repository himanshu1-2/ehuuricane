const express = require('express')
const { productsController, createProduct, productController, createProductReview, getTopProducts, updateProduct, deleteProduct } = require('../controller/product')
const router = express.Router()
const { protect, admin } = require('../middleware/auth.js')
router.route('/').get(productsController).post(protect, admin, createProduct)
router.get('/top', getTopProducts)
router.route('/:id').get(productController).delete(protect, admin, deleteProduct).put(protect, admin, updateProduct)

router.route('/:id/reviews').post(protect, createProductReview)
module.exports = router