import React, { Component } from "react";
import "../../App.css";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser, setCurrentUser } from "../../actions/authAutentications";
import car from "../../immagini/CAR.png";
import { Container, Row, Col, Button } from "react-bootstrap";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import MapIcon from "@material-ui/icons/Map";
import ScheduleIcon from "@material-ui/icons/Schedule";
import { Link, withRouter } from "react-router-dom";
import logo from "../../immagini/logo.png";

class HomeCliente extends Component {
  constructor(props) {
    super(props);
  }

  onLogoutClick = (e) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;

    //Redirect
    if (user.ruolo === "Admin") this.props.history.push("/Dashboard");
    else if (user.ruolo === "Autista" || user.ruolo === "Addetto")
      this.props.history.push("/DashboardDipendenti");
    return (
      <div className="HomeCliente">
        <Container>
          <Row>
            <Col sm={6}>
              <img src={logo} alt="fiat-500" className="Fiat" />
            </Col>
            <Col sm={6}>
              <h1 style={{ fontWeight: "bold" }} className="TestoHomeCliente">
                Una nuova <br />
                esperienza <br /> di noleggio!
                <h4 style={{ fontWeight: "300" }}>
                  Prenota adesso e goditi il tuo viaggio
                </h4>
              </h1>
            </Col>
          </Row>
          <br /> <br /> <br /> <br />
          <Row className="justify-content-md-center">
            <Col sm={3}>
              <Link to="/NuovaPrenotazione">
                <button className="btn btn-primary btn-lg btn-block bottone">
                  Nuova Prenotazione
                </button>
              </Link>
            </Col>
            <Col sm={3}>
              <Link to="/GestioneCorsa">
                <button
                  type="submit"
                  value="Registrazione Log"
                  className="btn btn-primary btn-lg btn-block bottone"
                >
                  Gestione Corsa
                </button>
              </Link>
            </Col>
            <Col sm={4}>
              <Link to="/VisualizzaPrenotazioni">
                <button
                  type="submit"
                  value="Registrazione Log"
                  className="btn btn-primary btn-lg btn-block bottone"
                >
                  Visualizza Prenotazioni
                </button>
              </Link>
            </Col>
          </Row>{" "}
          <br />
          <br />
          <br />
          <br />
          <Row>
            <Col sm={12}>
              <h2 style={{ fontWeight: "bolder", textAlign: "center" }}>
                {" "}
                TROVA IL MEZZO PER ANDARE DOVE VUOI{" "}
              </h2>
            </Col>
          </Row>
          <br /> <br />
          <Row>
            <Col sm style={{ textAlign: "center", marginBottom: "2rem" }}>
              <ScheduleIcon style={{ fontSize: 60, color: "black" }} />
              <br />
              <br />
              <h5 style={{ fontWeight: "bolder" }}>PARTI QUANDO VUOI</h5>
              <h6>
                Richiedi una corsa a qualsiasi ora e in qualsiasi giorno
                dell'anno.
              </h6>
            </Col>
            <Col sm style={{ textAlign: "center", marginBottom: "2rem" }}>
              <LocalAtmIcon style={{ fontSize: 60, color: "black" }} />
              <br />
              <br />
              <h5 style={{ fontWeight: "bolder" }}>
                OPZIONI A PREZZI ACCESSIBILI
              </h5>
              <h6>
                Confronta i prezzi di tutte le opzioni di corsa, dai tragitti da
                pendolare giornalieri alle serate speciali.
              </h6>
            </Col>
            <Col sm style={{ textAlign: "center", marginBottom: "2rem" }}>
              <MapIcon style={{ fontSize: 60, color: "black" }} />
              <br />
              <br />
              <h5 style={{ fontWeight: "bolder" }}>
                UN MODO FACILE PER SPOSTARSI
              </h5>
              <h6>
                Tocca per farti accompagnare a destinazione dall’autista o guida
                tu e divertiti
              </h6>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

HomeCliente.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(HomeCliente);
