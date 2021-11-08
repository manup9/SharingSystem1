import React, { Component } from "react";
import { inviaNotificheAutisti } from "../actions/prenotazioniActions";
import { ListaNotifiche } from "../actions/notificheActions";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  inviaNotificaCliente,
  cancellaNotifica,
} from "../actions/notificheActions";

//componenti da react-bootstrap
import {
  Container,
  Col,
  Row,
  Modal,
  Button,
  Card,
  Toast,
} from "react-bootstrap";

import Logo from "../immagini/logo1.png";

import "../App.css";
import classnames from "classnames";

class NotificheLista extends Component {
  state = {
    errors: {},
    id: "",
    ruolo: "",
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  accettaNotifica(id, utente) {
    this.props.inviaNotificaCliente(utente);
    this.props.cancellaNotifica(id);
    window.location.reload();
  }

  async componentDidMount() {
    const Cliente = {
      id: this.state.id,
      ruolo: this.state.ruolo,
    };
    await this.props.ListaNotifiche(Cliente);
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
    const { errors } = this.state;
    const { notifica } = this.props.listanotifiche;
    const { user } = this.props.auth;
    this.state.id = user.id;
    this.state.ruolo = user.ruolo;
    console.log(this.state.id);
    const today = new Date();
    const NL = (
      <Container sm={12} style={{ marginBottom: "21rem" }}>
        <div class="center" style={{ textAlign: "left" }}>
          {notifica.map((notifica) => (
            <Col xs={12}>
              <Toast show={true} style={{ maxWidth: "900px" }}>
                <Toast.Header>
                  <img
                    src={Logo}
                    className="rounded mr-2"
                    alt="logo-karm"
                    width="100vw"
                  />
                  <strong
                    className="mr-auto"
                    style={{
                      color: "#010101",
                      fontWeight: "600",
                      fontFamily: "Montserrat",
                    }}
                  >
                    {notifica.titolo}
                  </strong>
                  <small
                    syle={{
                      color: "#010101",
                    }}
                  >
                    {notifica.createdAt.substring(0, 10)}
                  </small>
                </Toast.Header>
                <Toast.Body
                  style={{
                    color: "#010101",
                    fontWeight: "600",
                    fontFamily: "Montserrat",
                  }}
                >
                  {notifica.descrizione} <br />
                  <br />
                  {user.ruolo === "Autista" ? (
                    <Row className="justify-content-md-center">
                      <Col sm={3}>
                        <button
                          class="btn btn-primary btn-lg btn-block bottone"
                          onClick={() =>
                            this.accettaNotifica(
                              notifica._id,
                              notifica.id_utente
                            )
                          }
                        >
                          Accetta
                        </button>
                      </Col>
                      <Col sm={3}>
                        <button
                          class="btn btn-dark btn-lg btn-block bottone"
                          onClick={() => {
                            this.props.cancellaNotifica(notifica._id);
                            window.location.reload();
                          }}
                        >
                          Rifiuta
                        </button>
                      </Col>
                    </Row>
                  ) : (
                    <Row className="justify-content-md-center">
                      <Col sm={5}>
                        <button
                          class="btn btn-primary btn-lg btn-block bottone"
                          onClick={() => {
                            this.props.cancellaNotifica(notifica._id);
                            window.location.href = "/RiepilogoPrenotazione";
                          }}
                        >
                          Completa Operazione
                        </button>
                      </Col>
                    </Row>
                  )}
                </Toast.Body>
              </Toast>
            </Col>
          ))}
        </div>
      </Container>
    );
    return (
      <Container fluid style={{ marginBottom: "3rem", paddingBottom: "39rem" }}>
        <Container sm={12}>
          {notifica.length === 0 ? "Non ci sono notifiche" : NL}
        </Container>
      </Container>
    );
  }
}

NotificheLista.propTypes = {
  ListaNotifiche: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  listanotifiche: PropTypes.object.isRequired,
  inviaNotificaCliente: PropTypes.func.isRequired,
  cancellaNotifica: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  listanotifiche: state.listanotifiche,
});
export default connect(mapStateToProps, {
  ListaNotifiche,
  inviaNotificaCliente,
  cancellaNotifica,
})(NotificheLista);
