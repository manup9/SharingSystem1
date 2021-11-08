import { Listaveicolidisponibili } from "../../actions/veicoliActions";
import { Listaparcheggi } from "../../actions/parcheggiActions";
import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import { registerPrenotazione } from "../../actions/prenotazioniActions";

//componenti da react-bootstrap
import { Container, Col, Row, Modal, Button, Card } from "react-bootstrap";

import "../../App.css";
import classnames from "classnames";
import Mappa from "../googlemap/mappa";

import filtriVeicoli from "../../utils/filtriVeicoli";

class InserimentoParcheggio extends Component {
  state = {
    parcheggio_destinazione: "",
    parcheggio_partenza: "",
    errors: {},
  };

  async componentDidMount() {
    await this.props.Listaparcheggi();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  registraPreotazione() {
    const newPrenotazione = {
      ora_partenza: localStorage.getItem("ora_partenza"),
      partenza: localStorage.getItem("partenza"),
      ora_arrivo: localStorage.getItem("ora_arrivo"),
      data_partenza: localStorage.getItem("data_partenza"),
      data_arrivo: localStorage.getItem("data_arrivo"),
      destinazione: localStorage.getItem("destinazione"),
      parcheggio_partenza: this.state.parcheggio_partenza,
      parcheggio_destinazione: this.state.parcheggio_destinazione,
      tipo_veicolo: localStorage.getItem("tipoVeicolo"),
      idVeicolo: localStorage.getItem("idVeicolo"),
      idCliente: localStorage.getItem("idCliente"),
      idAutista: localStorage.getItem("idAutista"),
      stato: "Incompleta",
    };
    this.props.registerPrenotazione(newPrenotazione, this.props.history);
    window.location.href = "/RiepilogoPrenotazione";
  }

  render() {
    const { filtroTipo, filtroParcheggio, filtroID, errors } = this.state;
    const { parcheggio } = this.props.listaparcheggi;
    let veicoliFiltrati = [];
    const { veicolo } = this.props.listaveicolidisponibili;
    let stile = "";
    veicoliFiltrati = filtriVeicoli(veicolo, filtroTipo, "tipo");
    veicoliFiltrati = filtriVeicoli(veicoliFiltrati, filtroID, "_id");
    if (localStorage.getItem("posizioneVeicolo").startsWith("6")) stile = "Sì";
    else stile = "No";

    const PL = (
      <div className="container">
        <div class="center" style={{ textAlign: "left" }}>
          <table class="responsive-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Indirizzo</th>
                <th>Numero Civico</th>
                <th>Seleziona</th>
              </tr>
            </thead>
            <tbody>
              {parcheggio.map((parcheggio) => (
                <tr key={parcheggio._id}>
                  <td>{parcheggio.nome}</td>
                  <td>{parcheggio.indirizzo}</td>
                  <td>{parcheggio.numero_civico}</td>
                  <td>
                    <button
                      class="btn btn-primary btn-lg btn-block bottone"
                      onClick={() => {
                        this.state.parcheggio_partenza = parcheggio.indirizzo;
                        localStorage.setItem(
                          "parcheggio_partenza",
                          this.state.parcheggio_partenza
                        );
                        window.location.reload();
                      }}
                    >
                      Seleziona
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
    const PL2 = (
      <div className="container">
        <div class="center" style={{ textAlign: "left" }}>
          <table class="responsive-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Indirizzo</th>
                <th>Numero Civico</th>
                <th>Seleziona</th>
              </tr>
            </thead>
            <tbody>
              {parcheggio.map((parcheggio) => (
                <tr key={parcheggio._id}>
                  <td>{parcheggio.nome}</td>
                  <td>{parcheggio.indirizzo}</td>
                  <td>{parcheggio.numero_civico}</td>
                  <td>
                    <button
                      class="btn btn-primary btn-lg btn-block bottone"
                      onClick={() => {
                        this.state.parcheggio_destinazione =
                          parcheggio.indirizzo;
                        localStorage.setItem(
                          "parcheggio_destinazione",
                          this.state.parcheggio_destinazione
                        );
                        window.location.reload();
                      }}
                    >
                      Seleziona
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
    console.log(localStorage.getItem("Parcheggio_partenza"));

    switch (stile) {
      case "Sì": //veicolo in un parcheggio
        return (
          <Container fluid>
            <Row className="justify-content-md-center">
              <Mappa style={{ zIndex: "0" }} />
            </Row>
            <Row className="justify-content-md-center">
              <Col sm={6}>
                <h1
                  style={{
                    color: "#010101",
                    textAlign: "center",
                    fontWeight: "bolder",
                    fontSize: "30px",
                  }}
                >
                  Parcheggio Partenza:{" "}
                  {localStorage.getItem("parcheggio_partenza")}
                </h1>
                {parcheggio.length === 0 ? "Non ci sono parcheggi" : PL}
              </Col>
              <Col sm={6}>
                {" "}
                <h1
                  style={{
                    color: "#010101",
                    textAlign: "center",
                    fontWeight: "bolder",
                    fontSize: "30px",
                  }}
                >
                  Parcheggio Destinazione:{" "}
                  {localStorage.getItem("parcheggio_destinazione")}
                </h1>
                <h1
                  style={{
                    color: "#010101",
                    textAlign: "center",
                    fontWeight: "bolder",
                    fontSize: "30px",
                  }}
                  id="parcheggiodestinazione"
                ></h1>
                {parcheggio.length === 0 ? "Non ci sono parcheggi" : PL2}
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col sm={4}>
                <button
                  class="btn btn-primary btn-lg btn-block bottone"
                  onClick={() => this.registraPreotazione()}
                >
                  Completa Operazione
                </button>
              </Col>
            </Row>
          </Container>
        );
      case "No": {
        return (
          <Container fluid>
            <Row className="justify-content-md-center">
              <Mappa style={{ zIndex: "0" }} />
            </Row>
            <Row>
              <Col sm={6}>
                {" "}
                <h1
                  style={{
                    color: "#010101",
                    textAlign: "center",
                    fontWeight: "bolder",
                    fontSize: "30px",
                  }}
                >
                  Parcheggio Destinazione:{" "}
                  {localStorage.getItem("parcheggio_destinazione")}
                </h1>
                <h1
                  style={{
                    color: "#010101",
                    textAlign: "center",
                    fontWeight: "bolder",
                    fontSize: "30px",
                  }}
                  id="parcheggiodestinazione"
                ></h1>
                {parcheggio.length === 0 ? "Non ci sono parcheggi" : PL2}
              </Col>
            </Row>
            <Row className="justify-content-md-center">
              <Col sm={4}>
                <button
                  class="btn btn-primary btn-lg btn-block bottone"
                  onClick={() => this.registraPreotazione()}
                >
                  Completa Operazione
                </button>
              </Col>
            </Row>
          </Container>
        );
      }
    }
  }
}

InserimentoParcheggio.propTypes = {
  Listaveicolidisponibili: PropTypes.func.isRequired,
  registerPrenotazione: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  listaveicolidisponibili: PropTypes.object.isRequired,
  listaparcheggi: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  listaveicolidisponibili: state.listaveicolidisponibili,
  listaparcheggi: state.listaparcheggi,
});
export default connect(mapStateToProps, {
  Listaveicolidisponibili,
  Listaparcheggi,
  registerPrenotazione,
})(InserimentoParcheggio);
