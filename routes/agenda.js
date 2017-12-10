var express = require('express');
var router = express.Router();
var Agenda = require('../models/agenda.js')

/* GET Listar a agenda corrente. */
router.get('/', function(req, res, next) {
  Agenda.findOne({titulo:/2017/})
    .exec((err, doc)=>{
      if(!err){
        res.render('agenda', {ag:doc})
      }
      else{
        return next(err)
      }
  })
});

// GET Apresentar o formulário para adicionar atividade à agenda corrente
router.get('/atividade', (req, res, next)=>{
  res.render('form-atividade')
})

// POST para guardar uma atividade
router.post('/atividade', (req, res, next)=>{
  var nova = {tipo: req.body.tipo, data: req.body.data, local: req.body.local, horario: req.body.horario, informacoes: req.body.informacoes}
  Agenda.update({titulo:/2017/}, { $push: { atividades: nova}}, (err, result)=>{
    if(!err) console.log('Acrescentei uma atividade.')
    else console.log('Erro: ' + err)
  })
  res.redirect('/agenda')
})

module.exports = router;
