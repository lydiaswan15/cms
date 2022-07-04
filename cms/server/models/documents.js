const mongoose = require('mongoose');

const documentSchema = mongoose.Schema({
   id: { type: String, required: true },
   name: { type: String },
   ulr: { type: String, required: true },
   children: [{type: documentSchema}]
});

module.exports = mongoose.model('Document', documentSchema);