const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const methodOverride = require('method-override');

const authRoutes = require('./routes/authRoutes');
const supplierRoutes = require('./routes/supplierRoutes');
const productRoutes = require('./routes/productRoutes');

const Product = require('./models/product');
const Supplier = require('./models/supplier');

const app = express();

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secretkey',
  resave: false,
  saveUninitialized: false
}));

// ⚡ luôn gán user vào res.locals để view nào cũng dùng được
app.use((req, res, next) => {
  res.locals.user = req.session.user || null;
  next();
});

// ejs
app.set('view engine', 'ejs');

// routes
app.use('/auth', authRoutes);
app.use('/suppliers', supplierRoutes);
app.use('/products', productRoutes);

// home page
app.get('/', async (req, res) => {
  try {
    const products = await Product.find().populate('supplier');
    const suppliers = await Supplier.find();
    res.render('index', { products, suppliers });
  } catch (err) {
    console.error(err);
    res.send('Lỗi khi tải trang chủ');
  }
});

// connect MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/supplier_product_db')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT || 3000, () => {
      console.log('Server running at http://localhost:3000');
    });
  })
  .catch(err => console.error(err));
