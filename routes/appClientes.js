var express = require('express');
var router = express.Router();
var AppCliente = require('../models/appCliente');

router.get('/', function(req, res, next) {
  AppCliente.find({ }, function(erro, apps) {
    if (erro)
      res.send(erro);
    res.json({applicacoes: apps});
  });
});
router.post('/', function(req, res, next) {
  var appCliente = new AppCliente();
  
  appCliente.nome = req.body.nome;
  appCliente.urlCallback = req.body.callback;
  appCliente.chave = req.body.chave;

  appCliente.save(function(erro, app) {
      if (erro)
          res.send(erro);

      res.json({ mensagem: 'Aplicação adicionada no sistema!', dados: app });
  });
});

module.exports = router;
