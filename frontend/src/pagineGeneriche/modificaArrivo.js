import { Listaveicolidisponibili } from "../actions/veicoliActions";
import { Listaparcheggi } from "../actions/parcheggiActions";
import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  registerPrenotazione,
  modificaPrenotazione,
} from "../actions/prenotazioniActions";

//componenti da react-bootstrap
import { Container, Col, Row, Modal, Button, Card } from "react-bootstrap";

import "../App.css";
import classnames from "classnames";
import Mappa from "../../src/componenti/googlemap/mappa";

import filtriVeicoli from "../../src/utils/filtriVeicoli";

class ModificaArrivo extends Component {
  state = {
    data_arrivo: "",
    ora_arrivo: "",
    destinazione: "",
    type: false,
    error: false,
    errors: {},
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }
  setType = (tipo) => {
    this.setState({ type: "date" });
  };

  onSubmit = async (e) => {
    e.preventDefault();
    this.setState({ error: false });
    if (this.state.data_arrivo === "") {
      this.state.errors.data_arrivo = "Inserisci la data di arrivo";
      await this.setState({ error: true });
    }
    if (this.state.ora_arrivo === "") {
      this.state.errors.ora_arrivo = "Inserisci l'ora di arrivo";
      this.setState({ error: true });
    }
    if (this.state.destinazione === "") {
      this.state.errors.destinazione = "Inserisci la destinazione";
      this.setState({ error: true });
    }
    if (this.state.error === false) {
      const Prenotazione = {
        data_arrivo: this.state.data_arrivo,
        ora_arrivo: this.state.ora_arrivo,
        destinazione: this.state.destinazione,
      };
      this.props.modificaPrenotazione(
        localStorage.getItem("id_prenotazione"),
        Prenotazione
      );
      this.setState({ modalShow: true });
    }
  };
  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  render() {
    const { errors } = this.state;
    return (
      <Container fluid>
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.modalShow}
          onHide={() => this.setModalShow(false)}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Hai scelto di modificare i seguenti dati:
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container style={{ marginTop: "3rem", marginBottom: "3rem" }}>
              <Row className="justify-content-md-center">
                <Col sm={4}>
                  <h2 style={{ color: "#010101", fontSize: "18px" }}>
                    Data Arrivo: {this.state.data_arrivo}
                  </h2>
                  <h2 style={{ color: "#010101", fontSize: "18px" }}>
                    Ora Arrivo: {this.state.ora_arrivo}
                  </h2>
                  <h2 style={{ color: "#010101", fontSize: "18px" }}>
                    Destinazione: {this.state.destinazione}
                  </h2>{" "}
                  <br />
                  <h2 style={{ color: "#010101", fontSize: "18px" }}>
                    Sovraprezzo calcolato: 0
                  </h2>
                  <button
                    className="btn btn-primary btn-lg btn-block bottone"
                    onClick={() =>
                      (window.location.href = "/VisualizzaPrenotazioni")
                    }
                  >
                    Avanti
                  </button>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setModalShow(false)}>Annulla</Button>
          </Modal.Footer>
        </Modal>
        <Container sm={12} style={{ marginTop: "5rem", marginBottom: "5rem" }}>
          <div className="Form">
            <form noValidate onSubmit={this.onSubmit}>
              <h3 style={{ textAlign: "center", color: "black" }}>
                Modifica i campi
              </h3>
              <div className="form-group">
                <label htmlFor="data_arrivo">Data Arrivo</label>
                <input
                  placeholder={localStorage
                    .getItem("data_arrivo")
                    .substring(0, 10)}
                  onChange={this.onChange}
                  value={this.state.data_arrivo}
                  error={errors.data_arrivo}
                  id="data_arrivo"
                  type={this.state.type ? "date" : "text"}
                  onFocus={() => this.setType(true)}
                  className={classnames("form-control", {
                    invalid: errors.data_arrivo,
                  })}
                />
                {!this.state.error ? null : (
                  <span className="red-text">{errors.data_arrivo}</span>
                )}{" "}
              </div>
              <div className="form-group">
                <label htmlFor="destinazione">Parcheggio Destinazione</label>
                <input
                  placeholder={localStorage.getItem("destinazione")}
                  onChange={this.onChange}
                  value={this.state.destinazione}
                  error={errors.destinazione}
                  id="destinazione"
                  type="text"
                  className={classnames("form-control", {
                    invalid: errors.destinazione,
                  })}
                />
                {!this.state.error ? null : (
                  <span className="red-text">{errors.destinazione}</span>
                )}{" "}
              </div>
              <div className="form-group">
                <label htmlFor="ora_arrivo">Ora Destinazione</label>
                <input
                  placeholder={localStorage.getItem("ora_partenza")}
                  onChange={this.onChange}
                  value={this.state.ora_arrivo}
                  error={errors.ora_arrivo}
                  id="ora_arrivo"
                  type={this.state.type ? "time" : "text"}
                  onFocus={() => this.setType(true)}
                  className={classnames("form-control", {
                    invalid: errors.ora_arrivo,
                  })}
                />
                {!this.state.error ? null : (
                  <span className="red-text">{errors.ora_arrivo}</span>
                )}{" "}
              </div>
              <Row className="justify-content-md-center">
                <Col sm={3}>
                  <button
                    type="submit"
                    value="Registrazione Log"
                    className="btn btn-primary btn-lg btn-block bottone"
                  >
                    Prosegui
                  </button>
                </Col>
              </Row>
            </form>
          </div>
        </Container>
        <Row className="justify-content-md-center">
          <Mappa style={{ zIndex: "0" }} />
        </Row>
      </Container>
    );
  }
}

ModificaArrivo.propTypes = {
  modificaPrenotazione: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  listaveicolidisponibili: state.listaveicolidisponibili,
  listaparcheggi: state.listaparcheggi,
});
export default connect(mapStateToProps, {
  modificaPrenotazione,
})(ModificaArrivo);
