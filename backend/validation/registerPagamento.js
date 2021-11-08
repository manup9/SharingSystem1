const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterPagamentoInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.numero_carta = !isEmpty(data.numero_carta) ? data.numero_carta : "";
  data.intestatario = !isEmpty(data.intestatario) ? data.intestatario : "";
  data.data_scadenza = !isEmpty(data.data_scadenza) ? data.data_scadenza : "";
  data.cvv = !isEmpty(data.cvv) ? data.cvv : "";

  if (Validator.isEmpty(data.numero_carta)) {
    errors.numero_carta = "Inserisci il numero della carta";
  }
  if (Validator.isCreditCard(data.numero_carta)) {
    errors.numero_carta =
      "Il numero della carta deve essere compreso tra 13 e 16 caratteri";
  }
  if (Validator.isEmpty(data.intestatario)) {
    errors.intestatario = "Inserisci l'intestatario";
  }
  
  if (Validator.isEmpty(data.data_scadenza)) {
    errors.data_scadenza = "Inserisci la data di scadenza";
  }
  if (Validator.isEmpty(data.cvv)) {
    errors.cvv = "Inserisci il CVV";
  }
  else if (!Validator.isLength(data.cvv, { min: 3, max: 3 })) {
    errors.cvv = "Il CVV deve essere di 3 caratteri";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
