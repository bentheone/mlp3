const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware')
const {getAllCategories, storeCategory, updateCategory, deleteCategory, getCategory} = require('../controllers/categoryController');

router.route('/').get(protect, getAllCategories).post(protect, storeCategory);
router.route('/:id').get(protect, getCategory).put(protect, updateCategory).delete(protect, deleteCategory);

module.exports = router;