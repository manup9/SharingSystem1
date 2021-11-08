const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateOTP(data, otpgenerato) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.otp = !isEmpty(data.otp) ? data.otp : "";

  // Password checks
  if (Validator.isEmpty(data.otp)) {
    errors.otp = "Inserisci il codice OTP";
  }

  if (!Validator.equals(data.otp, otpgenerato)) {
    errors.otp = "Il codice OTP inserito non è valido";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
