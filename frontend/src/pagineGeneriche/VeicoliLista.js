import { Listaveicolidisponibili } from "../actions/veicoliActions";
import React, { Component } from "react";
import { inviaNotificheAutisti } from "../actions/prenotazioniActions";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

//componenti da react-bootstrap
import { Container, Col, Row, Modal, Button, Card } from "react-bootstrap";

import "../App.css";
import classnames from "classnames";

import filtriVeicoli from "../utils/filtriVeicoli";

class VeicoliLista extends Component {
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

  aggiungiVeicolo() {
    window.location.href = "/VisualizzaPrenotazioni";
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
                    onClick={() => this.aggiungiVeicolo()}
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

VeicoliLista.propTypes = {
  Listaveicolidisponibili: PropTypes.func.isRequired,
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
})(VeicoliLista);
