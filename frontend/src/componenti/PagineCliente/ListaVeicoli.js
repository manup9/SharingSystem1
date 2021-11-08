import { Listaveicolidisponibili } from "../../actions/veicoliActions";
import React, { Component } from "react";
import { inviaNotificheAutisti } from "../../actions/prenotazioniActions";
import {
  modificaStatoPrenotazione,
  registerPrenotazione,
} from "../../actions/prenotazioniActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

//componenti da react-bootstrap
import { Container, Col, Row, Modal, Button, Card } from "react-bootstrap";

import "../../App.css";
import classnames from "classnames";

import filtriVeicoli from "../../utils/filtriVeicoli";

class ListaVeicoli extends Component {
  state = {
    errors: {},
    filtroModello: "",
    filtroCilindrata: "",
    id_utente: "",
    nome_utente: "",
    cognome_utente: "",
    prenotazione: "",
    current_id: "",
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  aggiungiVeicolo(idVeicolo, posizione, modello, marca, prezzo_feriale) {
    localStorage.setItem("idVeicolo", idVeicolo);
    localStorage.setItem("posizioneVeicolo", posizione);
    localStorage.setItem("modelloveicolo", modello);
    localStorage.setItem("marcaveicolo", marca);
    localStorage.setItem("prezzo", prezzo_feriale);
    if (localStorage.getItem("idAutista") === "No")
      window.location.href = "/InserimentoParcheggio";
    else if (localStorage.getItem("idAutista") === "Sì") {
      const newPrenotazione1 = {
        ora_partenza: localStorage.getItem("ora_partenza"),
        partenza: localStorage.getItem("partenza"),
        ora_arrivo: localStorage.getItem("ora_arrivo"),
        data_partenza: localStorage.getItem("data_partenza"),
        data_arrivo: localStorage.getItem("data_arrivo"),
        destinazione: localStorage.getItem("destinazione"),
        parcheggio_partenza: "",
        parcheggio_destinazione: "",
        tipo_veicolo: localStorage.getItem("tipoVeicolo"),
        idVeicolo: localStorage.getItem("idVeicolo"),
        idCliente: localStorage.getItem("idCliente"),
        idAutista: localStorage.getItem("idAutista"),
        stato: "Incompleta",
      };
      this.props.registerPrenotazione(newPrenotazione1, this.props.history);
      const NewPrenotazione = {
        id_utente: this.state.id_utente,
        nome_utente: this.state.nome_utente,
        cognome_utente: this.state.cognome_utente,
        partenza: localStorage.getItem("partenza"),
        destinazione: localStorage.getItem("destinazione"),
        ora_partenza: localStorage.getItem("ora_partenza"),
        data_partenza: localStorage.getItem("data_partenza"),
      };
      this.props.inviaNotificheAutisti(NewPrenotazione);
    }
  }

  async componentDidMount() {
    const Veicolo = {
      tipo: localStorage.getItem("tipoVeicolo"),
    };
    await this.props.Listaveicolidisponibili(
      localStorage.getItem("tipoVeicolo"),
      Veicolo
    );
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = async (e) => {
    await this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
  };

  render() {
    const { filtroModello, filtroCilindrata, errors } = this.state;
    let veicoliFiltrati = [];
    const { user } = this.props.auth;
    this.state.id_utente = user.id;
    this.state.nome_utente = user.nome;
    this.state.cognome_utente = user.cognome;
    const { veicolo } = this.props.listaveicolidisponibili;
    veicoliFiltrati = filtriVeicoli(veicolo, filtroModello, "modello");
    veicoliFiltrati = filtriVeicoli(
      veicoliFiltrati,
      filtroCilindrata,
      "cilindrata"
    );
    const VL = (
      <Container sm={12} style={{ marginBottom: "21rem" }}>
        <div
          class="center"
          style={{ textAlign: "left", display: "flex", flexWrap: "wrap" }}
        >
          {veicoliFiltrati.map((veicolo) => (
            <Card style={{ width: "18rem" }}>
              <Card.Body>
                <Card.Title>{veicolo.marca}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {veicolo.modello}
                </Card.Subtitle>
                <Card.Subtitle className="mb-2 text-muted">
                  {veicolo.prezzo_feriale + "€/ora"}
                </Card.Subtitle>
                <Card.Text>{veicolo.descrizione}</Card.Text>
                <Card.Link>
                  {" "}
                  <button
                    class="btn btn-primary btn-lg btn-block bottone"
                    onClick={() =>
                      this.aggiungiVeicolo(
                        veicolo._id,
                        veicolo.id_parcheggio,
                        veicolo.modello,
                        veicolo.marca,
                        veicolo.prezzo_feriale
                      )
                    }
                  >
                    Prosegui
                  </button>
                </Card.Link>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    );
    return (
      <Container fluid style={{ marginBottom: "3rem" }}>
        <Container sm={12}>
          <Row>
            <Col sm>
              <div className="form-group">
                <label htmlFor="modello">Modello</label>
                <input
                  onChange={(event) =>
                    this.handleChange("filtroModello", event.target.value)
                  }
                  id="modello"
                  type="text"
                />
              </div>
            </Col>
            <Col sm>
              <div className="form-group">
                <label htmlFor="cilindrata">Cilindrata</label>
                <input
                  onChange={(event) =>
                    this.handleChange("filtroCilindrata", event.target.value)
                  }
                  id="cilindrata"
                  type="text"
                />
              </div>
            </Col>
          </Row>
          <h1
            style={{
              color: "#010101",
              fontWeight: "bold",
              fontSize: "25px",
              textAlign: "center",
            }}
          >
            VEICOLI DISPONIBILI
          </h1>
          {veicolo.length === 0
            ? "Non ci sono veicoli per la tipologia scelta disponibili"
            : VL}
        </Container>
      </Container>
    );
  }
}

ListaVeicoli.propTypes = {
  Listaveicolidisponibili: PropTypes.func.isRequired,
  registerPrenotazione: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  listaveicolidisponibili: PropTypes.object.isRequired,
  inviaNotificheAutisti: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  listaveicolidisponibili: state.listaveicolidisponibili,
});
export default connect(mapStateToProps, {
  Listaveicolidisponibili,
  inviaNotificheAutisti,
  registerPrenotazione,
})(ListaVeicoli);
