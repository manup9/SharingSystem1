const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterPrenotazioneInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.data_partenza = !isEmpty(data.data_partenza) ? data.data_partenza : "";
  data.ora_partenza = !isEmpty(data.ora_partenza) ? data.ora_partenza : "";
  data.data_arrivo = !isEmpty(data.data_arrivo) ? data.data_arrivo : "";
  data.ora_arrivo = !isEmpty(data.ora_arrivo) ? data.ora_arrivo : "";

  if (Validator.isEmpty(data.data_partenza)) {
    errors.data_partenza = "Inserisci la data di partenza";
  }
  if (Validator.isEmpty(data.ora_partenza)) {
    errors.ora_partenza = "Inserisci l'ora della partenza";
  }
  if (Validator.isEmpty(data.data_arrivo)) {
    errors.data_arrivo = "Inserisci la data di arrivo";
  }
  if (Validator.isEmpty(data.ora_arrivo)) {
    errors.ora_arrivo = "Inserisci l'ora di arrivo";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
