const mongodb = "mongodb://localhost/provider-oauth";
var mongoose = require('mongoose');

mongoose.connect(mongodb, {
    useMongoClient: true
});

var UsuarioSchema = new mongoose.Schema({
  login: { type: String, unique: true, required: true },
  senha: { type: String, required: true },
  chavePrivada: { type: String, required: true },
  chavePublica: {type: String, unique: true}
});

module.exports = mongoose.model('Usuario', UsuarioSchema);