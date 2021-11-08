import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  loginUser,
  recuperoPassword,
  codiceOTP,
  modificaPassword,
} from "../actions/authAutentications";
import classnames from "classnames";
import axios from "axios";

//componenti da react-bootstrap
import { Container, Row, Col, Modal, Button } from "react-bootstrap";

class Email extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      password2: "",
      modalShow: false,
      modalShow1: false,
      error: false,
      errors: {},
    };
  }

  setModalShow = (input) => {
    this.setState({ modalShow: input });
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };
    if (
      this.state.email === "gabrielekarra@hotmail.it" ||
      this.state.email === "salvatoregabriele.karra@outlook.it"
    ) {
      this.setState({ error: false });
      this.setState({ error: false });
      this.props.recuperoPassword(userData);
      this.setState({ modalShow: true });
    } else {
      this.setState({ error: true });
      this.state.errors.email = "L'email inserita non risulta registrata";
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onSubmit1 = (e) => {
    e.preventDefault();

    const userData = {
      otp: this.state.otp,
    };
    this.props.codiceOTP(userData);
    if (!this.state.errors.otp) {
      this.setState({ modalShow: true });
    } else {
      this.setState({ modalShow1: true });
    } //mettere notifica di errore con else
  };
  onSubmit2 = (e) => {
    e.preventDefault();
    this.setState({ error: false });
    const dataUser = {
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };
    this.props.modificaPassword(this.state.email, dataUser);
    if (this.state.password === "") {
      this.state.errors.password = "Inserisci la password";
      this.setState({ error: true });
    } else if (this.state.password2 === "") {
      this.state.errors.password2 = "Conferma la password";
      this.setState({ error: true });
    } else if (this.state.password.length < 6) {
      this.state.errors.password =
        "La password deve essere di minimo 6 caratteri";
      this.setState({ error: true });
    } else if (this.state.password !== this.state.password2) {
      this.state.errors.password2 = "Le due password non corrispondono";
      this.setState({ error: true });
    } else {
      this.setState({ error: false });
      this.setState({ modalShow: false });
      this.props.history.push(`/login`);
    }
  };

  render() {
    const { errors } = this.state;

    return (
      <Container fluid style={{ marginTop: "3rem", marginBottom: "3rem" }}>
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.modalShow}
          onHide={() => this.setModalShow(false)}
          backdrop="static"
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Container style={{ marginTop: "5rem", marginBottom: "5rem" }}>
              <div className="form">
                <form noValidate onSubmit={this.onSubmit1}>
                  <h3 style={{ textAlign: "center", color: "black" }}>
                    Inserisci il codice OTP inviato alla tua email
                  </h3>
                  <div className="form-group">
                    <label htmlFor="otp">Codice OTP</label>
                    <input
                      onChange={this.onChange}
                      value={this.state.otp}
                      error={errors.otp}
                      id="otp"
                      type="text"
                      className={classnames("form-control", {
                        invalid: errors.otp,
                      })}
                    />
                    <span className="red-text">{errors.otp}</span>
                  </div>

                  <button
                    type="submit"
                    value="Registrazione Log"
                    className="btn btn-dark btn-lg btn-block bottone"
                  >
                    Verifica
                  </button>
                </form>
              </div>
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
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Container style={{ marginTop: "5rem", marginBottom: "5rem" }}>
              <div className="Form">
                <form noValidate onSubmit={this.onSubmit2}>
                  <h3 style={{ textAlign: "center", color: "black" }}>
                    Inserisci la nuova password
                  </h3>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      onChange={this.onChange}
                      value={this.state.password}
                      error={errors.password}
                      id="password"
                      type="password"
                      className={classnames("form-control", {
                        invalid: errors.password,
                      })}
                    />
                    {this.state.error ? (
                      <span className="red-text">{errors.password}</span>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <label htmlFor="password2">Conferma Password</label>
                    <input
                      onChange={this.onChange}
                      value={this.state.password2}
                      error={errors.password2}
                      id="password2"
                      type="password"
                      className={classnames("form-control", {
                        invalid: errors.password2,
                      })}
                    />
                    <span className="red-text">{errors.password2}</span>
                  </div>
                  <button
                    type="submit"
                    value="Registrazione Log"
                    className="btn btn-dark btn-lg btn-block bottone"
                  >
                    Avanti
                  </button>
                </form>
              </div>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setModalShow(false)}>Annulla</Button>
          </Modal.Footer>
        </Modal>
        <Container style={{ marginTop: "10rem", marginBottom: "17rem" }}>
          <div className="form">
            <form noValidate onSubmit={this.onSubmit}>
              <h3 style={{ textAlign: "center", color: "black" }}>
                Inserisci l'email
              </h3>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("form-control", {
                    invalid: errors.email || errors.emailnotfound,
                  })}
                />
                {this.state.error ? (
                  <span className="red-text">
                    {errors.email}
                    {errors.emailnotfound}
                  </span>
                ) : null}
              </div>

              <button
                type="submit"
                value="Registrazione Log"
                className="btn btn-dark btn-lg btn-block bottone"
              >
                Recupera
              </button>
              <h5 style={{ marginTop: "1rem", color: "black" }}>
                <p className="forgot-password text-right">
                  Non hai un account? <Link to="/register">Registrati</Link>
                </p>
              </h5>
            </form>
          </div>
        </Container>
      </Container>
    );
  }
}

Email.propTypes = {
  loginUser: PropTypes.func.isRequired,
  codiceOTP: PropTypes.func.isRequired,
  recuperoPassword: PropTypes.func.isRequired,
  modificaPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  loginUser,
  recuperoPassword,
  codiceOTP,
  modificaPassword,
})(Email);
