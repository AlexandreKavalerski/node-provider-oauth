var express = require('express');
var router = express.Router();
var Usuario = require('../models/usuario');
// var crypto = require('crypto');
// var md5Privada = crypto.createHash('md5');
// var md5Publica = crypto.createHash('md5');
// var md5Senha = crypto.createHash('md5');


router.get('/', function(req, res, next) {
  Usuario.find({ }, function(erro, usuarios) {
    if (erro)
      res.send(erro);
    res.json({usuarios: usuarios});
  });
});
router.post('/', function(req, res, next) {
  var usuario = new Usuario();
  
  usuario.login = req.body.login;
  usuario.senha = require('crypto').createHash('md5').update(req.body.senha).digest('hex');
  usuario.chavePrivada = require('crypto').createHash('md5').update(req.body.chavePrivada).digest('hex');
  usuario.chavePublica = require('crypto').createHash('md5').update(req.body.chavePublica).digest('hex');

  usuario.save(function(erro) {
      if (erro)
          res.send(erro);

      res.json({ mensagem: 'Usuario adicionado no sistema!', dados: usuario });
  });
});

module.exports = router;
