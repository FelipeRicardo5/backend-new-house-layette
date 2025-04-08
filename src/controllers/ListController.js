const List = require('../models/List')

// Criar nova lista
exports.createList = async (req, res) => {
    try {
        const { name, items, description } = req.body;
        const list = new List({ name, items, description });
        await list.save();
        res.status(201).json(list);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Listar todas as listas
exports.getLists = async (req, res) => {
    try {
        const list = await List.find().populate('name');
        res.status(200).json(list);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

//Visualizar listas por ID
exports.getListById = async (req, res) => {
    try {
        const list = await List.findById(req.params.id).populate('name');
        if (!list) {
            return res.status(404).json({ message: 'Lista não encontrada' });
        }
        res.status(200).json(list);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Atualizar Lista
exports.updateList = async (req, res) => {
    try {
        const { id } = req.params;
        const { name } = req.body;

        const updatedList = await List.findByIdAndUpdate(id, { name, description, items }, { new: true });
        if (!updatedList) return res.status(404).json({ message: 'Lista não encontrada' });

        res.status(200).json(updatedList);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Excluir Lista
exports.deleteList = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedList = await List.findByIdAndDelete(id);
        if (!deletedList) return res.status(404).json({ message: 'Lista não encontrada' });

        res.status(200).json({ message: 'Lista excluída com sucesso' });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};
