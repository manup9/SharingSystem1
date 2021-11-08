const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const PagamentoSchema = new Schema(
  {
    id_cliente: {
      type: String,
    },
    numero_carta: {
      type: String,
    },
    intestatario: {
      type: String,
    },
    data_scadenza: {
      type: Date,
    },
    cvv: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Pagamento = mongoose.model("pagamento", PagamentoSchema);
