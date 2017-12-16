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

router.get('/:login/keys', function(req, res, next) {
  var login = req.params.login;
  Usuario.findOne({'login':login}, function(erro, usuario) {
    if (erro)
      res.send(erro);
    res.json({"login": usuario.login, "chavePublica": utils.decriptFromHex(usuario.chavePublica), "chavePrivada":  utils.decriptFromHex(usuario.chavePrivada)});
  });
});


router.post('/', function(req, res, next) {
  var usuario = new Usuario();
  
  usuario.login = req.body.login;
  usuario.senha = require('crypto').createHash('md5').update(req.body.senha).digest('hex');
  usuario.chavePrivada = utils.criptoToHex(req.body.chavePrivada);
  // usuario.chavePrivada = require('crypto').createHash('md5').update(req.body.chavePrivada).digest('hex');
  usuario.chavePublica = utils.criptoToHex(req.body.chavePublica);
  // usuario.chavePublica = require('crypto').createHash('md5').update(req.body.chavePublica).digest('hex');

  usuario.save(function(erro) {
      if (erro){
          console.log(erro);
          res.send(erro);
      }
      else{
        res.json({ mensagem: 'Usuario adicionado no sistema!', dados: usuario });
      }
  });
});

module.exports = router;
