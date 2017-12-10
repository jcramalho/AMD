var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AgendaSchema = new Schema(
  {
    id: {type: String},
    titulo: {type: String},
    atividades: [{
    tipo: {type: String, required: true},
    data: {type: String},
    local: {type: String},
    horario: {type: String},
    informacoes: {type: String}}]
  }
);

//Export model
module.exports = mongoose.model('Agenda', AgendaSchema, 'agendas');