const mongoose = require('mongoose')

const listtrousseau = new mongoose.Schema({
    name: { type: String, required: true },
    items: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Item', required: true }],
    typeList: { type: mongoose.Schema.Types.ObjectId, ref: 'TypeList'},
    description: { type: String, required: true }
})
//maybe switch rf
const ListTrousseau = mongoose.model('listtrousseau', listtrousseau);

module.exports = ListTrousseau;