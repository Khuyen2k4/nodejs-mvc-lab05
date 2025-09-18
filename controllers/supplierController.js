const Supplier = require('../models/supplier');

// tất cả nhà cung cấp
exports.index = async (req, res) => {
  const suppliers = await Supplier.find();
  res.render('suppliers/index', { suppliers });
};

// form thêm
exports.newForm = (req, res) => {
  res.render('suppliers/new');
};

// thêm
exports.create = async (req, res) => {
  const { name, address, phone } = req.body;
  await Supplier.create({ name, address, phone });
  res.redirect('/suppliers');
};

// chi tiết
exports.show = async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  res.render('suppliers/show', { supplier });
};

// form sửa
exports.editForm = async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);
  res.render('suppliers/edit', { supplier });
};

// cập nhật
exports.update = async (req, res) => {
  const { name, address, phone } = req.body;
  await Supplier.findByIdAndUpdate(req.params.id, { name, address, phone });
  res.redirect('/suppliers');
};

// xóa
exports.delete = async (req, res) => {
  await Supplier.findByIdAndDelete(req.params.id);
  res.redirect('/suppliers');
};
