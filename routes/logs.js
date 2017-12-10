var express = require('express');
var router = express.Router();
var Log = require('../models/log.js')

/* GET Listar os logs. */
router.get('/', function(req, res, next) {
  Log.find().sort({data:-1})
    .exec((err, doc)=>{
      if(!err){
        res.render('index', {loglist:doc})
      }
      else{
        return next(err)
      }
  })
});

router.get('/last7', function(req, res, next) {
    Log.find().sort({data:-1}).limit(7)
      .exec((err, doc)=>{
        if(!err){
          res.render('loglist', {loglist:doc})
        }
        else{
          return next(err)
        }
    })
  });

// GET Apresentar o formulário para adicionar um novo log
router.get('/log', (req, res, next)=>{
  res.render('form-log')
})

// POST para guardar um log
router.post('/log', (req, res, next)=>{
  var novo = new Log({ data: req.body.data, desc: req.body.desc })
  novo.save((err, novo)=>{
      if(!err) console.log('OK: log gravado: ' + novo.desc)
      else console.log('ERRO: ' + err)
  })
  res.redirect('/logs')
})

module.exports = router;
