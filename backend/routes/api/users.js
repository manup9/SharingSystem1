const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
const nodemailer = require("nodemailer");

function generateOtp(length) {
  var result = "";
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

var stringa;

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const validateOTP = require("../../validation/otp");
const validateModificaPassword = require("../../validation/modificapassword");
const validateModificaPatente = require("../../validation/modificapatente");

// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", async (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  await User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      return res.status(400).json({ email: "Email già esistente" });
    } else {
      const newUser = new User({
        ruolo: req.body.ruolo,
        nome: req.body.nome,
        cognome: req.body.cognome,
        data_nascita: req.body.data_nascita,
        sesso: req.body.sesso,
        luogo_nascita: req.body.luogo_nascita,
        provincia_nascita: req.body.provincia_nascita,
        codice_fiscale: req.body.codice_fiscale,
        email: req.body.email,
        password: req.body.password,
        numero_patente: req.body.numero_patente,
        data_rilascio: req.body.data_rilascio,
        data_consegna: req.body.data_consegna,
        ente_rilascio: req.body.ente_rilascio,
        id_parcheggio: req.body.id_parcheggio,
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    }
  });
});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then((user) => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email non registrata" });
    }

    // Check password
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          nome: user.nome,
          ruolo: user.ruolo,
          cognome: user.cognome,
          email: user.email,
          numero_patente: user.numero_patente,
          data_nascita: user.data_nascita,
          data_rilascio_patente: user.data_rilascio_patente,
          data_scadenza_patente: user.data_scadenza_patente,
          ente_rilascio: user.ente_rilascio,
          id_parcheggio: user.id_parcheggio,
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926, // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
            });
          }
        );
      } else {
        return res.status(400).json({ passwordincorrect: "Password errata" });
      }
    });
  });
});
router.get("/userlist", (req, res) => {
  User.find({ ruolo: "Cliente" }).then((user) => {
    if (user) {
      res.json(user);
    } else {
      res.json({ success: false, message: "Non ci sono Clienti" });
    }
  });
});
router.get("/dipendentilist", (req, res) => {
  User.find({ $or: [{ ruolo: "Autista" }, { ruolo: "Addetto" }] }).then(
    (user) => {
      if (user) {
        res.json(user);
      } else {
        res.json({ success: false, message: "Non ci sono Dipendenti" });
      }
    }
  );
});

//Delete/Block a User
router.delete("/deleteDipendente/:id", (req, res) => {
  User.findOne({ _id: req.params.id })
    .then((user) => user.remove().then(() => res.json({ success: true })))
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/recuperoPassword", (req, res) => {
  User.findOne({ email: req.body.email }).then((user) => {
    if (user) {
      stringa = generateOtp(8);
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "gabrielekarm@gmail.com",
          pass: "karmgabriele99@",
        },
      });
      const mailOptions = {
        from: "gabrielekarm@gmail.com",
        to: req.body.email,
        subject: "KARM - Recupero Password",
        text: `Ciao ${user.name}, Inserisci il seguente codice OTP per recuperare la password: ${stringa} - TEAM KARM`,
        html: `Ciao <strong> ${user.nome}</strong>,<br><br>Inserisci il seguente codice OTP per recuperare la password: ${stringa} <br>- TEAM KARM`,
      };

      //Nodemailer SendMail
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          console.log(err);
        } else {
          console.log(" Message Confirmation -  : " + info.response);
        }
      });
      res.json({
        succeed: true,
        message: "L'email di recupero è stata inviata",
      });
      console.log(stringa);
    } else console.log("Errore");
  });
});

router.post("/codiceOTP", async (req, res) => {
  // Form validation

  const { errors, isValid } = validateOTP(req.body, stringa);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
});

router.put("/modificaPassword/:email", (req, res) => {
  const { errors, isValid } = validateModificaPassword(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ email: req.params.email }).then((user) => {
    if (user) {
      user.password = req.body.password;
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
          if (err) throw err;
          user.password = hash;
          user
            .save()
            .then((user) => res.json(user))
            .catch((err) => console.log(err));
        });
      });
    } else res.status(400).json({ email: "Email non registrata" });
  });
});

router.put("/modificaPatente/:id", (req, res) => {
  const { errors, isValid } = validateModificaPatente(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  User.findOne({ _id: req.params.id }).then((user) => {
    if (user) {
      user.numero_patente = req.body.numero_patente;
      user.data_rilascio_patente = req.body.data_rilascio_patente;
      user.data_scadenza_patente = req.body.data_scadenza_patente;
      user.ente_rilascio = req.body.ente_rilascio;
      user
        .save()
        .then((user) => res.json(user))
        .catch((err) => console.log(err));
    } else res.status(400).json({});
  });
});

router.put("/modificaParcheggioAssociato/:id", (req, res) => {
  User.findOne({ _id: req.params.id }).then((user) => {
    console.log("sono qui");
    if (user) {
      user.id_parcheggio = req.body.id_parcheggio;
      user
        .save()
        .then((user) => res.json(user))
        .catch((err) => console.log(err));
    } else res.status(400).json({});
  });
});

module.exports = router;
