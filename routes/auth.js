var express = require('express');
var router = express.Router();
var Usuario = require('../models/usuario');
var AppCliente = require('../models/appCliente');
var utils = require('../utils/crypto');
var jwt = require('jsonwebtoken');

router.post('/', function(req, res, next) {
    AppCliente.findOne({
        chave: req.body.chaveApp
    }, function(error, app){
        if(error) throw error;

        if(!app){
            res.json({sucesso: false, mensagem: "Autenticação falhou! Aplicação não existe!"});
        }else{
            Usuario.findOne({
                login: req.body.login
                }, function(err, usuario){
                    if(err) throw err;
        
                    if(!usuario){
                        res.json({sucesso: false, mensagem: "Autenticação falhou! Login não existe!"});
                    }else if(usuario){
                        if(usuario.senha != require('crypto').createHash('md5').update(req.body.senha).digest('hex')){
                            res.json({sucesso: false, mensagem: "Autenticação falhou! Senha Incorreta!"});
                        }
                        else{
                            const payload = {
                                login: usuario.login,
                                chavePublica: usuario.chavePublica,
                                chavePrivada: usuario.chavePrivada
                            };
                            var token = jwt.sign(payload, 'NODE-OAUTH', { 
                                expiresIn: 1440 //expira em 24 horas
                            });
                            // console.log("http://" + app.urlCallback + "?" + token);
                            res.json({sucesso: true, mensagem: "Autenticação realizada com sucesso!", token: token, urlCallback: app.urlCallback});
                        }
                    }
            })
        }
    })
    
  
  
});

module.exports = router;
