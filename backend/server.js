const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const users = require("./routes/api/users");
const veicoli = require("./routes/api/veicoli");
const parcheggi = require("./routes/api/parcheggi");
const pagamenti = require("./routes/api/pagamenti");
const prenotazioni = require("./routes/api/prenotazioni");
const notifiche = require("./routes/api/notifiche");

const app = express();
// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());
// DB Config
const db = require("./config/keys").mongoURI;
// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connesso correttamente!"))
  .catch((err) => console.log(err));
// Passport middleware
app.use(passport.initialize());
// Passport config
require("./config/passport")(passport);
// Routes
app.use("/api/users", users);
app.use("/api/veicoli", veicoli);
app.use("/api/parcheggi", parcheggi);
app.use("/api/pagamenti", pagamenti);
app.use("/api/prenotazioni", prenotazioni);
app.use("/api/notifiche", notifiche);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server stratato alla porta: ${port}!`));

app.use(function (err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  window.location.href = "errorServer";
});
