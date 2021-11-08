const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterParcheggioInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.nome = !isEmpty(data.nome) ? data.nome : "";
  data.indirizzo = !isEmpty(data.indirizzo) ? data.indirizzo : "";
  data.numero_civico = !isEmpty(data.numero_civico) ? data.numero_civico : "";
  data.capienza_auto = !isEmpty(data.capienza_auto) ? data.capienza_auto : "";
  data.capienza_moto = !isEmpty(data.capienza_moto) ? data.capienza_moto : "";
  data.capienza_bici = !isEmpty(data.capienza_bici) ? data.capienza_bici : "";
  data.capienza_monopattini = !isEmpty(data.capienza_monopattini)
    ? data.capienza_monopattini
    : "";

  // Name checks
  if (Validator.isEmpty(data.nome)) {
    errors.nome = "Inserisci il nome";
  }

  if (Validator.isEmpty(data.indirizzo)) {
    errors.indirizzo = "Inserisci l'indirizzo";
  }
  if (Validator.isEmpty(data.numero_civico)) {
    errors.numero_civico = "Inserisci il numero_civico"; //deve essere maggiore di 0
  }
  if (Validator.isEmpty(data.capienza_auto)) {
    errors.capienza_auto = "Inserisci la capienza delle autovetture"; //deve essere maggiore di 0
  }
  if (Validator.isEmpty(data.capienza_moto)) {
    errors.capienza_moto = "Inserisci la capienza delle moto"; //deve essere maggiore di 0
  }
  if (Validator.isEmpty(data.capienza_bici)) {
    errors.capienza_bici = "Inserisci la capienza delle biciclette"; //deve essere maggiore di 0
  }
  if (Validator.isEmpty(data.capienza_monopattini)) {
    errors.capienza_monopattini = "Inserisci la capienza dei monopattini"; //deve essere maggiore di 0
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
