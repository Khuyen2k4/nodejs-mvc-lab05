const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/', productController.index);
router.get('/new', productController.newForm);
router.post('/', productController.create);
router.get('/:id', productController.show);
router.get('/:id/edit', productController.editForm);
router.put('/:id', productController.update);
router.delete('/:id', productController.remove);

module.exports = router;
