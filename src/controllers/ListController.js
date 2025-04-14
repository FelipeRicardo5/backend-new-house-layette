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
        const list = await List.find(req.params.id)
          .populate('items') // Popula todos os campos dos itens
          .populate('typeList', 'name') // Popula apenas o nome do typeList
          .exec();
    
        if (!list) {
          return res.status(404).json({ message: 'Lista não encontrada' });
        }
    
        res.json(list);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
};
// -------------------------------------------------------------------------------------------------------
//Visualizar listas por ID
exports.getListById = async (req, res) => {
  try {
    const list = await List.findById(req.params.id).populate('name').populate('items').populate('typeList', 'name');
    if (!list) {
      return res.status(404).json({ message: 'Lista não encontrada' });
    }
    res.status(200).json(list);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
// AMBOS OS CÓDIGOS ABAIXO SÃO PARA LISTAR ITENS POR ID DA LISTA PORÉM O SEGUNDO É O QUE FUNCIONA NA MINHA ABORDAGEM
exports.getItemsByList = async (req, res) => {
  try {
    const listId = req.params.listId; // Ou req.query.listId dependendo da sua rota
    
    // Busca a lista e popula apenas os itens
    const list = await List.findById(listId)
    .populate({
      path: 'items',
      select: 'name description' // Seleciona quais campos dos itens você quer
    })
    .lean()
    .exec();
    
    if (!list) {
      return res.status(404).json({ message: 'Lista não encontrada' });
    }
    
    // Retorna apenas os itens populados
    res.json({
      items: list.items
    });
    
  } catch (error) {
    console.error('Erro ao buscar itens da lista:', error);
    res.status(500).json({ message: 'Erro interno do servidor' });
  }
};
// -------------------------------------------------------------------------------------------------------

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
