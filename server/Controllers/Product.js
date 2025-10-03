const Product = require('../models/Product');
const path = require('path');
const fs = require('fs');
require ('dotenv').config();

// Get all products
const fetchProduct = async (req, res) => {
    try {
        const product = await Product.find();

        const formattedProduct = product.map((el) => ({
            ...el.toObject(),
            image: el.image ? `${process.env.BASE_URL}${el.image}` : null
        }))

        res.status(200).json(formattedProduct);
    } catch (error) {
        res.status(500).json({ message: "Failed to fetch all products" })
    }
};

// Create a product
const createProduct = async (req, res) => {
    try {
        const { productName } = req.body;
        const imagePath = req.file
            ? path.join('uploads', req.file.filename).replace(/\\/g, '/')
            : null;
        const newProduct = await Product.create({
            image: imagePath,
            productName
        });

        res.status(201).json({
            ...newProduct.toObject(),
            image: newProduct.image ? `${process.env.BASE_URL}${newProduct.image}` : null
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || "create product failed" });
    }
};

// Update a product
const updateProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // If new image uploaded → delete old file
        if (req.file && product.image) {
            const oldPath = path.join(__dirname, "../", product.image);
            if (fs.existsSync(oldPath)) {
                fs.unlinkSync(oldPath);
            }
            product.image = path.join("uploads", req.file.filename).replace(/\\/g, "/");
        }

        // Update productName
        if (req.body.productName) {
            product.productName = req.body.productName;
        }

        await product.save();
        res.json({
            ...product.toObject(),
            image: product.image ? `${process.env.BASE_URL}${product.image}` : null
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || "failed to update product" });
    }
};

// Delete a product
const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Delete image file if exists
        if (product.image) {
            const imagePath = path.join(__dirname, "../", product.image);
            if (fs.existsSync(imagePath)) {
                fs.unlinkSync(imagePath);
            }
        }

        // Delete product from DB
        await Product.findByIdAndDelete(req.params.id);

        res.json({ message: "Product deleted successfully", product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Delete product failed" });
    }
};


// file upload endpoint
const uploadSingle = async (req, res) => {
    try {
        res.json({ file: req.file, body: req.body })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = { createProduct, updateProduct, deleteProduct, uploadSingle, fetchProduct };



