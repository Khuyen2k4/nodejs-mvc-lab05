const express = require('express');
const router = express.Router();
const supplierController = require('../controllers/supplierController');

router.get('/', supplierController.index);
router.get('/new', supplierController.newForm);
router.post('/', supplierController.create);
router.get('/:id', supplierController.show);
router.get('/:id/edit', supplierController.editForm);
router.put('/:id', supplierController.update);
router.delete('/:id', supplierController.remove);

module.exports = router;
