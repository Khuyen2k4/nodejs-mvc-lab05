require('dotenv').config();
const mongoose = require('mongoose');
const Supplier = require('./models/supplier');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/supplier_product_db';

mongoose.connect(MONGODB_URI)
  .then(async () => {
    console.log('MongoDB connected, seeding data...');

    await Supplier.deleteMany({}); // xóa cũ cho sạch
    await Supplier.insertMany([
      { name: "FPT", address: "Hà Nội", phone: "0123456789" },
      { name: "Viettel", address: "TP HCM", phone: "0987654321" },
      { name: "Vinaphone", address: "Đà Nẵng", phone: "0909090909" }
    ]);

    console.log('Seed data inserted!');
    mongoose.connection.close();
  })
  .catch(err => console.error(err));
