import React, { Component } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import { registerUser } from "../../actions/authAutentications";

//import type
import { GET_ERRORS } from "../../actions/type";

//componenti da react-bootstrap
import { Container } from "react-bootstrap";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      nome: "",
      cognome: "",
      data_nascita: "",
      sesso: "",
      luogo_nascita: "",
      provincia_nascita: "",
      codice_fiscale: "",
      email: "",
      password: "",
      password2: "",
      errors: {},
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/HomeCliente");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      nome: this.state.nome,
      cognome: this.state.cognome,
      data_nascita: this.state.data_nascita,
      codice_fiscale: this.state.codice_fiscale.toUpperCase(),
      sesso: this.state.sesso,
      luogo_nascita: this.state.luogo_nascita,
      provincia_nascita: this.state.provincia_nascita,
      patente: this.state.patente,
      numero_telefono: this.state.numero_telefono,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2,
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;
    return (
      <Container style={{ marginTop: "3rem", marginBottom: "3rem" }}>
        <div className="Form">
          <form noValidate onSubmit={this.onSubmit}>
            <h3 style={{ textAlign: "center", color: "black" }}>Registrati</h3>
            <div className="form-group">
              <label htmlFor="nome">Nome</label>
              <input
                onChange={this.onChange}
                value={this.state.nome}
                error={errors.nome}
                id="nome"
                type="text"
                className={classnames("form-control", {
                  invalid: errors.nome,
                })}
              />
              <span className="red-text">{errors.nome}</span>
            </div>
            <div className="form-group">
              <label htmlFor="cognome">Cognome</label>
              <input
                onChange={this.onChange}
                value={this.state.cognome}
                error={errors.cognome}
                id="cognome"
                type="text"
                className={classnames("form-control", {
                  invalid: errors.cognome,
                })}
              />
              <span className="red-text">{errors.cognome}</span>
            </div>
            <div className="form-group">
              <label htmlFor="data_nascita">Data di nascita</label>
              <input
                onChange={this.onChange}
                value={this.state.data_nascita}
                error={errors.data_nascita}
                id="data_nascita"
                type="date"
                className={classnames("form-control", {
                  invalid: errors.data_nascita,
                })}
              />
              <span className="red-text">{errors.data_nascita}</span>
            </div>
            <div className="form-group">
              <label>Sesso</label>
              <select
                id="sesso"
                type="text"
                value={this.state.sesso}
                onChange={this.onChange}
                error={errors.sesso}
                className={classnames("form-control", {
                  invalid: errors.sesso,
                })}
              >
                <option value="" disabled selected>
                  Sesso
                </option>
                <option value="M">Uomo</option>
                <option value="F">Donna</option>
              </select>
              <span className="red-text">{errors.sesso}</span>
            </div>
            <div className="form-group">
              <label htmlFor="luogo_nascita">Luogo di nascita</label>
              <input
                onChange={this.onChange}
                value={this.state.luogo_nascita}
                error={errors.luogo_nascita}
                id="luogo_nascita"
                type="text"
                className={classnames("form-control", {
                  invalid: errors.luogo_nascita,
                })}
              />
              <span className="red-text">{errors.luogo_nascita}</span>
            </div>
            <div className="form-group">
              <label>Provincia di nascita</label>
              <select
                id="provincia_nascita"
                type="text"
                value={this.state.provincia_nascita}
                onChange={this.onChange}
                error={errors.provincia_nascita}
                className={classnames("form-control", {
                  invalid: errors.provincia_nascita,
                })}
              >
                <option value="" disabled selected>
                  Provincia di Nascita
                </option>
                <option value="AG">Agrigento</option>
                <option value="CL">Caltanissetta</option>
                <option value="CT">Catania</option>
                <option value="EN">Enna</option>
                <option value="ME">Messina</option>
                <option value="PA">Palermo</option>
                <option value="RG">Ragusa</option>
                <option value="SR">Siracusa</option>
                <option value="TP">Trapani</option>
              </select>
              <span className="red-text">{errors.provincia_nascita}</span>
            </div>
            <div className="form-group">
              <label htmlFor="codice_fiscale">Codice Fiscale</label>
              <input
                onChange={this.onChange}
                value={this.state.codice_fiscale}
                error={errors.codice_fiscale}
                id="codice_fiscale"
                type="text"
                className={classnames("form-control", {
                  invalid: errors.codice_fiscale,
                })}
              />
              <span className="red-text">{errors.codice_fiscale}</span>
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                className={classnames("form-control", {
                  invalid: errors.email,
                })}
              />
              <span className="red-text">{errors.email}</span>
            </div>
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
            <div className="form-group">
              <p>
                Effettuando la registrazione si accettano le condizioni generali
                e si autorizza l’azienda al trattamento dei dati personali
              </p>
            </div>
            <button
              type="submit"
              value="Registrazione Log"
              className="btn btn-dark btn-lg btn-block bottone"
            >
              Registrati
            </button>
            <h5 style={{ marginTop: "1rem", color: "black" }}>
              <p className="forgot-password text-right">
                Hai già un account? <Link to="/login">Accedi</Link>
              </p>
            </h5>
          </form>
        </div>
      </Container>
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { registerUser })(withRouter(Register));
