const Item = require('../models/Item')
const List = require('../models/List')

// Criar nova plantação
exports.createItem = async (req, res) => {
    try {
        console.log(req.body);  // Verifica o corpo da requisição
        const { name, description } = req.body;
        const item = new Item({ name, description });
        await item.save();
        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.createItemWithList = async (req, res) => {
    try {
        const { id } = req.params; // Recebe o ID da lista!
        const { name, description } = req.body;
        const item = new Item({ name, description });
        await item.save();

        // Adiciona o item à lista correspondente
        await List.findByIdAndUpdate(
            id,
            { $push: { items: item._id } }, // Adiciona o ID do item ao array "items" da lista 
            { new: true }
        );

        res.status(201).json(item);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Listar todas as plantações
exports.getItems = async (req, res) => {
    try {
        const item = await Item.find().populate('description', 'name');
        res.status(200).json(item);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id).populate('description', 'name');
        if (!item) {
            return res.status(404).json({ message: 'Item não encontrada' });
        }
        res.status(200).json(item);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Atualizar plantação
exports.updateItem = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, description, responsible } = req.body;

        const updatedItem = await Item.findByIdAndUpdate(id, { name, description, responsible }, { new: true });
        if (!updatedItem) return res.status(404).json({ message: 'Item não encontrado' });

        res.status(200).json(updatedItem);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Excluir plantação
exports.deleteItem = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedItem = await Item.findByIdAndDelete(id);
        if (!deletedItem) return res.status(404).json({ message: 'Item não encontrado' });

        res.status(200).json({ message: 'Item excluído com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
