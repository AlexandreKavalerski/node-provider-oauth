var express = require('express');
var router = express.Router();
var Usuario = require('../models/usuario');
var utils = require('../utils/crypto');

router.get('/public', function(req, res, next) {
  Usuario.find({ }, function(erro, usuarios) {
    if (erro)
      res.send(erro);
    res.json({usuarios: usuarios.map(function(usuario){
      return {"login": usuario.login, "chavePublica": utils.decriptFromHex(usuario.chavePublica)}
    })});
  });
});

router.post('/', function(req, res, next) {
  var usuario = new Usuario();
  
  usuario.login = req.body.login;
  usuario.senha = require('crypto').createHash('md5').update(req.body.senha).digest('hex');
  usuario.chavePrivada = utils.criptoToHex(req.body.chavePrivada);
  usuario.chavePublica = utils.criptoToHex(req.body.chavePublica);

  usuario.save(function(erro) {
      if (erro){
          res.send(erro);
      }
      else{
        res.json({ mensagem: 'Usuario adicionado no sistema!', dados: usuario });
      }
  });
});

module.exports = router;
