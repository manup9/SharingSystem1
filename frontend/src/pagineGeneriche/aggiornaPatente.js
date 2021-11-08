import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  loginUser,
  logoutUser,
  modificaPatente,
} from "../actions/authAutentications";
import classnames from "classnames";

//componenti da react-bootstrap
import { Container, Row, Col } from "react-bootstrap";

class Patente extends Component {
  constructor() {
    super();
    this.state = {
      id_utente: "",
      numero_patente: "",
      data_rilascio_patente: "",
      data_scadenza_patente: "",
      ente_rilascio: "",
      type: "text",
      errors: {},
    };
  }

  setType = (tipo) => {
    this.setState({ type: "date" });
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onSubmit = (e) => {
    e.preventDefault();

    const dataUser = {
      numero_patente: this.state.numero_patente,
      data_rilascio_patente: this.state.data_rilascio_patente,
      data_scadenza_patente: this.state.data_scadenza_patente,
      ente_rilascio: this.state.ente_rilascio,
    };
    this.props.modificaPatente(this.state.id, dataUser);
  };

  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;
    this.state.id = user.id;
    console.log(user.numero_patente);
    return (
      <Container style={{ marginTop: "12rem", marginBottom: "15rem" }}>
        <div className="Form">
          <form noValidate onSubmit={this.onSubmit}>
            <h3 style={{ textAlign: "center", color: "black" }}>
              Inserisci o aggiorna la patente
            </h3>
            <div className="form-group">
              <label htmlFor="numero_patente">Numero Patente</label>
              <input
                placeholder={user.numero_patente}
                onChange={this.onChange}
                value={this.state.numero_patente}
                error={errors.numero_patente}
                id="numero_patente"
                type="text"
                className={classnames("form-control", {
                  invalid: errors.numero_patente,
                })}
              />
              <span className="red-text">{errors.numero_patente}</span>
            </div>
            <div className="form-group">
              <label htmlFor="data_rilascio_patente">Data rilascio</label>
              <input
                type={this.state.type}
                onFocus={() => this.setType("date")}
                placeholder={user.data_rilascio_patente}
                onChange={this.onChange}
                value={this.state.data_rilascio_patente}
                error={errors.data_rilascio_patente}
                id="data_rilascio_patente"
                className={classnames("form-control", {
                  invalid: errors.data_rilascio_patente,
                })}
              />
              <span className="red-text">{errors.data_rilascio_patente}</span>
            </div>
            <div className="form-group">
              <label htmlFor="data_scadenza_patente">Data scadenza</label>
              <input
                onChange={this.onChange}
                type={this.state.type}
                onFocus={() => this.setType("date")}
                placeholder={user.data_scadenza_patente}
                value={this.state.data_scadenza_patente}
                error={errors.data_scadenza_patente}
                id="data_scadenza_patente"
                className={classnames("form-control", {
                  invalid: errors.data_scadenza_patente,
                })}
              />
              <span className="red-text">{errors.data_scadenza_patente}</span>
            </div>
            <div className="form-group">
              <label htmlFor="ente_rilascio">Ente rilascio</label>
              <input
                onChange={this.onChange}
                placeholder={user.ente_rilascio}
                value={this.state.ente_rilascio}
                error={errors.ente_rilascio}
                id="ente_rilascio"
                type="text"
                className={classnames("form-control", {
                  invalid: errors.ente_rilascio,
                })}
              />
              <span className="red-text">{errors.ente_rilascio}</span>
            </div>
            <Row>
              <Col sm={6}>
                <Link to="/IlMioProfilo">
                  <button className="btn btn-primary btn-lg btn-block bottone">
                    Annulla
                  </button>
                </Link>
              </Col>
              <Col sm={6}>
                <button
                  type="submit"
                  value="Registrazione Log"
                  className="btn btn-dark btn-lg btn-block bottone"
                >
                  Conferma
                </button>
              </Col>
            </Row>
          </form>
        </div>
      </Container>
    );
  }
}

Patente.propTypes = {
  loginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  modificaPatente: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  loginUser,
  modificaPatente,
  logoutUser,
})(withRouter(Patente));
