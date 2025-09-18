const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');
const { ensureAuthenticated } = require('../middleware/auth');

// xem tất cả nhà cung cấp
router.get('/', supplierController.index);

// form thêm nhà cung cấp
router.get('/new', ensureAuthenticated, supplierController.newForm);

// thêm nhà cung cấp
router.post('/', ensureAuthenticated, supplierController.create);

// xem chi tiết nhà cung cấp
router.get('/:id', supplierController.show);

// form sửa nhà cung cấp
router.get('/:id/edit', ensureAuthenticated, supplierController.editForm);

// cập nhật nhà cung cấp
router.post('/:id', ensureAuthenticated, supplierController.update);

// xóa nhà cung cấp
router.post('/:id/delete', ensureAuthenticated, supplierController.delete);

module.exports = router;
