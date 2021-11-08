import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authAutentications";
import { Container, Row, Col, Button } from "react-bootstrap";
import Logo from "../../immagini/logo.png";
import { Link } from "react-router-dom";

class Dashboard extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    if (user.ruolo === "Cliente") this.props.history.push("/HomeCliente");
    return (
      <div
        className="dashboardAmministratore"
        style={{ backgroundColor: "#010101" }}
      >
        <Container
          style={{
            marginTop: "2rem",
            marginBottom: "20rem",
            textAlign: "center",
          }}
        >
          <Row>
            <Col sm={12}>
              <h1>
                Benvenuto <b>{user.nome}</b>, qui puoi gestire
                l'amministrazione!
              </h1>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Link to="/GestioneCorsaAdmin">
                <Button variant="primary" size="lg" block className="bottone">
                  Gestione Corsa
                </Button>
              </Link>
            </Col>
            <Col sm={6}>
              <Link to="/GestioneAmministrazione">
                <Button variant="primary" size="lg" block className="bottone">
                  Gestione Amministrazione
                </Button>
              </Link>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col sm={6}>
              <Link to="/VisualizzaPrenotazioni">
                <Button variant="primary" size="lg" block className="bottone">
                  Visualizza Prenotazioni
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(Dashboard);
