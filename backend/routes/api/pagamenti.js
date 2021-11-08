const express = require("express");
const router = express.Router();

// Load input validation
const validateRegisterPagamentoInput = require("../../validation/registerPagamento");

// Load Veicolo model
const Pagamento = require("../../models/Pagamento");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/addMetodo", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterPagamentoInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  } else {
    const newPagamento = new Pagamento({
      id_cliente: req.body.id_cliente,
      numero_carta: req.body.numero_carta,
      intestatario: req.body.intestatario,
      data_scadenza: req.body.data_scadenza,
      cvv: req.body.cvv,
    });
    newPagamento
      .save()
      .then((pagamento) => res.json(pagamento))
      .catch((err) => console.log(err));
  }

  // Hash password before saving in database
});

router.get("/pagamentilist/:id", (req, res) => {
  Pagamento.find({
    id_cliente: req.params.id,
  }).then((pagamento) => {
    if (pagamento) {
      res.json(pagamento);
    } else {
      res.json({ success: false, message: "Non ci sono Metodi di Pagamento" });
    }
  });
});

//Delete/Block a User
router.delete("/deletePagamento/:id", (req, res) => {
  Pagamento.findOne({ _id: req.params.id })
    .then((pagamento) =>
      pagamento.remove().then(() => res.json({ success: true }))
    )
    .catch((err) => {
      res.status(400).json(err);
    });
});

module.exports = router;
