const express = require('express');
const router = express.Router();
const protect = require('../middleware/authMiddleware')
const {getAllCategories, storeCategory, updateCategory, deleteCategory} = require('../controllers/categoryController');

router.route('/').get(protect, getAllCategories).post(protect, storeCategory);
router.route('/:id').put(protect, updateCategory).delete(protect, deleteCategory);

module.exports = router;