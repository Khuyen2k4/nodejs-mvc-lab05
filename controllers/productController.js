const Product = require('../models/product');
const Supplier = require('../models/supplier');

// tất cả sản phẩm
exports.index = async (req, res) => {
  const products = await Product.find().populate('supplier');
  const suppliers = await Supplier.find();
  res.render('products/index', { products, suppliers });
};

// form thêm sản phẩm
exports.newForm = async (req, res) => {
  const suppliers = await Supplier.find();
  res.render('products/new', { suppliers });
};

// thêm sản phẩm
exports.create = async (req, res) => {
  const { name, price, quantity, supplier } = req.body;
  await Product.create({ name, price, quantity, supplier });
  res.redirect('/products');
};

// xem chi tiết
exports.show = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('supplier');
    if (!product) {
      return res.status(404).send('Không tìm thấy sản phẩm!');
    }
    res.render('products/show', { product });
  } catch (err) {
    console.error(err);
    res.status(500).send('Lỗi khi tải sản phẩm');
  }
};


// form sửa
exports.editForm = async (req, res) => {
  const product = await Product.findById(req.params.id);
  const suppliers = await Supplier.find();
  res.render('products/edit', { product, suppliers });
};

// cập nhật
exports.update = async (req, res) => {
  const { name, price, quantity, supplier } = req.body;
  await Product.findByIdAndUpdate(req.params.id, { name, price, quantity, supplier });
  res.redirect('/products');
};

// xóa
exports.delete = async (req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect('/products');
};

// tìm kiếm theo tên
exports.search = async (req, res) => {
  const q = req.query.q;
  const products = await Product.find({ name: new RegExp(q, 'i') }).populate('supplier');
  const suppliers = await Supplier.find();
  res.render('products/index', { products, suppliers });
};

// lọc theo nhà cung cấp
exports.bySupplier = async (req, res) => {
  const products = await Product.find({ supplier: req.params.id }).populate('supplier');
  const suppliers = await Supplier.find();
  res.render('products/index', { products, suppliers });
};
