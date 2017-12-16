const mongodb = "mongodb://localhost/provider-oauth";
var mongoose = require('mongoose');

mongoose.connect(mongodb, {
    useMongoClient: true
});

var AppClienteSchema = new mongoose.Schema({
  nome: { type: String, unique: true, required: true },
  urlCallback: { type: String, required: true},
  chave: {type: String, required: true, unique: true},
  nivelAcesso: {type: String, required: false}
});

module.exports = mongoose.model('AppCliente', AppClienteSchema);