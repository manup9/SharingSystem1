import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, setCurrentUser } from "../actions/authAutentications";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import LockIcon from "@material-ui/icons/Lock";
import BuildIcon from "@material-ui/icons/Build";
import { Link, withRouter } from "react-router-dom";
import {
  ListaPrenotazioni,
  cancellaPrenotazione,
  modificaStatoPrenotazione2,
  modificaStatoPrenotazione,
} from "../actions/prenotazioniActions";
import "../App.css";
import {
  Container,
  Col,
  Row,
  Modal,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import Mappa from "../../src/componenti/googlemap/mappa";
import classnames from "classnames";

class GestioneCorsa extends Component {
  constructor(props) {
    super();
    this.state = {
      error: false,
      prenotazione_in_corso: false,
      idVeicolo: "",
      error2: false,
      messaggio: false,
      messaggio2: false,
    };
  }

  consegna() {
    const prenotazione = {
      statoiniziale: "Pagata",
      stato: "In-Corso",
    };
    if (this.state.idVeicolo === "60f3445a1055ff1cac9afb11") {
      this.props.modificaStatoPrenotazione(prenotazione);
      this.setState({ modalShow: false });
      this.setState({ messaggio: true });
      this.setState({ prenotazione_in_corso: true });
    } else this.setState({ error2: true });
  }

  controllaprenotazioneUno() {
    if (this.state.prenotazione_in_corso === false) {
      this.setState({ error: true });
    } else {
      const prenotazione = {
        statoiniziale: "In-Corso",
        stato: "Terminata",
      };
      this.setState({ messaggio2: true });
      this.setState({ prenotazione_in_corso: false });
      this.props.modificaStatoPrenotazione(prenotazione);
    }
  }

  controllaprenotazioneDue() {
    if (this.state.prenotazione_in_corso === false) {
      this.setState({ error: true });
    } else this.props.comunicaGuasto();
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    const { errors } = this.state;
    if (user.ruolo === "Admin" || user.ruolo === "Addetto") {
      return <div></div>;
    } else if (user.ruolo === "Cliente" || user.ruolo === "Autista") {
      return (
        <Container fluid style={{ backgroundColor: "#010101" }}>
          <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.modalShow}
            onHide={() => this.setState({ modalShow: false })}
            backdrop="static"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Inserisci il codice identificativo del veicolo
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className="form-group">
                <label htmlFor="idVeicolo">Codice identificativo veicolo</label>
                <input
                  onChange={this.onChange}
                  value={this.state.idVeicolo}
                  id="idVeicolo"
                />
                {!this.state.error2 ? null : (
                  <span className="red-text">
                    Hai inserito un codice identificativo errato o il veicolo
                    non ha una prenotazione in questo momento
                  </span>
                )}{" "}
              </div>
              <Button onClick={() => this.consegna()}>Avanti</Button>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.setState({ modalShow: false })}>
                Annulla
              </Button>
            </Modal.Footer>
          </Modal>
          {this.state.error ? (
            <Row
              className="justify-content-md-center"
              style={{ display: "block" }}
            >
              <Alert
                variant="danger"
                style={{
                  zIndex: "1000",
                  justifyItems: "center",
                  width: "400rem",
                  fontWeight: "bolder",
                }}
              >
                Non hai una prenotazione in corso
              </Alert>
            </Row>
          ) : null}
          {this.state.messaggio ? (
            <Row
              className="justify-content-md-center"
              style={{ display: "block" }}
            >
              <Alert
                variant="success"
                style={{
                  zIndex: "1000",
                  justifyItems: "center",
                  width: "400rem",
                  fontWeight: "bolder",
                }}
              >
                Hai avviato la corsa!
              </Alert>
            </Row>
          ) : null}
          {this.state.messaggio2 ? (
            <Row
              className="justify-content-md-center"
              style={{ display: "block" }}
            >
              <Alert
                variant="success"
                style={{
                  zIndex: "1000",
                  justifyItems: "center",
                  width: "400rem",
                  fontWeight: "bolder",
                }}
              >
                Hai terminato correttamente la corsa!
              </Alert>
            </Row>
          ) : null}
          <Row className="justify-content-md-center">
            <Col sm={3}>
              <button
                class="btn btn-primary btn-lg btn-block bottone"
                onClick={() => this.setState({ modalShow: true })}
              >
                Consegna
              </button>
              <br />
            </Col>
            <Col sm={3}>
              <button
                class="btn btn-primary btn-lg btn-block bottone"
                onClick={() => this.controllaprenotazioneUno()}
              >
                Rilascio
              </button>
              <br />
            </Col>
            <Col sm={3}>
              <button
                class="btn btn-primary btn-lg btn-block bottone"
                onClick={() => this.controllaprenotazioneDue()}
              >
                Comunica Guasto
              </button>
              <br />
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Mappa style={{ zIndex: "0" }} />
          </Row>
        </Container>
      );
    }
  }
}
GestioneCorsa.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  modificaStatoPrenotazione: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  logoutUser,
  modificaStatoPrenotazione,
})(GestioneCorsa);
