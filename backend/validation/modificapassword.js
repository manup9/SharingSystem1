const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function modificaPassword(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Inserisci la nuova password";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Conferma la password";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "La password deve essere di minimo 6 caratteri";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Le password non corrispondono";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
