const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  address: { type: String, default: '' }, // giữ đúng theo đề bài phần 1
  phone: { type: String, default: '' },
  supplierId: { type: mongoose.Schema.Types.ObjectId, ref: 'Supplier', required: true }
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
 
