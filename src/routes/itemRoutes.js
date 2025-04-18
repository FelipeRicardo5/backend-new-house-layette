const express = require('express');
const router = express.Router();
const ItemController = require('../controllers/ItemController.js')
const { createItem, getItems, updateItem, deleteItem, getItemById, createItemWithList } = require('../controllers/ItemController.js');

// Rotas de Item
router.post('/', ItemController.createItem);
router.post('/:id/withList', ItemController.createItemWithList); // Rota para criar Item com List
router.get('/', ItemController.getItems);
router.get('/:id', ItemController.getItemById);
router.put('/:id', ItemController.updateItem); // Rota para atualizar Item
router.delete('/:id', ItemController.deleteItem); // Rota para deletar Item

module.exports = router;