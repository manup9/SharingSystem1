import { Listaparcheggi } from "../../actions/parcheggiActions";
import { Listadipendenti } from "../../actions/authAutentications";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  registerUser,
  CancellaDipendente,
} from "../../actions/authAutentications";

//componenti da react-bootstrap
import { Container, Col, Row, Modal, Button } from "react-bootstrap";
import "../../App.css";
import classnames from "classnames";

import ricercaFiltro from "../../utils/ricercaFiltro";

class AggiornaDipendenti extends Component {
  state = {
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
    ruolo: "",
    numero_patente: "",
    data_rilascio_patente: "",
    data_scadenza_patente: "",
    ente_rilascio: "",
    id_parcheggio: "",
    filtroNome: "",
    filtroCognome: "",
    filtroEmail: "",
    filtroFiscale: "",
    errors: {},
  };

  async componentDidMount() {
    await this.props.Listaparcheggi();
    await this.props.Listadipendenti();
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  deleteDipendente(id) {
    this.props.CancellaDipendente(id);
    window.location.reload();
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newUser = {
      nome: this.state.nome,
      cognome: this.state.cognome,
      codice_fiscale: this.state.codice_fiscale,
      data_nascita: this.state.data_nascita,
      sesso: this.state.sesso,
      luogo_nascita: this.state.luogo_nascita,
      provincia_nascita: this.state.provincia_nascita,
      patente: this.state.patente,
      email: this.state.email,
      password: this.state.password,
      ruolo: this.state.ruolo,
      password2: this.state.password2,
      numero_patente: this.state.numero_patente,
      data_rilascio_patente: this.state.data_rilascio_patente,
      data_scadenza_patente: this.state.data_scadenza_patente,
      ente_rilascio: this.state.ente_rilascio,
      id_parcheggio: this.state.id_parcheggio,
    };
    this.props.registerUser(newUser, this.props.history);
  };

  viewCustomer(id) {
    console.log(id);
  }
  setModalShow = (input) => {
    if (this.state.ruolo === "") this.setState({ modalShow: input });
    else if (this.state.ruolo === "Addetto")
      this.setState({ modalShow1: input });
    else if (this.state.ruolo === "Autista")
      this.setState({ modalShow2: input });
  };

  render() {
    const { filtroNome, filtroCognome, filtroEmail, filtroFiscale, errors } =
      this.state;
    const { parcheggio } = this.props.listaparcheggi;
    let utentiFiltrati = [];
    const { user } = this.props.customerlist;
    utentiFiltrati = ricercaFiltro(user, filtroNome, "nome");
    utentiFiltrati = ricercaFiltro(utentiFiltrati, filtroCognome, "cognome");
    utentiFiltrati = ricercaFiltro(utentiFiltrati, filtroEmail, "email");
    utentiFiltrati = ricercaFiltro(
      utentiFiltrati,
      filtroFiscale,
      "codice_fiscale"
    );

    const CL = (
      <div className="container" style={{ marginBottom: "14rem" }}>
        <div class="center" style={{ textAlign: "left" }}>
          <table class="responsive-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Cognome</th>
                <th>Codice Fiscale</th>
                <th>Email</th>
                <th>Ruolo</th>
                <th>Elimina</th>
              </tr>
            </thead>
            <tbody>
              {utentiFiltrati.map((user) => (
                <tr key={user._id}>
                  <td>{user.nome}</td>
                  <td>{user.cognome}</td>
                  <td>{user.codice_fiscale}</td>
                  <td>{user.email}</td>

                  <td>{user.ruolo}</td>
                  <td>
                    {" "}
                    <button
                      class="btn"
                      onClick={() => this.deleteDipendente(user._id)}
                    >
                      <i class="material-icons">delete</i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
    const PL = (
      <div className="container">
        <div class="center" style={{ textAlign: "left" }}>
          <table class="responsive-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Indirizzo</th>
                <th>Numero Civico</th>
                <th>Capienza Auto</th>
                <th>Capienza Moto</th>
                <th>Capienza Biciclette</th>
                <th>Capienza Monopattini</th>
                <th>Seleziona</th>
              </tr>
            </thead>
            <tbody>
              {parcheggio.map((parcheggio) => (
                <tr key={parcheggio._id}>
                  <td>{parcheggio.nome}</td>
                  <td>{parcheggio.indirizzo}</td>
                  <td>{parcheggio.numero_civico}</td>
                  <td>{parcheggio.capienza_auto}</td>
                  <td>{parcheggio.capienza_moto}</td>
                  <td>{parcheggio.capienza_bici}</td>
                  <td>{parcheggio.capienza_monopattini}</td>
                  <td>
                    <button
                      onClick={() =>
                        (this.state.id_parcheggio = parcheggio._id)
                      }
                      className="btn btn-primary btn-lg btn-block bottone"
                    >
                      Avanti
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );

    return (
      <Container fluid style={{ marginTop: "3rem", marginBottom: "3rem" }}>
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.modalShow}
          onHide={() => window.location.reload()}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Inserisci i dati del dipendente
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container style={{ marginTop: "3rem", marginBottom: "3rem" }}>
              <div className="Form">
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label>Ruolo</label>
                    <select
                      id="ruolo"
                      type="text"
                      value={this.state.ruolo}
                      onChange={async (e) => {
                        await this.onChange(e);
                        this.setModalShow(true);
                      }}
                      error={errors.ruolo}
                      className={classnames("form-control", {
                        invalid: errors.ruolo,
                      })}
                    >
                      <option value="" disabled selected>
                        Ruolo
                      </option>
                      <option value="Addetto">Addetto al parcheggio</option>
                      <option value="Autista">Autista</option>
                    </select>
                    <span className="red-text">{errors.ruolo}</span>
                  </div>
                </form>
              </div>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => window.location.reload()}>Annulla</Button>
          </Modal.Footer>
        </Modal>
        <Container fluid style={{ marginTop: "3rem", marginBottom: "3rem" }}>
          <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.modalShow2}
            onHide={() => this.setModalShow(false)}
            backdrop="static"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Inserisci i dati dell'autista
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container style={{ marginTop: "3rem", marginBottom: "3rem" }}>
                <div className="Form">
                  <form noValidate onSubmit={this.onSubmit}>
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
                      <span className="red-text">
                        {errors.provincia_nascita}
                      </span>
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
                      <label htmlFor="numero_patente">Numero Patente</label>
                      <input
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
                      <label htmlFor="data_rilascio_patente">
                        Data rilascio
                      </label>
                      <input
                        type="date"
                        onChange={this.onChange}
                        value={this.state.data_rilascio_patente}
                        error={errors.data_rilascio_patente}
                        id="data_rilascio_patente"
                        className={classnames("form-control", {
                          invalid: errors.data_rilascio_patente,
                        })}
                      />
                      <span className="red-text">
                        {errors.data_rilascio_patente}
                      </span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="data_scadenza_patente">
                        Data scadenza
                      </label>
                      <input
                        onChange={this.onChange}
                        type="date"
                        value={this.state.data_scadenza_patente}
                        error={errors.data_scadenza_patente}
                        id="data_scadenza_patente"
                        className={classnames("form-control", {
                          invalid: errors.data_scadenza_patente,
                        })}
                      />
                      <span className="red-text">
                        {errors.data_scadenza_patente}
                      </span>
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
        </Container>
        <Container fluid style={{ marginTop: "3rem", marginBottom: "3rem" }}>
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
                Inserisci i dati dell'addetto al parcheggio
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container style={{ marginTop: "3rem", marginBottom: "3rem" }}>
                <div className="Form">
                  <form noValidate onSubmit={this.onSubmit}>
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
                      <span className="red-text">
                        {errors.provincia_nascita}
                      </span>
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
                    <div className="row">
                      {parcheggio.length === 0 ? "Non ci sono parcheggi" : PL}
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
        </Container>
        <div className="Form">
          <Row>
            <Col sm={3} md={{ span: 3, offset: 9 }}>
              <button
                className="btn btn-dark btn-lg btn-block bottone"
                onClick={() => this.setModalShow(true)}
              >
                + Inserisci dipendente
              </button>
            </Col>
          </Row>
          <Row>
            <Col sm>
              <div className="form-group">
                <label htmlFor="nome">Nome</label>
                <input
                  onChange={(event) =>
                    this.handleChange("filtroNome", event.target.value)
                  }
                  id="nome"
                  type="text"
                />
              </div>
            </Col>
            <Col sm>
              <div className="form-group">
                <label htmlFor="cognome">Cognome</label>
                <input
                  onChange={(event) =>
                    this.handleChange("filtroCognome", event.target.value)
                  }
                  id="cognome"
                  type="text"
                />
              </div>
            </Col>
            <Col sm>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  onChange={(event) =>
                    this.handleChange("filtroEmail", event.target.value)
                  }
                  id="email"
                  type="text"
                />
              </div>
            </Col>
            <Col sm>
              <div className="form-group">
                <label htmlFor="fiscale">Codice Fiscale</label>
                <input
                  onChange={(event) =>
                    this.handleChange("filtroFiscale", event.target.value)
                  }
                  id="fiscale"
                  type="text"
                />
              </div>
            </Col>
          </Row>
        </div>
        <div className="row">
          {user.length === 0 ? "Non ci sono dipendenti" : CL}
        </div>
      </Container>
    );
  }
}

AggiornaDipendenti.propTypes = {
  CancellaDipendente: PropTypes.func.isRequired,
  Listadipendenti: PropTypes.func.isRequired,
  registerUser: PropTypes.func.isRequired,

  Listaparcheggi: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  customerlist: PropTypes.object.isRequired,
  listaparcheggi: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  customerlist: state.customerlist,
  listaparcheggi: state.listaparcheggi,
});
export default connect(mapStateToProps, {
  Listaparcheggi,
  Listadipendenti,
  registerUser,
  CancellaDipendente,
})(withRouter(AggiornaDipendenti));
