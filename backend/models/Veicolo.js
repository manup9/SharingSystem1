const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VeicoloSchema = new Schema(
  {
    tipo: {
      type: String,
      //enum: ["Autovettura", "Moto", "Bicicletta", "Monopattino"],
    },
    modello: {
      type: String,
      default: "",
    },
    marca: {
      type: String,
      default: "",
    },
    cilindrata: {
      type: String,
      default: "0",
    },
    n_posti: {
      type: String,
      default: "1",
    },
    n_porte: {
      type: String,
      default: "0",
    },
    targa: {
      type: String,
      default: "",
      //match: RegEx
    },
    id_parcheggio: {
      type: String,
    },
    descrizione: {
      type: String,
    },
    prezzo_festivo: {
      type: String,
    },
    prezzo_feriale: {
      type: String,
    },
    stato: {
      type: String,
      default: "Attivo",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Veicolo = mongoose.model("veicoli", VeicoloSchema);
