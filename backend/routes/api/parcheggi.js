const express = require("express");
const router = express.Router();

// Load input validation
const validateRegisterParcheggioInput = require("../../validation/registerParcheggio");

// Load Veicolo model
const Parcheggio = require("../../models/Parcheggio");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/addParcheggio", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterParcheggioInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    const newParcheggio = new Parcheggio({
      nome: req.body.nome,
      indirizzo: req.body.indirizzo,
      numero_civico: req.body.numero_civico,
      capienza_auto: req.body.capienza_auto,
      capienza_moto: req.body.capienza_moto,
      capienza_bici: req.body.capienza_bici,
      capienza_monopattini: req.body.capienza_monopattini,
    });
    newParcheggio
      .save()
      .then((parcheggio) => res.json(parcheggio))
      .catch((err) => console.log(err));
  }

  // Hash password before saving in database
});

router.get("/parcheggilist", (req, res) => {
  Parcheggio.find({
    /* eventuali filtri */
  }).then((parcheggio) => {
    if (parcheggio) {
      res.json(parcheggio);
    } else {
      res.json({ success: false, message: "Non ci sono Parcheggi" });
    }
  });
});

module.exports = router;
