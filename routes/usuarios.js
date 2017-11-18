var express = require('express');
var router = express.Router();
var Usuario = require('../models/usuario');


router.get('/', function(req, res, next) {
  console.log(`Objeto req:`);
  console.log(req);
  Usuario.find({ id: req.user.id }, function(erro, usuarios) {
    if (erro)
      res.send(erro);
    res.json({usuarios: usuarios});
  });
});
router.post('/', function(req, res, next) {
  var usuario = new Usuario();
  
  usuario.nome = req.body.nome;
  usuario.senha = req.body.senha;
  usuario.id = req.body.id;

  usuario.save(function(erro) {
      if (erro)
          res.send(erro);

      res.json({ mensagem: 'Usuario adicionado no sistema!', dados: usuario });
  });
});

module.exports = router;
