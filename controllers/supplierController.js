 const Supplier = require('../models/supplier');
const Product = require('../models/product');

module.exports = {
  index: async (req, res) => {
    try {
      const suppliers = await Supplier.find().sort({ createdAt: -1 });
      res.render('suppliers/index', { suppliers });
    } catch (err) {
      res.status(500).send('Error fetching suppliers');
    }
  },

  newForm: (req, res) => {
    res.render('suppliers/new');
  },

  create: async (req, res) => {
    try {
      const { name, address, phone } = req.body;
      const supplier = new Supplier({ name, address, phone });
      await supplier.save();
      res.redirect('/suppliers');
    } catch (err) {
      res.status(500).send('Error creating supplier');
    }
  },

  show: async (req, res) => {
    try {
      const supplier = await Supplier.findById(req.params.id);
      const products = await Product.find({ supplierId: supplier._id });
      res.render('suppliers/show', { supplier, products });
    } catch (err) {
      res.status(500).send('Error showing supplier');
    }
  },

  editForm: async (req, res) => {
    try {
      const supplier = await Supplier.findById(req.params.id);
      res.render('suppliers/edit', { supplier });
    } catch (err) {
      res.status(500).send('Error editing supplier');
    }
  },

  update: async (req, res) => {
    try {
      const { name, address, phone } = req.body;
      await Supplier.findByIdAndUpdate(req.params.id, { name, address, phone });
      res.redirect('/suppliers');
    } catch (err) {
      res.status(500).send('Error updating supplier');
    }
  },

  remove: async (req, res) => {
    try {
      await Product.deleteMany({ supplierId: req.params.id });
      await Supplier.findByIdAndDelete(req.params.id);
      res.redirect('/suppliers');
    } catch (err) {
      res.status(500).send('Error deleting supplier');
    }
  }
};

