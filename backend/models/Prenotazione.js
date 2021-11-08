const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PrenotazioneSchema = new Schema(
  {
    idCliente: {
      type: String,
    },
    idVeicolo: {
      type: String,
    },
    partenza: {
      type: String,
    },
    data_partenza: {
      type: Date,
    },
    ora_partenza: {
      type: String,
    },
    destinazione: {
      type: String,
    },
    parcheggio_destinazione: {
      type: String,
    },
    parcheggio_partenza: {
      type: String,
    },
    data_arrivo: {
      type: Date,
    },
    ora_arrivo: {
      type: String,
    },
    tipo_veicolo: {
      type: String,
    },
    stato: {
      type: String,
      default: "Incompleta",
    },
    idAutista: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Prenotazione = mongoose.model(
  "prenotazione",
  PrenotazioneSchema
);
