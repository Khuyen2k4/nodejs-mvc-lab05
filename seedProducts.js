require('dotenv').config();
const mongoose = require('mongoose');
const Supplier = require('./models/supplier');
const Product = require('./models/product');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/supplier_product_db';

async function seedProducts() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected, seeding products...');

    // lấy danh sách suppliers
    const suppliers = await Supplier.find();
    if (suppliers.length === 0) {
      console.log("⚠️ Không có supplier nào trong DB. Hãy chạy seed.js trước.");
      return;
    }

    // xoá sản phẩm cũ
    await Product.deleteMany({});

    // tạo danh sách sản phẩm mẫu
    const products = [
      { name: "Laptop Dell XPS 13", address: "Hà Nội", phone: "0909000001", supplierId: suppliers[0]._id },
      { name: "iPhone 15 Pro", address: "TP HCM", phone: "0909000002", supplierId: suppliers[1]._id },
      { name: "Samsung Galaxy S24", address: "Đà Nẵng", phone: "0909000003", supplierId: suppliers[2]._id }
    ];

    await Product.insertMany(products);

    console.log("✅ Seed products inserted!");
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
  }
}

seedProducts();
