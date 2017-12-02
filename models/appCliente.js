const mongodb = "mongodb://localhost/provider-oauth";
var mongoose = require('mongoose');
var ObjectId = new mongoose.Schema.ObjectId;

mongoose.connect(mongodb, {
    useMongoClient: true
});

var AppClienteSchema = new mongoose.Schema({
  nome: { type: String, unique: true, required: true },
  urlCallback: { type: String, required: true},
  chave: ObjectId
});

module.exports = mongoose.model('AppCliente', AppClienteSchema);