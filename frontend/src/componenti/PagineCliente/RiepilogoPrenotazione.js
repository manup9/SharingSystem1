import { Listaveicolidisponibili } from "../../actions/veicoliActions";
import { registerPrenotazione } from "../../actions/prenotazioniActions";
import { Listaparcheggi } from "../../actions/parcheggiActions";
import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

//componenti da react-bootstrap
import {
  Container,
  Col,
  Row,
  Modal,
  Button,
  Card,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";

import "../../App.css";

class RiepilogoPrenotazione extends Component {
  state = {
    errors: {},
  };

  onChange = async (e) => {
    await this.setState({ [e.target.id]: e.target.value });
  };

  registraPreotazione() {
    localStorage.setItem("parcheggio_partenza", this.state.parcheggio_partenza);
    localStorage.setItem(
      "parcheggio_destinazione",
      this.state.parcheggio_destinazione
    );
    const newPrenotazione = {
      ora_partenza: localStorage.getItem("ora_partenza"),
      partenza: localStorage.getItem("partenza"),
      ora_arrivo: localStorage.getItem("ora_arrivo"),
      ora_partenza: localStorage.getItem("ora_partenza"),
      data_partenza: localStorage.getItem("data_partenza"),
      data_arrivo: localStorage.getItem("data_arrivo"),
      destinazione: localStorage.getItem("destinazione"),
      parcheggio_partenza: this.state.parcheggio_partenza,
      parcheggio_destinazione: this.state.parcheggio_destinazione,
      tipo_veicolo: localStorage.getItem("tipoVeicolo"),
      idVeicolo: localStorage.getItem("idVeicolo"),
      idCliente: localStorage.getItem("idCliente"),
      idAutista: localStorage.getItem("idAutista"),
    };
    this.props.registerPrenotazione(newPrenotazione, this.props.history);
    window.location.href = "/SchermataPagamento";
  }

  render() {
    let stile = "";
    if (
      localStorage.getItem("parcheggio_partenza") === "" &&
      localStorage.getItem("parcheggio_destinazione") === ""
    )
      stile = "ConAutista";
    else if (
      localStorage.getItem(
        localStorage.getItem("parcheggio_partenza") !== "" &&
          localStorage.getItem("parcheggio_destinazione") === ""
      )
    )
      stile = "SenzaAutistaFuoriParcheggio";
    else stile = "SenzaAutistaInParcheggio";
    switch (stile) {
      case "SenzaAutistaInParcheggio": //se il cliente sleziona una corsa senza autista e un veicolo in un parcheggio
        return (
          <Container
            fluid
            sm={12}
            style={{ marginTop: "5rem", marginBottom: "15rem" }}
          >
            <Row className="justify-content-md-center">
              <Col sm={6}>
                <ListGroup as="ul">
                  <ListGroup.Item
                    as="li"
                    active
                    style={{
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontSize: "30px",
                    }}
                  >
                    RIEPILOGO
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    Veicolo: {localStorage.getItem("marcaveicolo")}{" "}
                    {localStorage.getItem("modelloveicolo")}{" "}
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    Data Partenza: {localStorage.getItem("data_partenza")}, Ora
                    Partenza: {localStorage.getItem("ora_partenza")}
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    Data Arrivo: {localStorage.getItem("data_arrivo")} , Ora
                    Arrivo: {localStorage.getItem("ora_arrivo")}
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    Parcheggio Partenza:{" "}
                    {localStorage.getItem("parcheggio_partenza")}, Parcheggio
                    Destinazione:{" "}
                    {localStorage.getItem("parcheggio_destinazione")}{" "}
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    Prezzo: {localStorage.getItem("prezzo") + "€"}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            <br />
            <br />
            <Row className="justify-content-md-center">
              <Col sm={3}>
                <Link to="/SchermataPagamento">
                  <button className="btn btn-primary btn-lg btn-block bottone">
                    Procedi al pagamento
                  </button>
                </Link>
              </Col>
            </Row>
          </Container>
        );
      case "SenzaAutistaFuoriParcheggio": //se il cliente seleziona una corsa senza autista e un veicolo fuori parhceggio
        return (
          <Container
            fluid
            sm={12}
            style={{ marginTop: "5rem", marginBottom: "15rem" }}
          >
            <Row className="justify-content-md-center">
              <Col sm={6}>
                <ListGroup as="ul">
                  <ListGroup.Item
                    as="li"
                    active
                    style={{
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontSize: "30px",
                    }}
                  >
                    RIEPILOGO
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    Veicolo: {localStorage.getItem("marcaveicolo")}{" "}
                    {localStorage.getItem("modelloveicolo")}{" "}
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    Data Partenza: {localStorage.getItem("data_partenza")}, Ora
                    Partenza: {localStorage.getItem("ora_partenza")}
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    Data Arrivo: {localStorage.getItem("data_arrivo")} , Ora
                    Arrivo: {localStorage.getItem("ora_arrivo")}
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    Partenza: {localStorage.getItem("partenza")}, Parcheggio
                    Destinazione:{" "}
                    {localStorage.getItem("parcheggio_destinazione")}{" "}
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    Prezzo: {localStorage.getItem("prezzo") + "€"}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            <br />
            <br />
            <Row className="justify-content-md-center">
              <Col sm={3}>
                <Link to="/SchermataPagamento">
                  <button className="btn btn-primary btn-lg btn-block bottone">
                    Procedi al pagamento
                  </button>
                </Link>
              </Col>
            </Row>
          </Container>
        );
      case "ConAutista": //se il cliente seleziona una corsa con autista
        return (
          <Container
            fluid
            sm={12}
            style={{ marginTop: "5rem", marginBottom: "15rem" }}
          >
            <Row className="justify-content-md-center">
              <Col sm={6}>
                <ListGroup as="ul">
                  <ListGroup.Item
                    as="li"
                    active
                    style={{
                      textAlign: "center",
                      fontWeight: "bolder",
                      fontSize: "30px",
                    }}
                  >
                    RIEPILOGO
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    Veicolo: {localStorage.getItem("marcaveicolo")}{" "}
                    {localStorage.getItem("modelloveicolo")}{" "}
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    Data Partenza: {localStorage.getItem("data_partenza")}, Ora
                    Partenza: {localStorage.getItem("ora_partenza")}
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    Data Arrivo: {localStorage.getItem("data_arrivo")} , Ora
                    Arrivo: {localStorage.getItem("ora_arrivo")}
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    Partenza: {localStorage.getItem("partenza")}, Destinazione:{" "}
                    {localStorage.getItem("destinazione")}{" "}
                  </ListGroup.Item>
                  <ListGroup.Item as="li">
                    Prezzo: {localStorage.getItem("prezzo") + "€"}
                  </ListGroup.Item>
                </ListGroup>
              </Col>
            </Row>
            <br />
            <br />
            <Row className="justify-content-md-center">
              <Col sm={3}>
                <Link to="/SchermataPagamento">
                  <button className="btn btn-primary btn-lg btn-block bottone">
                    Procedi al pagamento
                  </button>
                </Link>
              </Col>
            </Row>
          </Container>
        );
    }
  }
}

RiepilogoPrenotazione.propTypes = {
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
})(RiepilogoPrenotazione);
