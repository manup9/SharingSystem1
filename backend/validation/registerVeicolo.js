const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterVeicoloInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.tipo = !isEmpty(data.tipo) ? data.tipo : "";
  data.prezzo_feriale = !isEmpty(data.prezzo_feriale)
    ? data.prezzo_feriale
    : "";

  // Name checks
  if (Validator.isEmpty(data.tipo)) {
    errors.tipo = "Inserisci il tipo";
  }
  if (Validator.isEmpty(data.prezzo_feriale)) {
    errors.prezzo_feriale =
      "Inserisci il prezzo del veicolo nei giorni feriali";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
