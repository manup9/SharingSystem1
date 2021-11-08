const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ParcheggioSchema = new Schema(
  {
    nome: {
      type: String,
    },
    indirizzo: {
      type: String,
    },
    numero_civico: {
      type: String,
    },
    capienza_auto: {
      type: String,
    },
    capienza_moto: {
      type: String,
    },
    capienza_bici: {
      type: String,
    },
    capienza_monopattini: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Parcheggio = mongoose.model("parcheggi", ParcheggioSchema);
