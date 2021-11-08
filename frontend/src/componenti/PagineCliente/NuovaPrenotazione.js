import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser, logoutUser } from "../../actions/authAutentications";
import classnames from "classnames";
import Button from "react-bootstrap/Button";

//componenti da react-bootstrap
import { Container, Form, Alert } from "react-bootstrap";

//componenti da material-ui

class NuovaPrenotazione extends Component {
  constructor() {
    super();
    this.state = {
      partenza: "",
      data_partenza: "",
      ora_partenza: "",
      destinazione: "",
      data_arrivo: "",
      ora_arrivo: "",
      ora_partenza: "",
      parcheggio_partenza: "",
      parcheggio_destinazione: "",
      idVeicolo: "",
      idCliente: "",
      idAutista: "",
      tipo_veicolo: "",
      dispositivo: "",
      numero_patente: "",
      error: false,
      errors: [],
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  validate(Prenotazione) {
    this.setState({ error: false });
    this.state.errors.partenza = "";
    this.state.errors.data_partenza = "";
    this.state.errors.ora_partenza = "";
    this.state.errors.destinazione = "";
    this.state.errors.data_arrivo = "";
    this.state.errors.ora_arrivo = "";
    this.state.errors.tipo_veicolo = "";
    this.state.errors.idAutista = "";
    this.state.errors.dispositivo = "";
    if (Prenotazione.partenza === "") {
      this.state.errors.partenza = "Inserisci la partenza";
      this.setState({ error: true });
    }
    if (this.state.data_partenza === "") {
      this.state.errors.data_partenza = "Inserisci la data di partenza";
      this.setState({ error: true });
    }
    if (Prenotazione.ora_partenza === "") {
      this.state.errors.ora_partenza = "Inserisci l'ora di partenza";
      this.setState({ error: true });
    }
    if (Prenotazione.destinazione === "") {
      this.state.errors.destinazione = "Inserisci la destinazione";
      this.setState({ error: true });
    }
    if (Prenotazione.data_arrivo === "") {
      this.state.errors.data_arrivo = "Inserisci la data di arrivo";
      this.setState({ error: true });
    }
    if (Prenotazione.ora_arrivo === "") {
      this.state.errors.ora_arrivo = "Inserisci l'ora di arrivo";
      this.setState({ error: true });
    }
    if (Prenotazione.tipo_veicolo === "") {
      this.state.errors.tipo_veicolo = "Seleziona una tipologia";
      this.setState({ error: true });
    }
    if (Prenotazione.idAutista === "") {
      this.state.errors.idAutista = "Scegli se richiedere un'autista";
      this.setState({ error: true });
    }
    if (Prenotazione.dispositivo === "" || Prenotazione.dispositivo === "No") {
      this.state.errors.dispositivo =
        "E' obbligatorio accettare i termini previsti";
      this.setState({ error: true });
    }

    var datapartenza = new Date(this.state.data_partenza);
    var dataarrivo = new Date(this.state.data_arrivo);
    var today = new Date();

    var ora = today.getHours();
    if (ora < 10) {
      ora = "0" + ora;
    }
    var minuti = today.getMinutes();
    if (minuti < 10) {
      minuti = "0" + minuti;
    }
    var str = ora + ":" + minuti;
    if (
      datapartenza.getDate() === today.getDate() &&
      Prenotazione.ora_partenza < str
    ) {
      this.state.errors.ora_partenza = "Non puoi tornare indietro nel tempo";
      this.setState({ error: true });
    }
    if (datapartenza.getTime() > dataarrivo.getTime()) {
      this.state.errors.data_partenza = "Non puoi partire prima di arrivare";
      this.state.errors.data_arrivo = "Non puoi partire prima di arrivare";
      this.setState({ error: true });
    } else if (
      datapartenza.getTime() === today.getTime() &&
      Prenotazione.ora_arrivo < Prenotazione.ora_partenza
    ) {
      this.state.errors.ora_partenza = "Non puoi partire prima di arrivare";
      this.state.errors.ora_arrivo = "Non puoi partire prima di arrivare";
      this.setState({ error: true });
    }

    if (
      (Prenotazione.tipo_veicolo === "Autovettura" ||
        Prenotazione.tipo_veicolo === "Moto") &&
      this.state.numero_patente === "Nessuna" &&
      Prenotazione.idAutista === "No"
    ) {
      this.state.errors.tipo_veicolo =
        "Non hai inserito una patente valida per la tipologia di veicolo scelto";
      this.setState({ error: true });
    }
    if (
      Prenotazione.tipo_veicolo !== "Autovettura" &&
      Prenotazione.idAutista === "Sì"
    ) {
      this.state.errors.idAutista =
        "Non puoi richiedere un'utista se non scegli un tipo di veicolo autovettura";
      this.setState({ error: true });
    } else if (
      Prenotazione.tipo_veicolo === "Autovettura" &&
      Prenotazione.idAutista === "Sì" &&
      datapartenza.getDate() < today.getDate() + 3 &&
      datapartenza.getMonth() === today.getMonth() &&
      datapartenza.getFullYear() === today.getFullYear()
    ) {
      this.state.errors.idAutista =
        "Non puoi richiedere un'autista se non scegli di partire tra almeno 3 giorni";
      this.setState({ error: true });
    }

    return this.state.error;
  }

  handleSubmit = async (e) => {
    this.setState({ error: false });
    e.preventDefault();
    const Prenotazione = {
      ora_partenza: this.state.ora_partenza,
      partenza: this.state.partenza,
      ora_arrivo: this.state.ora_arrivo,
      data_partenza: this.state.data_partenza,
      data_arrivo: this.state.data_arrivo,
      destinazione: this.state.destinazione,
      tipo_veicolo: this.state.tipo_veicolo,
      idAutista: this.state.idAutista,
      dispositivo: this.state.dispositivo,
    };
    await this.validate(Prenotazione);
    /*
    var today = new Date();
    var ora = today.getHours();
    var minuti = today.getMinutes();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }
    if (ora < 10) {
      ora = "0" + ora;
    }
    if (minuti < 10) {
      minuti = "0" + minuti;
    }

    today = yyyy + "-" + mm + "-" + dd;
    var orario = ora + ":" + minuti;

    if (this.state.data_partenza == today) {
      if (this.state.ora_partenza < orario)
        this.state.errors.ora_partenza = "Errore partenza";
    }
    if (this.state.data_arrivo == today) {
      if (this.state.ora_arrivo < orario)
        this.state.errors.ora_arrivo = "Errore arrivo";
    }*/ if (this.state.error === false) {
      localStorage.setItem("idAutista", this.state.idAutista);
      localStorage.setItem("tipoVeicolo", this.state.tipo_veicolo);
      localStorage.setItem("ora_partenza", this.state.ora_partenza);
      localStorage.setItem("partenza", this.state.partenza);
      localStorage.setItem("ora_arrivo", this.state.ora_arrivo);
      localStorage.setItem("data_partenza", this.state.data_partenza);
      localStorage.setItem("data_arrivo", this.state.data_arrivo);
      localStorage.setItem("destinazione", this.state.destinazione);
      localStorage.setItem(
        "parcheggio_partenza",
        this.state.parcheggio_partenza
      );
      localStorage.setItem(
        "parcheggio_destinazione",
        this.state.parcheggio_destinazione
      );
      localStorage.setItem("idCliente", this.state.idCliente);
      window.location.href = "/ListaVeicoli";
    }
    //else(this.state.idAutista === "Sì")
    //this.props.inviaNotificheAutisti();
  };

  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;
    this.state.idCliente = user.id;
    this.state.numero_patente = user.numero_patente;
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();
    if (dd < 10) {
      dd = "0" + dd;
    }
    if (mm < 10) {
      mm = "0" + mm;
    }

    today = yyyy + "-" + mm + "-" + dd;

    return (
      <Container sm style={{ marginTop: "5rem", marginBottom: "5rem" }}>
        <div className="Form">
          <form noValidate onSubmit={this.handleSubmit}>
            <h1
              style={{
                textAlign: "center",
                color: "black",
                gridColumn: "2",
                gridRow: "2",
              }}
            >
              Nuova Prenotazione
            </h1>
            <div className="form-group">
              <label>Partenza</label>
              <input
                onChange={this.onChange}
                value={this.state.partenza}
                error={errors.partenza}
                id="partenza"
                type="text"
                placeholder="Inserisci l'indirizzo di partenza"
                className={classnames("form-control", {
                  invalid: errors.partenza,
                })}
              />
              {!this.state.error ? null : (
                <span className="red-text">{errors.partenza}</span>
              )}{" "}
            </div>
            <div className="form-group">
              <label>Data di partenza</label>
              <input
                onChange={this.onChange}
                value={this.state.data_partenza}
                error={errors.data_partenza}
                id="data_partenza"
                type="date"
                min={today}
                className={classnames("form-control", {
                  invalid: errors.data_partenza,
                })}
              />
              {!this.state.error ? null : (
                <span className="red-text">{errors.data_partenza}</span>
              )}{" "}
            </div>
            <div className="form-group">
              <label>Orario di partenza</label>
              <input
                onChange={this.onChange}
                value={this.state.ora_partenza}
                error={errors.ora_partenza}
                id="ora_partenza"
                type="time"
                className={classnames("form-control", {
                  invalid: errors.ora_partenza,
                })}
              />
              {!this.state.error ? null : (
                <span className="red-text">{errors.ora_partenza}</span>
              )}{" "}
            </div>
            <div className="form-group">
              <label>Destinazione</label>
              <input
                onChange={this.onChange}
                value={this.state.destinazione}
                error={errors.destinazione}
                id="destinazione"
                type="text"
                placeholder="Inserisci l'indirizzo di destinazione"
                className={classnames("form-control", {
                  invalid: errors.destinazione,
                })}
              />
              {!this.state.error ? null : (
                <span className="red-text">{errors.destinazione}</span>
              )}{" "}
            </div>
            <div className="form-group">
              <label>Data di arrivo</label>
              <input
                onChange={this.onChange}
                value={this.state.data_arrivo}
                error={errors.data_arrivo}
                id="data_arrivo"
                type="date"
                min={today}
                className={classnames("form-control", {
                  invalid: errors.data_arrivo,
                })}
              />
              {!this.state.error ? null : (
                <span className="red-text">{errors.data_arrivo}</span>
              )}{" "}
            </div>
            <div className="form-group">
              <label>Orario di arrivo</label>
              <input
                onChange={this.onChange}
                value={this.state.ora_arrivo}
                error={errors.ora_arrivo}
                id="ora_arrivo"
                type="time"
                required
                className={classnames("form-control", {
                  invalid: errors.ora_arrivo,
                })}
              />
              {!this.state.error ? null : (
                <span className="red-text">{errors.ora_arrivo}</span>
              )}{" "}
            </div>
            <div className="form-group">
              <label>Tipo Veicolo</label>
              <select
                onChange={this.onChange}
                value={this.state.tipo_veicolo}
                error={errors.tipo_veicolo}
                id="tipo_veicolo"
                type="text"
                className={classnames("form-control", {
                  invalid: errors.tipo_veicolo,
                })}
              >
                <option value="" disabled selected>
                  Tipo Veicolo
                </option>
                <option value="Autovettura">Autovettura</option>
                <option value="Moto">Moto</option>
                <option value="Bicicletta">Bicicletta</option>
                <option value="Monopattino">Monopattino</option>
              </select>
              {!this.state.error ? null : (
                <span className="red-text">{errors.tipo_veicolo}</span>
              )}{" "}
            </div>
            <div className="form-group">
              <label>Presenza Autista</label>
              <select
                onChange={this.onChange}
                value={this.state.idAutista}
                error={errors.idAutista}
                id="idAutista"
                type="text"
                className={classnames("form-control", {
                  invalid: errors.idAutista,
                })}
              >
                <option value="" disabled selected>
                  Presenza Autista
                </option>
                <option value="Sì">Sì</option>
                <option value="No">No</option>
              </select>
              {!this.state.error ? null : (
                <span className="red-text">{errors.idAutista}</span>
              )}{" "}
            </div>
            <div className="form-group">
              <label>
                Dichiaro di portare con me un dispositivo mobile per tutta la
                durata della corsa e di accettare le normative dell'azienda
              </label>
              <select
                onChange={this.onChange}
                value={this.state.dispositivo}
                error={errors.dispositivo}
                id="dispositivo"
                type="text"
                className={classnames("form-control", {
                  invalid: errors.dispositivo,
                })}
              >
                <option value="" disabled selected>
                  Accetto
                </option>
                <option value="Sì">Sì</option>
                <option value="No">No</option>
              </select>
              {!this.state.error ? null : (
                <span className="red-text">{errors.dispositivo}</span>
              )}{" "}
            </div>

            {/*<div className="form-check">
              <label>
                Dichiare di portare con me un dispositivo per tutta la durata
                della corsa
              </label>
              <input
                type="checkbox"
                checked={this.state.dispositivo}
                onChange={this.handleCheckClick}
                className={classnames("form-control", {
                  invalid: errors.idAutista,
                })}
                id="dispositivo"
              />
              <span className="red-text">{errors.dispositivo}</span>
            </div>
              non funziona non si sa per quale motivo*/}
            <button
              type="submit"
              value="Registrazione Log"
              className="btn btn-dark btn-lg btn-block bottone"
            >
              Avanti
            </button>
          </form>
        </div>
      </Container>
    );
  }
}

NuovaPrenotazione.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  registerPrenotazione: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {})(NuovaPrenotazione);
