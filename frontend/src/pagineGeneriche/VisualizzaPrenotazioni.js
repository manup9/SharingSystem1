import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  ListaPrenotazioni,
  cancellaPrenotazione,
  modificaStatoPrenotazione2,
} from "../actions/prenotazioniActions";

//componenti da react-bootstrap
import { Container, Col, Row, Modal, Button, Alert } from "react-bootstrap";
import "../App.css";
import classnames from "classnames";

import ricercaFiltro from "../utils/ricercaFiltro";

class VisualizzaPrenotazioni extends Component {
  state = {
    tipo: "",
    filtroStato: "",
    utente: "",
    currentPrenotazione: "",
    currentTipoVeicolo: "",
    messaggioerrore: "",
    currentDataPrenotazione: "",
    currentid: "",
    messaggio: true,
    errors: {},
  };

  async componentDidMount() {
    const utente = {
      id: this.state.utente,
      ruolo: this.state.tipo,
    };
    await this.props.ListaPrenotazioni(utente);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  deletePrenotazione(id) {
    this.setState({ modalShow1: true });
    //this.props.cancellaPrenotazione(id);
  }
  modificaVeicolo(id) {
    const today = new Date();
    if (
      this.state.currentDataPrenotazione.substring(8, 10) <
      today.getDate() + 1
    ) {
      this.setState({ modalShow: false });
      this.state.messaggioerrore =
        "Non puoi modificare il veicolo, poichè la prenotazione dista meno di un giorno";
      this.setState({ showAlert: true });
    } else if (
      this.state.currentTipoVeicolo === "Bicicletta" ||
      this.state.currentTipoVeicolo === "Monopattino"
    ) {
      this.setState({ modalShow: false });
      this.state.messaggioerrore =
        "Non puoi modificare il veicolo dato che in fase di prenotazione hai scelto una bicicletto o un monopattino";
      this.setState({ showAlert: true });
    } else {
      localStorage.setItem("id_prenotazione", id);
      window.location.href = "/VeicoliLista";
    }
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  setModalShow = (input) => {
    this.setState({ modalShow: input });
  };

  render() {
    const { filtroStato, errors } = this.state;
    const { user } = this.props.auth;
    this.state.utente = user.id;
    if (user.ruolo === "Cliente") this.state.tipo = "Cliente";
    else if (user.ruolo === "Admin") this.state.tipo = "Admin";
    else if (user.ruolo === "Autista") this.state.tipo = "Autista";
    else if (user.ruolo === "Addetti") this.state.tipo = "Addetto";
    const { prenotazione } = this.props.listaprenotazioni;
    let prenotazioniFiltrate = [];
    prenotazioniFiltrate = ricercaFiltro(prenotazione, filtroStato, "stato");
    const PRLC = (
      <div className="container" style={{ marginBottom: "14rem" }}>
        <h1
          style={{
            color: "#010101",
            textAlign: "center",
            fontWeight: "bolder",
          }}
        >
          Le tue prenotazioni
        </h1>
        <div class="center" style={{ textAlign: "left" }}>
          <table class="responsive-table">
            <thead>
              <tr>
                <th>ID Veicolo</th>
                <th>Partenza</th>
                <th>Data Partenza</th>
                <th>Ora Partenza</th>
                <th>Data Arrivo</th>
                <th>Ora Arrivo</th>
                <th>Stato</th>
              </tr>
            </thead>
            <tbody>
              {prenotazioniFiltrate.map((prenotazione) => (
                <tr key={prenotazione._id}>
                  <td>{prenotazione.idVeicolo}</td>
                  <td>{prenotazione.partenza}</td>
                  <td>{prenotazione.data_partenza.substring(0, 10)}</td>
                  <td>{prenotazione.ora_partenza}</td>
                  <td>{prenotazione.data_arrivo.substring(0, 10)}</td>
                  <td>{prenotazione.ora_arrivo}</td>
                  <td>{prenotazione.stato}</td>
                  <td>
                    {" "}
                    {prenotazione.stato !== "Terminata" &&
                    prenotazione.stato !== "Annullata" ? (
                      <button
                        class="btn"
                        onClick={() => {
                          this.setModalShow(true);
                          this.state.currentPrenotazione = prenotazione._id;
                          this.state.currentTipoVeicolo =
                            prenotazione.tipo_veicolo;
                          this.state.currentDataPrenotazione =
                            prenotazione.data_partenza;
                          localStorage.setItem(
                            "data_arrivo",
                            prenotazione.data_arrivo
                          );
                          localStorage.setItem(
                            "ora_arrivo",
                            prenotazione.ora_arrivo
                          );
                          localStorage.setItem(
                            "destinazione",
                            prenotazione.partenza
                          );
                          localStorage.setItem(
                            "id_prenotazione",
                            prenotazione._id
                          );
                        }}
                      >
                        <i class="material-icons">create</i>
                      </button>
                    ) : null}
                    {prenotazione.stato !== "Terminata" &&
                    prenotazione.stato !== "Annullata" ? (
                      <button
                        class="btn"
                        onClick={() => {
                          this.deletePrenotazione(prenotazione._id);
                          this.setState({ currentid: prenotazione._id });
                        }}
                      >
                        <i class="material-icons">delete</i>
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
    const PRLA = (
      <div className="container" style={{ marginBottom: "14rem" }}>
        <h1
          style={{
            color: "#010101",
            textAlign: "center",
            fontWeight: "bolder",
          }}
        >
          Le prenotazioni di tutti i clienti
        </h1>
        <div class="center" style={{ textAlign: "left" }}>
          <table class="responsive-table">
            <thead>
              <tr>
                <th>ID Cliente</th>
                <th>Partenza</th>
                <th>Data Partenza</th>
                <th>Ora Partenza</th>
                <th>Data Arrivo</th>
                <th>Ora Arrivo</th>
                <th>Parcheggio Destinazione</th>
                <th>Autista</th>
                <th>Stato</th>
              </tr>
            </thead>
            <tbody>
              {prenotazioniFiltrate.map((prenotazione) => (
                <tr key={prenotazione._id}>
                  <td>{prenotazione.idCliente}</td>
                  <td>{prenotazione.partenza}</td>
                  <td>{prenotazione.data_partenza}</td>
                  <td>{prenotazione.ora_partenza}</td>
                  <td>{prenotazione.data_arrivo}</td>
                  <td>{prenotazione.ora_arrivo}</td>
                  <td>{prenotazione.parcheggio_destinazione}</td>
                  <td>{prenotazione.idAutista}</td>
                  <td>{prenotazione.stato}</td>
                  <td>
                    {" "}
                    {prenotazione.stato !== "Terminata" ? (
                      <button
                        class="btn"
                        onClick={() => console.log(prenotazione.destinazione)}
                      >
                        <i class="material-icons">create</i>
                      </button>
                    ) : null}
                    {prenotazione.stato !== "Terminata" ? (
                      <button
                        class="btn"
                        onClick={() => console.log(prenotazione.destinazione)}
                      >
                        <i class="material-icons">delete</i>
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
    const PRLAD = (
      <div className="container" style={{ marginBottom: "14rem" }}>
        <h1
          style={{
            color: "#010101",
            textAlign: "center",
            fontWeight: "bolder",
          }}
        >
          Le prenotazioni per il tuo Parcheggio
        </h1>
        <div class="center" style={{ textAlign: "left" }}>
          <table class="responsive-table">
            <thead>
              <tr>
                <th>ID Cliente</th>
                <th>Partenza</th>
                <th>Data Partenza</th>
                <th>Ora Partenza</th>
                <th>Data Arrivo</th>
                <th>Ora Arrivo</th>
                <th>Parcheggio Destinazione</th>
                <th>Autista</th>
                <th>Stato</th>
              </tr>
            </thead>
            <tbody>
              {prenotazioniFiltrate.map((prenotazione) => (
                <tr key={prenotazione._id}>
                  <td>{prenotazione.idCliente}</td>
                  <td>{prenotazione.partenza}</td>
                  <td>{prenotazione.data_partenza}</td>
                  <td>{prenotazione.ora_partenza}</td>
                  <td>{prenotazione.data_arrivo}</td>
                  <td>{prenotazione.ora_arrivo}</td>
                  <td>{prenotazione.parcheggio_destinazione}</td>
                  <td>{prenotazione.idAutista}</td>
                  <td>{prenotazione.stato}</td>
                  <td>
                    {" "}
                    {prenotazione.stato !== "Terminata" ? (
                      <button
                        class="btn"
                        onClick={() => console.log(prenotazione.destinazione)}
                      >
                        <i class="material-icons">create</i>
                      </button>
                    ) : null}
                    {prenotazione.stato !== "Terminata" ? (
                      <button
                        class="btn"
                        onClick={() => console.log(prenotazione.destinazione)}
                      >
                        <i class="material-icons">delete</i>
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
    const PRLAU = (
      <div className="container" style={{ marginBottom: "14rem" }}>
        <h1
          style={{
            color: "#010101",
            textAlign: "center",
            fontWeight: "bolder",
          }}
        >
          Le prenotazioni che hai accettato
        </h1>
        <div class="center" style={{ textAlign: "left" }}>
          <table class="responsive-table">
            <thead>
              <tr>
                <th>ID Cliente</th>
                <th>Partenza</th>
                <th>Data Partenza</th>
                <th>Ora Partenza</th>
                <th>Data Arrivo</th>
                <th>Ora Arrivo</th>
                <th>Parcheggio Destinazione</th>
                <th>Autista</th>
                <th>Stato</th>
              </tr>
            </thead>
            <tbody>
              {prenotazioniFiltrate.map((prenotazione) => (
                <tr key={prenotazione._id}>
                  <td>{prenotazione.idCliente}</td>
                  <td>{prenotazione.partenza}</td>
                  <td>{prenotazione.data_partenza}</td>
                  <td>{prenotazione.ora_partenza}</td>
                  <td>{prenotazione.data_arrivo}</td>
                  <td>{prenotazione.ora_arrivo}</td>
                  <td>{prenotazione.parcheggio_destinazione}</td>
                  <td>{prenotazione.idAutista}</td>
                  <td>{prenotazione.stato}</td>
                  <td>
                    {" "}
                    {prenotazione.stato !== "Terminata" ? (
                      <button
                        class="btn"
                        onClick={() => console.log(prenotazione.destinazione)}
                      >
                        <i class="material-icons">create</i>
                      </button>
                    ) : null}
                    {prenotazione.stato !== "Terminata" ? (
                      <button
                        class="btn"
                        onClick={() => console.log(prenotazione.destinazione)}
                      >
                        <i class="material-icons">delete</i>
                      </button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );

    if (user.ruolo === "Admin") {
      return (
        <Container fluid style={{ marginTop: "3rem", marginBottom: "39rem" }}>
          <div className="row">
            {prenotazione.length === 0 ? "Non ci sono prenotazioni" : PRLA}
          </div>
        </Container>
      );
    } else if (user.ruolo === "Cliente") {
      return (
        <Container fluid style={{ marginTop: "3rem", marginBottom: "39rem" }}>
          {this.state.messaggio ? null : (
            <Alert variant="success">
              Hai annullato la prenotazione!
              <Alert.Link href="/VisualizzaPrenotazioni">
                {" "}
                Premi qui{" "}
              </Alert.Link>
              per visualizzare il cambiamento
            </Alert>
          )}
          {this.state.showAlert ? (
            <Alert variant="danger">{this.state.messaggioerrore}</Alert>
          ) : null}
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
                Scegli cosa modificare
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container style={{ marginTop: "3rem", marginBottom: "3rem" }}>
                <Row className="justify-content-md-center">
                  <Col sm={4}>
                    <button
                      value="Registrazione Log"
                      className="btn btn-primary btn-lg btn-block bottone"
                      onClick={() =>
                        this.modificaVeicolo(this.state.currentPrenotazione)
                      }
                    >
                      Modifica Veicolo
                    </button>
                  </Col>
                  <Col sm={4}>
                    <button
                      value="Registrazione Log"
                      className="btn btn-primary btn-lg btn-block bottone"
                      onClick={() => {
                        localStorage.setItem(
                          "id_prenotazione",
                          this.state.currentPrenotazione
                        );
                        window.location.href = "/ModificaArrivo";
                      }}
                    >
                      Modifica Arrivo
                    </button>
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.setModalShow(false)}>Annulla</Button>
            </Modal.Footer>
          </Modal>
          <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.modalShow1}
            onHide={() => this.setModalShow(false)}
            backdrop="static"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Sei sicuro di voler cancellare questa prenotazione?
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container style={{ marginTop: "3rem", marginBottom: "3rem" }}>
                <Row className="justify-content-md-center">
                  <Col sm={4}>
                    <button
                      value="Registrazione Log"
                      className="btn btn-dark btn-lg btn-block bottone"
                      onClick={() => {
                        const prenotazione = {
                          stato: "Annullata",
                        };
                        this.props.modificaStatoPrenotazione2(
                          this.state.currentid,
                          prenotazione
                        );
                        this.setState({ modalShow1: false });
                        this.setState({ messaggio: false });
                        window.location.reload();
                        this.setState({ messaggio: false });
                      }}
                    >
                      Conferma
                    </button>
                  </Col>
                  <Col sm={4}>
                    <button
                      value="Registrazione Log"
                      className="btn btn-primary btn-lg btn-block bottone"
                      onClick={() => {
                        localStorage.setItem(
                          "id_prenotazione",
                          this.state.currentPrenotazione
                        );
                        window.location.href = "/ModificaArrivo";
                      }}
                    >
                      Annulla
                    </button>
                  </Col>
                </Row>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.setState({ modalShow1: false })}>
                Annulla
              </Button>
            </Modal.Footer>
          </Modal>
          <Row className="justify-content-md-center">
            <Col sm={3}>
              <div className="form-group">
                <label htmlFor="stato">Stato</label>
                <input
                  onChange={(event) =>
                    this.handleChange("filtroStato", event.target.value)
                  }
                  id="stato"
                  type="text"
                />
              </div>
            </Col>
          </Row>
          <div className="row">
            {prenotazione.length === 0 ? "Non ci sono prenotazioni" : PRLC}
          </div>
        </Container>
      );
    } else if (user.ruolo === "Autista") {
      return (
        <Container fluid style={{ marginTop: "3rem", marginBottom: "39rem" }}>
          <div className="row">
            {prenotazione.length === 0 ? "Non ci sono prenotazioni" : PRLAU}
          </div>
        </Container>
      );
    } else if (user.ruolo === "Addetto") {
      return (
        <Container fluid style={{ marginTop: "3rem", marginBottom: "39rem" }}>
          <div className="row">
            {prenotazione.length === 0 ? "Non ci sono prenotazioni" : PRLAD}
          </div>
        </Container>
      );
    }
  }
}

VisualizzaPrenotazioni.propTypes = {
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  listaprenotazioni: PropTypes.object.isRequired,
  ListaPrenotazioni: PropTypes.func.isRequired,
  cancellaPrenotazione: PropTypes.func.isRequired,
  modificaStatoPrenotazione2: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  listaprenotazioni: state.listaprenotazioni,
});
export default connect(mapStateToProps, {
  ListaPrenotazioni,
  cancellaPrenotazione,
  modificaStatoPrenotazione2,
})(withRouter(VisualizzaPrenotazioni));
