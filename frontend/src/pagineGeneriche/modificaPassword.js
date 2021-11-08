import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import {
  loginUser,
  logoutUser,
  recuperoPassword,
  codiceOTP,
  modificaPassword2,
} from "../actions/authAutentications";
import classnames from "classnames";

//componenti da react-bootstrap
import { Container } from "react-bootstrap";

class ModificaPassword extends Component {
  constructor() {
    super();
    this.state = {
      vecchiapassword: "",
      password: "",
      password2: "",
      errore: false,
      errors: {},
    };
  }

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
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    if (
      this.state.vecchiapassword === "123456" ||
      this.state.vecchiapassword === "987654321" ||
      this.state.vecchiapassword === "123456789"
    ) {
      this.props.modificaPassword2(this.state.email, dataUser);
    } else {
      this.setState({ errore: true });
      this.state.errors.vecchiapassword = "Hai inserito una password sbagliata";
    }
    //this.props.history.push("/HomeCliente");

    //aggiungere notifica
    //aggiungere notifica errore
  };

  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;
    this.state.email = user.email;

    return (
      // dentro div {this.status.errore && setStateModal(true)}
      <Container style={{ marginTop: "12rem", marginBottom: "15rem" }}>
        <div className="Form">
          <form noValidate onSubmit={this.onSubmit}>
            <h3 style={{ textAlign: "center", color: "black" }}>
              Qui puoi modificare la tua password
            </h3>
            <div className="form-group">
              <label htmlFor="password">Vecchia Password</label>
              <input
                onChange={this.onChange}
                value={this.state.vecchiapassword}
                id="vecchiapassword"
                type="password"
                className={classnames("form-control", {
                  invalid: errors.vecchiapassword,
                })}
              />
              {this.state.errore ? (
                <span className="red-text">{errors.vecchiapassword}</span>
              ) : null}
            </div>
            <div className="form-group">
              <label htmlFor="password">Nuova Password</label>
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
              <span className="red-text">{errors.password}</span>
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
              Conferma
            </button>
          </form>
        </div>
      </Container>
    );
  }
}

ModificaPassword.propTypes = {
  loginUser: PropTypes.func.isRequired,
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  modificaPassword2: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, {
  loginUser,
  modificaPassword2,
  logoutUser,
})(withRouter(ModificaPassword));
