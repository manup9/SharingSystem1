import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../actions/authAutentications";
import { Container, Row, Col, Button, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";

let stileProfilo;

class IlMioProfilo extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    if (user.ruolo === "Admin") stileProfilo = "Admin";
    else if (user.ruolo === "Autista") stileProfilo = "Autista";
    else if (user.ruolo === "Addetto") stileProfilo = "Addetto";
    //localStorage.setItem("patenteaggiunta", false);
    switch (stileProfilo) {
      case "Admin":
        return (
          <div className="dashboardAutista" style={{ paddingBottom: "32rem" }}>
            <Container
              style={{
                textAlign: "center",
              }}
            >
              <Row>
                <Col sm>
                  <h1>
                    Benvenuto <b>{user.nome}</b>, qui puoi modificare il tuo
                    profilo
                  </h1>
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col sm={4} className="colonnaAutista">
                  <Link to="/ModificaPassword">
                    <Button
                      variant="primary"
                      size="lg"
                      block
                      className="bottone"
                    >
                      Cambia Password
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Container>
          </div>
        );
      case "Autista":
        return (
          <div
            className="dashboardAutista"
            style={{ backgroundColor: "#010101" }}
          >
            <Container
              style={{
                textAlign: "center",
                paddingBottom: "21rem",
              }}
            >
              <Row>
                <Col sm={12}>
                  <h1>
                    Benvenuto <b>{user.nome}</b>, qui puoi modificare il tuo
                    profilo
                  </h1>
                </Col>
              </Row>
              <Row>
                <Col sm={6} className="colonnaAutista">
                  <Link to="/ModificaPassword">
                    <Button
                      variant="primary"
                      size="lg"
                      block
                      className="bottone"
                    >
                      Cambia Password
                    </Button>
                  </Link>
                </Col>
                <Col sm={6} className="colonnaAutista">
                  <Link to="/Patente">
                    <Button
                      variant="primary"
                      size="lg"
                      block
                      className="bottone"
                    >
                      Inserisci o aggiorna patente
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Container>
          </div>
        );
      case "Addetto":
        return (
          <div
            className="dashboardAutista"
            style={{ backgroundColor: "#010101" }}
          >
            <Container
              style={{
                textAlign: "center",
                paddingBottom: "21rem",
              }}
            >
              <Row>
                <Col sm={12}>
                  <h1>
                    Benvenuto <b>{user.nome}</b>, qui puoi modificare il tuo
                    profilo
                  </h1>
                </Col>
              </Row>
              <Row>
                <Col sm={6} className="colonnaAutista">
                  <Link to="/ModificaPassword">
                    <Button
                      variant="primary"
                      size="lg"
                      block
                      className="bottone"
                    >
                      Cambia Password
                    </Button>
                  </Link>
                </Col>
                <Col sm={6} className="colonnaAutista">
                  <Link to="/ModificaParcheggio">
                    <Button
                      variant="primary"
                      size="lg"
                      block
                      className="bottone"
                    >
                      Modifica Parcheggio Associato
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Container>
          </div>
        );
      default:
        //cliente
        return (
          <div
            className="dashboardAutista"
            style={{
              backgroundColor: "#010101",
              paddingBottom: "28rem",
            }}
          >
            <Container
              style={{
                textAlign: "center",
              }}
            >
              <Row>
                <Col sm={12}>
                  <h1>
                    Benvenuto <b>{user.nome}</b>, qui puoi modificare il tuo
                    profilo
                  </h1>
                </Col>
              </Row>
              <Row>
                <Col sm={6} className="colonnaAutista">
                  <Link to="/ModificaPassword">
                    <Button
                      variant="primary"
                      size="lg"
                      block
                      className="bottone"
                    >
                      Cambio Password
                    </Button>
                  </Link>
                </Col>
                <Col sm={6} className="colonnaAutista">
                  <Link to="/MetodiDiPagamento">
                    <Button
                      variant="primary"
                      size="lg"
                      block
                      className="bottone"
                    >
                      I miei metodi di pagamento
                    </Button>
                  </Link>
                </Col>
              </Row>
              <Row className="justify-content-md-center">
                <Col sm={6} className="colonnaAutista">
                  <Link to="/Patente">
                    <Button
                      variant="primary"
                      size="lg"
                      block
                      className="bottone"
                    >
                      Inserisci o aggiorna patente
                    </Button>
                  </Link>
                </Col>
              </Row>
            </Container>
          </div>
        );
    }
  }
}

IlMioProfilo.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(IlMioProfilo);
