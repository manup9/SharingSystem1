const Validator = require("validator");
const isEmpty = require("is-empty");

//import CodiceFiscale
var CodiceFiscale = require("codice-fiscale-js");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  const today = new Date();

  // Convert empty fields to an empty string so we can use validator functions
  data.nome = !isEmpty(data.nome) ? data.nome : "";
  data.cognome = !isEmpty(data.cognome) ? data.cognome : "";
  data.data_nascita = !isEmpty(data.data_nascita) ? data.data_nascita : "";
  data.codice_fiscale = !isEmpty(data.codice_fiscale)
    ? data.codice_fiscale
    : "";
  data.sesso = !isEmpty(data.sesso) ? data.sesso : "";
  data.luogo_nascita = !isEmpty(data.luogo_nascita) ? data.luogo_nascita : "";
  data.provincia_nascita = !isEmpty(data.provincia_nascita)
    ? data.provincia_nascita
    : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
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

  // Name checks
  if (Validator.isEmpty(data.nome)) {
    errors.nome = "Inserisci il nome";
  }

  if (Validator.isEmpty(data.cognome)) {
    errors.cognome = "Inserisci il cognome";
  }
  if (Validator.isEmpty(data.data_nascita)) {
    errors.data_nascita = "Inserisci la data di nascita";
  }
  else if(today.getFullYear() - data.data_nascita.substring(0,4) < 15){
    errors.data_nascita = "Hai meno di 14 anni, non puoi registrarti";
  }

  if (Validator.isEmpty(data.codice_fiscale)) {
    errors.codice_fiscale = "Inserisci il codice fiscale";
  }
  if (Validator.isEmpty(data.sesso)) {
    errors.sesso = "Inserisci il sesso";
  }
  if (Validator.isEmpty(data.luogo_nascita)) {
    errors.luogo_nascita = "Inserisci il luogo_nascita";
  }
  if (Validator.isEmpty(data.provincia_nascita)) {
    errors.provincia_nascita = "Inserisci il provincia_nascita";
  }
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Inserisci l'email";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email non valida";
  }

  // Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Inserisci la password";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Conferma la password";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "La password deve essere di minimo 6 caratteri";
  }

  if (
    !Validator.isEmpty(data.numero_patente) &&
    !Validator.isLength(data.numero_patente, { min: 10, max: 10 })
  ) {
    errors.numero_patente = "Il numero di patente è composto da 10 caratteri";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Le password non corrispondono";
  }
  //CODICE FISCALE CHECK
  try {
    var dat = new Date(data.data_nascita);
    var cf_temporaneo = new CodiceFiscale({
      name: data.nome,
      surname: data.cognome,
      gender: data.sesso,
      day: dat.getDate(),
      month: dat.getMonth() + 1,
      year: dat.getFullYear(),
      birthplace: data.luogo_nascita,
      birthplaceProvincia: data.provincia_nascita,
    });
    if (cf_temporaneo != data.codice_fiscale) {
      errors.codice_fiscale = "Codice Fiscale non valido";
    }
  } catch {}

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
