var express = require('express');
var router = express.Router();
var Usuario = require('../models/usuario');
var AppCliente = require('../models/appCliente');
var utils = require('../utils/crypto');
var jwt = require('jsonwebtoken');

router.use(function(req, res, next){
    var token = req.body.token || req.query.token || req.headers['x-access-token'];//o token pode ser informado de diversas formas
    var chaveApp = req.body.chave || req.query.chave || req.headers['x-chave-aplicacao'];

    if(token && chaveApp){
        AppCliente.findOne({chave: chaveApp}, function(err, app){
            if(err) throw err;

            else if(chaveApp){
                jwt.verify(token, app.chave, function(error, decoded){
                    if(error){
                        res.json({sucesso: false, mensagem:"Falha ao autenticar token!"});
                    }
                    else{
                        req.decoded = decoded;
                        next();
                    }
                })
            }
            else{
                res.json({sucesso: false, mensagem: "Aplicação não encontrada! Chave não existe na base de dados!"})
            }
        })
        
    }
    else{
        return res.status(403).send({sucesso: false, mensagem: 'Token e/ou chave não informado(s)!'});
    }
});

router.get('/', function(req, res, next) {
  var usuario = req.decoded;

  Usuario.findOne({'login':usuario.login}, function(erro, usuario) {
    if (erro)
      res.send(erro);
    res.json({"login": usuario.login, "chavePublica": utils.decriptFromHex(usuario.chavePublica), "chavePrivada":  utils.decriptFromHex(usuario.chavePrivada)});
  });
});

module.exports = router;