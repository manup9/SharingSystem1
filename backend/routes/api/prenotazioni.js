const express = require("express");
const router = require("express").Router();

const Prenotazione = require("../../models/Prenotazione");
const Notifica = require("../../models/Notifiche");

router.post("/addPrenotazione", (req, res) => {
  const newPrenotazione = new Prenotazione({
    ora_partenza: req.body.ora_partenza,
    partenza: req.body.partenza,
    ora_arrivo: req.body.ora_arrivo,
    data_partenza: req.body.data_partenza,
    data_arrivo: req.body.data_arrivo,
    destinazione: req.body.destinazione,
    parcheggio_partenza: req.body.parcheggio_partenza,
    parcheggio_destinazione: req.body.parcheggio_destinazione,
    idVeicolo: req.body.idVeicolo,
    idCliente: req.body.idCliente,
    idAutista: req.body.idAutista,
    tipo_veicolo: req.body.tipo_veicolo,
    stato: req.body.stato,
  });

  newPrenotazione
    .save()
    .then(() => res.json("Prenotazione Aggiunta!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.put("/prenotazionilist/", (req, res) => {
  if (req.body.ruolo === "Cliente") {
    Prenotazione.find({
      idCliente: req.body.id,
    }).then((prenotazione) => {
      if (prenotazione) {
        res.json(prenotazione);
      } else {
        res.json({ success: false, message: "Non ci sono Prenotazioni" });
      }
    });
  } else if (req.body.ruolo === "Admin") {
    Prenotazione.find({
      /* eventuali filtri */
    }).then((prenotazione) => {
      if (prenotazione) {
        res.json(prenotazione);
      } else {
        res.json({ success: false, message: "Non ci sono Prenotazioni" });
      }
    });
  }
});

router.post("/notificheprenotazioni", (req, res) => {
  const newNotifica = new Notifica({
    tipo: "Autista",
    id_utente: req.body.id_utente,
    titolo: "Richiesta Autista",
    descrizione:
      "Il cliente: " +
      req.body.nome_utente +
      " " +
      req.body.cognome_utente +
      " ha richiesto una corsa con autista che parte da " +
      req.body.partenza +
      " e arriva a " +
      req.body.destinazione +
      ", partenza alle ore: " +
      req.body.ora_partenza +
      ", giorno: " +
      req.body.data_partenza,
  });

  newNotifica
    .save()
    .then(() => res.json("Notifica inviata!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.put("/modificastatoprenotazione/", (req, res) => {
  Prenotazione.findOne({ stato: req.body.statoiniziale }).then(
    (prenotazione) => {
      if (prenotazione) {
        prenotazione.stato = req.body.stato;
        prenotazione.save().then(() => {
          res.json({ Success: true, message: "Prenotazione aggiornata!" });
        });
        // if condition is TRUE do something
      } else {
        res.status(400).json({
          Success: false,
          message: "Qualcosa non andava,la prenotazione non è stato aggiornata",
        });
        // do something else
      }
    }
  );
});

router.put("/modificastatoprenotazione2/:id", (req, res) => {
  Prenotazione.findOne({ _id: req.params.id }).then((prenotazione) => {
    console.log(prenotazione._id);
    if (prenotazione) {
      prenotazione.stato = req.body.stato;
      prenotazione.save().then(() => {
        res.json({ Success: true, message: "Prenotazione aggiornata!" });
      });
      // if condition is TRUE do something
    } else {
      res.status(400).json({
        Success: false,
        message: "Qualcosa non andava,la prenotazione non è stato aggiornata",
      });
      // do something else
    }
  });
});

router.put("/modificaprenotazione/:id", (req, res) => {
  Prenotazione.findOne({ _id: req.params.id }).then((prenotazione) => {
    if (prenotazione) {
      prenotazione.data_arrivo = req.body.data_arrivo;
      prenotazione.ora_arrivo = req.body.ora_arrivo;
      prenotazione.destinazione = req.body.destinazione;
      prenotazione.save().then(() => {
        res.json({ Success: true, message: "Prenotazione aggiornata!" });
      });
      // if condition is TRUE do something
    } else {
      res.status(400).json({
        Success: false,
        message: "Qualcosa non andava,la prenotazione non è stato aggiornata",
      });
      // do something else
    }
  });
});

router.delete("/cancellaPrenotazione/:id", (req, res) => {
  Prenotazione.findOne({ _id: req.params.id })
    .then((prenotazione) =>
      prenotazione.remove().then(() => res.json({ success: true }))
    )
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
