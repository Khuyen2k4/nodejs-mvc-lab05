 
const Product = require('../models/product');
const Supplier = require('../models/supplier');

module.exports = {
  index: async (req, res) => {
    try {
      const products = await Product.find().populate('supplierId').sort({ createdAt: -1 });
      res.render('products/index', { products });
    } catch (err) {
      res.status(500).send('Error fetching products');
    }
  },

  newForm: async (req, res) => {
    try {
      const suppliers = await Supplier.find();
      res.render('products/new', { suppliers });
    } catch (err) {
      res.status(500).send('Error loading form');
    }
  },

  create: async (req, res) => {
    try {
      const { name, address, phone, supplierId } = req.body;
      const product = new Product({ name, address, phone, supplierId });
      await product.save();
      res.redirect('/products');
    } catch (err) {
      res.status(500).send('Error creating product');
    }
  },

  show: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id).populate('supplierId');
      res.render('products/show', { product });
    } catch (err) {
      res.status(500).send('Error showing product');
    }
  },

  editForm: async (req, res) => {
    try {
      const product = await Product.findById(req.params.id);
      const suppliers = await Supplier.find();
      res.render('products/edit', { product, suppliers });
    } catch (err) {
      res.status(500).send('Error loading edit form');
    }
  },

  update: async (req, res) => {
    try {
      const { name, address, phone, supplierId } = req.body;
      await Product.findByIdAndUpdate(req.params.id, { name, address, phone, supplierId });
      res.redirect('/products');
    } catch (err) {
      res.status(500).send('Error updating product');
    }
  },

  remove: async (req, res) => {
    try {
      await Product.findByIdAndDelete(req.params.id);
      res.redirect('/products');
    } catch (err) {
      res.status(500).send('Error deleting product');
    }
  }
};
