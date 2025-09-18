const mongoose = require('mongoose');
const Supplier = require('./models/supplier');
const Product = require('./models/product');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/supplier_product_db';

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('MongoDB connected for seeding');

    // Xóa dữ liệu cũ
    await Supplier.deleteMany({});
    await Product.deleteMany({});

    // Thêm suppliers
    const apple = new Supplier({ name: 'Apple', address: 'USA', phone: '123456789' });
    const samsung = new Supplier({ name: 'Samsung', address: 'Korea', phone: '987654321' });
    const sony = new Supplier({ name: 'Sony', address: 'Japan', phone: '111222333' });

    await apple.save();
    await samsung.save();
    await sony.save();

    // Thêm products
    const products = [
      { name: 'iPhone 15 Pro', price: 30000000, quantity: 10, supplier: apple._id },
      { name: 'MacBook Air M2', price: 25000000, quantity: 5, supplier: apple._id },
      { name: 'Galaxy S24 Ultra', price: 28000000, quantity: 8, supplier: samsung._id },
      { name: 'Galaxy Z Fold 5', price: 35000000, quantity: 3, supplier: samsung._id },
      { name: 'Sony WH-1000XM5', price: 9000000, quantity: 15, supplier: sony._id }
    ];

    await Product.insertMany(products);

    console.log('✅ Seeding completed!');
    mongoose.connection.close();
  } catch (err) {
    console.error(err);
    mongoose.connection.close();
  }
}

seed();
