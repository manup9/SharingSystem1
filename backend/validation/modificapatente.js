const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validatePatente(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.numero_patente = !isEmpty(data.numero_patente)
    ? data.numero_patente
    : "";
  data.data_rilascio_patente = !isEmpty(data.data_rilascio_patente)
    ? data.data_rilascio_patente
    : "";
  data.data_scadenza_patente = !isEmpty(data.data_scadenza_patente)
    ? data.data_scadenza_patente
    : "";
  data.ente_rilascio = !isEmpty(data.ente_rilascio) ? data.ente_rilascio : "";

  // Password checks
  if (Validator.isEmpty(data.numero_patente)) {
    errors.numero_patente = "Inserisci il numero di patente";
  }
  if (Validator.isEmpty(data.data_rilascio_patente)) {
    errors.data_rilascio_patente = "Inserisci la data di rilascio";
  }
  if (Validator.isEmpty(data.data_scadenza_patente)) {
    errors.data_scadenza_patente = "Inserisci la data di scadenza";
  }
  if (Validator.isEmpty(data.ente_rilascio)) {
    errors.ente_rilascio = "Inserisci l'ente di rilascio";
  }

  if (!Validator.isLength(data.numero_patente, { min: 10, max: 10 })) {
    errors.numero_patente = "Il numero di patente è composto da 10 caratteri";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
