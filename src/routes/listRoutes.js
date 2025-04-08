const express = require('express');
const router = express.Router();
const { createList, getLists, updateList, deleteList, getListById } = require('../controllers/ListController.js');

// Rotas de List
router.post('/', createList);
router.get('/', getLists);
router.get('/:id', getListById);
router.put('/:id', updateList); // Rota para atualizar List
router.delete('/:id', deleteList); // Rota para deletar List

module.exports = router;