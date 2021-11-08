const express = require("express");
const router = express.Router();

// Load input validation
const validateRegisterVeicoloInput = require("../../validation/registerVeicolo");

// Load Veicolo model
const Veicolo = require("../../models/Veicolo");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/addVeicolo", (req, res) => {
  // Form validation
  //const { errors, isValid } = validateRegisterVeicoloInput(req.body);
  // Check validation
  /*if (!isValid) {
    return res.status(400).json(errors);
  } else {*/
  const newVeicolo = new Veicolo({
    tipo: req.body.tipo,
    modello: req.body.modello,
    marca: req.body.marca,
    cilindrata: req.body.cilindrata,
    n_posti: req.body.n_posti,
    n_porte: req.body.n_porte,
    targa: req.body.targa,
    id_parcheggio: req.body.id_parcheggio,
    descrizione: req.body.descrizione,
    prezzo_festivo: req.body.prezzo_festivo,
    prezzo_feriale: req.body.prezzo_feriale,
  });
  newVeicolo
    .save()
    .then((veicolo) => res.json(veicolo))
    .catch((err) => res.status(400).json("Error: " + err));
  //}

  // Hash password before saving in database
});

router.get("/veicolilist", (req, res) => {
  Veicolo.find({
    /* eventuali filtri */
  }).then((veicolo) => {
    if (veicolo) {
      res.json(veicolo);
    } else {
      res.json({ success: false, message: "Non ci sono Veicoli" });
    }
  });
});

router.put("/veicolilistdisponibili/:tipo", (req, res) => {
  Veicolo.find({
    stato: "Attivo",
    tipo: req.body.tipo,
  }).then((veicolo) => {
    if (veicolo) {
      res.json(veicolo);
    } else {
      res.json({
        success: false,
        message: "Non ci sono Veicoli disponibili per la tipologia scelta",
      });
    }
  });
});

router.get("/veicoli/:id", (req, res) => {
  Veicolo.findOne({ _id: req.params.id }).then((veicolo) => {
    if (veicolo) {
      res.json(veicolo);
      // if condition is TRUE do something
    } else {
      res.json({ success: false, message: "Veicolo non trovato" });
      // do something else
    }
  });
});
//Update Customer
router.put("/updateVeicolo/:id", (req, res) => {
  Veicolo.findOne({ _id: req.params.id }).then((veicolo) => {
    if (veicolo) {
      veicolo.tipo = req.body.tipo;
      veicolo.modelllo = req.body.modello;
      veicolo.cilindrata = req.body.cilindrata;
      veicolo.patente_necessaria = req.body.patente_necessaria;

      veicolo.save().then((veicolo) => {
        res.json({ Success: true, message: "Veicolo aggiornato!" });
      });
      // if condition is TRUE do something
    } else {
      res.json({
        Success: false,
        message: "Qualcosa non andava, il veicolo non è stato aggiornato",
      });
      // do something else
    }
  });
});

router.put("/updatestatoveicolo/:id", (req, res) => {
  Veicolo.findOne({ _id: req.params.id }).then((veicolo) => {
    if (veicolo) {
      veicolo.stato = req.body.stato;
      veicolo.save().then(() => {
        res.json({ Success: true, message: "Veicolo aggiornato!" });
      });
      // if condition is TRUE do something
    } else {
      res.status(400).json({
        Success: false,
        message: "Qualcosa non andava, il veicolo non è stato aggiornato",
      });
      // do something else
    }
  });
});

router.put("/updateparcheggioveicolo/:id", (req, res) => {
  Veicolo.findOne({ _id: req.params.id }).then((veicolo) => {
    if (veicolo) {
      veicolo.id_parcheggio = req.body.id_parcheggio;
      veicolo.save().then(() => {
        res.json({ Success: true, message: "Veicolo aggiornato!" });
      });
      // if condition is TRUE do something
    } else {
      res.status(400).json({
        Success: false,
        message: "Qualcosa non andava, il veicolo non è stato aggiornato",
      });
      // do something else
    }
  });
});

router.put("/updatetariffaveicolo/:id", (req, res) => {
  Veicolo.findOne({ _id: req.params.id }).then((veicolo) => {
    if (veicolo) {
      if (req.body.prezzo_feriale === undefined)
        veicolo.prezzo_festivo = req.body.prezzo_festivo;
      else if (req.body.prezzo_festivo === undefined)
        veicolo.prezzo_feriale = req.body.prezzo_feriale;
      veicolo.save().then(() => {
        res.json({ Success: true, message: "Veicolo aggiornato!" });
      });
      // if condition is TRUE do something
    } else {
      res.status(400).json({
        Success: false,
        message: "Qualcosa non andava, il veicolo non è stato aggiornato",
      });
      // do something else
    }
  });
});
router.delete("/deleteVeicolo/:id", (req, res) => {
  Veicolo.findOne({ _id: req.params.id })
    .then((veicolo) => veicolo.remove().then(() => res.json({ success: true })))
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
