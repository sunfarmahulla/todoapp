const express = require('express');
const router = express.Router();
const cors = require('cors');
router.use(cors());
process.env.SECRET_KEY = 'secret'
const todoController = require('../controller/todoController');

router.get('/', todoController.getAll);
router.post('/', todoController.create);

router.get('/:todoID', todoController.getById);
router.put('/:todoID', todoController.updateById);
router.delete('/:todoID',todoController.deleteById);


module.exports = router;