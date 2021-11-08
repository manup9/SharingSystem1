const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const NotificheSchema = new Schema(
  {
    id_utente: {
      type: String,
    },
    tipo: {
      type: String,
    },
    titolo: {
      type: String,
    },
    descrizione: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Notifiche = mongoose.model("notifiche", NotificheSchema);
