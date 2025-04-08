const mongoose = require('mongoose');

const typelist = new mongoose.Schema({
    List: { type: mongoose.Schema.Types.ObjectId, ref: 'ListTrousseau', required: true },
    nameType: { type: String, required: true }
});

const TypeList = mongoose.model('TypeList', typelist);

module.exports = TypeList;
