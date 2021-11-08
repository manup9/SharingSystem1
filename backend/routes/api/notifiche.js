const express = require("express");
const router = express.Router();

const Notifica = require("../../models/Notifiche");

router.put("/notifichelist", (req, res) => {
  if (req.body.ruolo === "Autista") {
    Notifica.find({
      tipo: "Autista",
    }).then((notifica) => {
      if (notifica) {
        res.json(notifica);
      } else {
        res.json({ success: false, message: "Non ci sono notifiche" });
      }
    });
  } else if (req.body.ruolo === "Cliente") {
    Notifica.find({
      tipo: "Cliente",
      id_utente: req.body.id,
    }).then((notifica) => {
      if (notifica) {
        res.json(notifica);
      } else {
        res.json({ success: false, message: "Non ci sono notifiche" });
      }
    });
  }
});

router.post("/notificheprenotazionicliente/:id_utente", (req, res) => {
  const newNotifica = new Notifica({
    id_utente: req.params.id_utente,
    tipo: "Cliente",
    titolo: "Richiesta Accettata",
    descrizione: "Un'autista ha accettato la tua corsa",
  });

  newNotifica
    .save()
    .then(() => res.json("Notifica inviata!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.delete("/cancellanotifica/:id", (req, res) => {
  Notifica.findOne({
    _id: req.params.id,
  })
    .then((notifica) =>
      notifica.remove().then(() => res.json({ success: true }))
    )
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
