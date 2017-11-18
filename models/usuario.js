const mongodb = "mongodb://localhost/provider-oauth";
var mongoose = require('mongoose');

mongoose.connect(mongodb, {
    useMongoClient: true
});

var UsuarioSchema = new mongoose.Schema({
  nome: { type: String, unique: true, required: true },
  senha: { type: String, required: true },
  id: { type: String, required: true }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);