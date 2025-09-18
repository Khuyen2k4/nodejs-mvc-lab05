const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const { ensureAuthenticated } = require('../middleware/auth');

// xem tất cả sản phẩm
router.get('/', productController.index);

// tìm kiếm sản phẩm theo tên
router.get('/search', productController.search);

// lọc sản phẩm theo nhà cung cấp
router.get('/by-supplier/:id', productController.bySupplier);

// form thêm sản phẩm (chỉ admin / user đăng nhập)
router.get('/new', ensureAuthenticated, productController.newForm);

// thêm sản phẩm
router.post('/', ensureAuthenticated, productController.create);

// xem chi tiết sản phẩm
router.get('/:id', productController.show);

// form sửa sản phẩm
router.get('/:id/edit', ensureAuthenticated, productController.editForm);

// cập nhật sản phẩm
router.post('/:id', ensureAuthenticated, productController.update);

// xóa sản phẩm
router.post('/:id/delete', ensureAuthenticated, productController.delete);

module.exports = router;
