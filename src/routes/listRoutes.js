const express = require('express');
const router = express.Router();
const { createList, getLists, updateList, deleteList, getListById, getItemsByList } = require('../controllers/ListController.js');

// Rotas de List
router.post('/', createList);
router.get('/', getLists);
router.get('/:id', getListById);
router.put('/:id', updateList); // Rota para atualizar List
router.delete('/:id', deleteList); // Rota para deletar List
router.get('/:listId/items', getItemsByList); // Rota para listar itens por ID da lista

module.exports = router;