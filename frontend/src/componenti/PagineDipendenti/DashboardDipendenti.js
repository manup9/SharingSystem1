import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authAutentications";
import { Container, Row, Col, Button } from "react-bootstrap";
import Logo from "../../immagini/logo.png";
import { Link } from "react-router-dom";

class DashboardDipendenti extends Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    if (user.ruolo === "Cliente") this.props.history.push("/HomeCliente");
    else if (user.ruolo === "Admin") this.props.history.push("/Dashboard");
    return (
      <div className="dashboardAutista" style={{ backgroundColor: "#010101" }}>
        <Container
          style={{
            textAlign: "center",
            paddingBottom: "21rem",
          }}
        >
          <Row className="justify-content-md-center">
            <Col sm={12}>
              <h1>
                Benvenuto <b>{user.nome}</b>, un nuovo giorno in KARM!
              </h1>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col sm={4} className="colonnaAutista">
              <Link to="/GestioneCorsaAdmin">
                <Button variant="primary" size="lg" block className="bottone">
                  Gestione Corsa
                </Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

DashboardDipendenti.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(DashboardDipendenti);
