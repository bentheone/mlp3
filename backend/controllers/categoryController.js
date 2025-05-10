const Category = require('../models/Category');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await Category.findAll({where: {userId: req.user.id}});

        return res.status(200).json(categories);

    } catch (err) {
        return res.status(500).json({message: "Failed to get All categories!"});
    }
}

exports.storeCategory = async(req, res) => {
    const {name, description} = req.body;

    try {
        const category = await Category.create({
            userId: req.user.id,
            name,
            description
        });

        res.status(201).json(category, {message: "Category created successfully!"});
    } catch (err) {
        console.error("Store category error", err);
        return res.status(500).json({message: "Failed to store the category!", error: err});
    }
};

exports.updateCategory = async (req, res) => {
    const {id} = req.params;
    const {name, description} = req.body;
    try {
        const category = await Category.findByPk(id);
        if(!category) return res.status(404).json({message: "Category not found!"});
        
        const updated = await category.update({name, description});

        return res.status(200).json({message: 'Category updated!'});
        
    } catch (err) {
        console.error('Update category error', err);
        return res.status(500).json({message: "Failed to update category!"});
    }
};

exports.deleteCategory = async (req, res) => {
    const { id } = req.params;
    try {
        const deleted = await Category.destroy({where: {id, userId: req.user.id}});
        if(!deleted) return res.status(404).json({message: "Category not found"});
        return res.status(200).json({message: "Deleted successfully!"});
    } catch (err) {
        console.error('Delete category error', err);
        return res.status(500).json({message: "Failed to delete category"});
    }
}