const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  ruolo: {
    type: String,
    enum: ["Cliente", "Autista", "Addetto", "Admin"],
    default: "Cliente",
  },
  nome: {
    type: String,
    required: true,
  },
  cognome: {
    type: String,
    required: true,
  },
  data_nascita: {
    type: Date,
    required: true,
  },
  sesso: {
    type: String,
    required: true,
  },
  luogo_nascita: {
    type: String,
    required: true,
  },
  provincia_nascita: {
    type: String,
    required: true,
  },
  codice_fiscale: {
    type: String,
    required: true,
    maxLenght: 16,
    //match: RegEx
  },
  email: {
    type: String,
    required: true,
    //match: RegEx
  },
  password: {
    type: String,
    required: true,
    //match: RegEx
  },
  numero_patente: {
    type: String,
  },
  data_rilascio_patente: {
    type: Date,
  },
  data_scadenza_patente: {
    type: Date,
  },
  ente_rilascio: {
    type: String,
  },
  id_parcheggio: {
    type: String,
  },
});

module.exports = User = mongoose.model("users", UserSchema);
