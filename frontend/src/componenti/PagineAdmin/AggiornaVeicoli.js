import { Listaveicoli } from "../../actions/veicoliActions";
import { Listaparcheggi } from "../../actions/parcheggiActions";
import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import {
  registerVeicolo,
  ModificaVeicolo,
  CancellaVeicolo,
  GetSpecificVeicolo,
  modificaStato,
  modificaParcheggio,
} from "../../actions/veicoliActions";

//componenti da react-bootstrap
import { Container, Col, Row, Modal, Button, Alert } from "react-bootstrap";

import "../../App.css";
import classnames from "classnames";

import filtriVeicoli from "../../utils/filtriVeicoli";

class AggiornaVeicoli extends Component {
  state = {
    tipo: "",
    modello: "",
    marca: "",
    cilindrata: 0,
    n_posti: 0,
    n_porte: 0,
    targa: "",
    id_parcheggio: "",
    descrizione: "",
    prezzo_festivo: "",
    prezzo_feriale: "",
    stato: "",
    errors: {},
    filtroTipo: "",
    filtroParcheggio: "",
    filtroID: "",
    current_id: "",
    current_veicolo_id: "",
    messaggio: true,
    messaggio1: true,
    veicoli_inparcheggio: [], //per fare capienza mettere dentro tutti i veicoli del parcheggio selezionato e in caso restituire error
  };

  async componentDidMount() {
    await this.props.Listaveicoli();
    await this.props.Listaparcheggi();
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
  deleteVeicolo(id) {
    this.props.CancellaVeicolo(id);
    this.setState({ modalShow: false });
    this.setState({ modalShow1: false });
    this.setState({ modalShow2: false });
    this.setState({ modalShow3: false });
    this.setState({ modalShow4: false });
    this.setState({ modalShow5: false });
    this.setState({ messaggio1: false });
  }

  modificaVeicolo(id) {
    this.setState({ modalShow4: true });
    this.state.current_id = id;
  }

  cambiaParcheggio(id) {
    console.log(id);
    this.state.id_parcheggio = id;
    const VeicoloDaModificare = {
      _id: this.state.current_id,
      id_parcheggio: this.state.id_parcheggio,
    };
    this.props.modificaParcheggio(this.state.current_id, VeicoloDaModificare);
  }

  attivaVeicolo(id) {
    this.state.stato = "Attivo";
    const VeicoloDaModificare = {
      _id: id,
      stato: this.state.stato,
    };
    this.props.modificaStato(id, VeicoloDaModificare);
  }
  bloccaVeicolo(id) {
    this.state.stato = "Bloccato";
    console.log(this.state.stato);
    const VeicoloDaModificare = {
      _id: id,
      stato: this.state.stato,
    };
    this.props.modificaStato(id, VeicoloDaModificare);
  }

  onChange = async (e) => {
    await this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newVeicolo = {
      tipo: this.state.tipo,
      modello: this.state.modello,
      marca: this.state.marca,
      cilindrata: this.state.cilindrata,
      n_posti: this.state.n_posti,
      n_porte: this.state.n_porte,
      targa: this.state.targa,
      id_parcheggio: this.state.id_parcheggio,
      descrizione: this.state.descrizione,
      prezzo_festivo: this.state.prezzo_festivo,
      prezzo_feriale: this.state.prezzo_feriale,
      stato: this.state.stato,
    };
    this.props.registerVeicolo(newVeicolo);
    if (this.state.errors) {
      this.setState({ messaggio: false });
      this.setState({ modalShow: false });
      this.setState({ modalShow1: false });
      this.setState({ modalShow2: false });
      this.setState({ modalShow3: false });
      this.setState({ modalShow4: false });
      this.setState({ modalShow5: false });
    }
  };

  setModalShow = (input) => {
    if (this.state.tipo === "") this.setState({ modalShow: input });
    else if (this.state.tipo === "Autovettura")
      this.setState({ modalShow1: input });
    else if (this.state.tipo === "Moto") this.setState({ modalShow2: input });
    else if (
      this.state.tipo === "Bicicletta" ||
      this.state.tipo === "Monopattino"
    )
      this.setState({ modalShow3: input });
  };

  render() {
    const { filtroTipo, filtroParcheggio, filtroID, errors } = this.state;
    const { parcheggio } = this.props.listaparcheggi;
    let veicoliFiltrati = [];
    const { veicolo } = this.props.listaveicoli;
    veicoliFiltrati = filtriVeicoli(veicolo, filtroTipo, "tipo");
    veicoliFiltrati = filtriVeicoli(
      veicoliFiltrati,
      filtroParcheggio,
      "id_parcheggio"
    );
    veicoliFiltrati = filtriVeicoli(veicoliFiltrati, filtroID, "_id");

    const VL = (
      <Container sm={12} style={{ marginBottom: "21rem" }}>
        {this.state.messaggio ? null : (
          <Alert variant="success">
            Hai inserito correttamente il veicolo!
            <Alert.Link href="/AggiornaVeicoli"> Premi qui </Alert.Link>per
            visualizzarlo
          </Alert>
        )}
        {this.state.messaggio1 ? null : (
          <Alert variant="success">
            Hai eliminato correttamente il veicolo!
            <Alert.Link href="/AggiornaVeicoli"> Premi qui </Alert.Link>per
            visualizzare le modifiche
          </Alert>
        )}
        <div class="center" style={{ textAlign: "left" }}>
          <table class="responsive-table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Modello</th>
                <th>Marca</th>
                <th>Cilindrata</th>
                <th>Numero posti</th>
                <th>Numero porte</th>
                <th>Targa</th>
                <th>Parcheggio</th>
                <th>Stato</th>
                <th>Modifica</th>
              </tr>
            </thead>
            <tbody>
              {veicoliFiltrati.map((veicolo) => (
                <tr key={veicolo._id}>
                  <td>{veicolo.tipo}</td>
                  <td>{veicolo.modello}</td>
                  <td>{veicolo.marca}</td>
                  <td>{veicolo.cilindrata}</td>
                  <td>{veicolo.n_posti}</td>
                  <td>{veicolo.n_porte}</td>
                  <td>{veicolo.targa}</td>
                  <td>{veicolo.id_parcheggio}</td>
                  <td>{veicolo.stato}</td>
                  <td>
                    {" "}
                    <button
                      class="btn"
                      onClick={() => this.attivaVeicolo(veicolo._id)}
                    >
                      <i class="material-icons">flash_on</i>
                    </button>
                    <button
                      class="btn"
                      onClick={() => this.bloccaVeicolo(veicolo._id)}
                    >
                      <i class="material-icons">block</i>
                    </button>
                    <button
                      class="btn"
                      onClick={() => this.modificaVeicolo(veicolo._id)}
                    >
                      <i class="material-icons">create</i>
                    </button>
                    {veicolo.stato === "Attivo" ? null : (
                      <button
                        class="btn"
                        onClick={() => {
                          this.setState({ modalShow5: true });
                          this.setState({ current_veicolo_id: veicolo._id });
                        }}
                      >
                        <i class="material-icons">delete</i>
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
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

    const PL2 = (
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
                      onClick={() => this.cambiaParcheggio(parcheggio._id)}
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
          show={this.state.modalShow5}
          onHide={() => window.location.reload()}
          backdrop="static"
        >
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            <Container style={{ marginTop: "5rem", marginBottom: "5rem" }}>
              <h3 style={{ textAlign: "center", color: "black" }}>
                Sei sicuro di voler cancellare il veicolo?
              </h3>
              <Row>
                <Col sm>
                  <button
                    type="submit"
                    value="Registrazione Log"
                    className="btn btn-dark btn-lg btn-block bottone"
                    onClick={(e) =>
                      this.deleteVeicolo(this.state.current_veicolo_id)
                    }
                  >
                    Conferma
                  </button>
                </Col>
                <Col sm>
                  <button
                    type="submit"
                    value="Registrazione Log"
                    className="btn btn-primary btn-lg btn-block bottone"
                    onClick={() => window.location.reload()}
                  >
                    Annulla
                  </button>
                </Col>
              </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => window.location.reload()}>Annulla</Button>
          </Modal.Footer>
        </Modal>
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
              Inserisci i dati del veicolo
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container style={{ marginTop: "3rem", marginBottom: "3rem" }}>
              <div className="Form">
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label>Tipo</label>
                    <select
                      id="tipo"
                      type="text"
                      value={this.state.tipo}
                      onChange={async (e) => {
                        await this.onChange(e);
                        this.setModalShow(true);
                      }}
                      error={errors.tipo}
                      className={classnames("form-control", {
                        invalid: errors.tipo,
                      })}
                    >
                      <option value="" disabled selected>
                        Tipo
                      </option>
                      <option value="Autovettura">Autovettura</option>
                      <option value="Moto">Moto</option>
                      <option value="Bicicletta">Bicicletta</option>
                      <option value="Monopattino">Monopattino</option>
                    </select>
                    <span className="red-text">{errors.tipo}</span>
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
            show={this.state.modalShow1}
            onHide={() => this.setModalShow(false)}
            backdrop="static"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Inserisci i dati dell'autovettura
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container style={{ marginTop: "3rem", marginBottom: "3rem" }}>
                <div className="Form">
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label>Modello</label>
                      <select
                        id="modello"
                        type="text"
                        value={this.state.modello}
                        onChange={this.onChange}
                        error={errors.modello}
                        className={classnames("form-control", {
                          invalid: errors.modello,
                        })}
                      >
                        <option value="" disabled selected>
                          Modello
                        </option>
                        <option value="Berlina">Berlina</option>
                        <option value="Suv">Suv</option>
                        <option value="Utilitaria">Utilitaria</option>
                      </select>
                      <span className="red-text">{errors.modello}</span>
                    </div>
                    <div className="form-group">
                      <label>Marca</label>
                      <select
                        id="marca"
                        type="text"
                        value={this.state.marca}
                        onChange={this.onChange}
                        error={errors.marca}
                        className={classnames("form-control", {
                          invalid: errors.marca,
                        })}
                      >
                        <option value="" disabled selected>
                          Marca
                        </option>
                        <option value="Toyota">Today-Tomorrow-Toyota</option>
                        <option value="Fiat">Fiat</option>
                        <option value="Audi">Audi</option>
                      </select>
                      <span className="red-text">{errors.marca}</span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="cilindrata">Cilindrata</label>
                      <input
                        onChange={this.onChange}
                        value={this.state.cilindrata}
                        error={errors.cilindrata}
                        id="cilindrata"
                        type="number"
                        className={classnames("form-control", {
                          invalid: errors.cilindrata,
                        })}
                      />
                      <span className="red-text">{errors.cilindrata}</span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="n_posti">Numero posti</label>
                      <input
                        onChange={this.onChange}
                        value={this.state.n_posti}
                        error={errors.n_posti}
                        id="n_posti"
                        type="number"
                        className={classnames("form-control", {
                          invalid: errors.n_posti,
                        })}
                      />
                      <span className="red-text">{errors.n_posti}</span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="n_porte">Numero porte</label>
                      <input
                        onChange={this.onChange}
                        value={this.state.n_porte}
                        error={errors.n_porte}
                        id="n_porte"
                        type="number"
                        className={classnames("form-control", {
                          invalid: errors.n_porte,
                        })}
                      />
                      <span className="red-text">{errors.n_porte}</span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="targa">Targa</label>
                      <input
                        onChange={this.onChange}
                        value={this.state.targa}
                        error={errors.targa}
                        id="targa"
                        type="text"
                        className={classnames("form-control", {
                          invalid: errors.targa,
                        })}
                      />
                      <span className="red-text">{errors.targa}</span>
                    </div>

                    <div className="form-group">
                      <label htmlFor="descrizione">Descrizione</label>
                      <input
                        onChange={this.onChange}
                        value={this.state.descrizione}
                        error={errors.descrizione}
                        id="descrizione"
                        type="text"
                        className={classnames("form-control", {
                          invalid: errors.descrizione,
                        })}
                      />
                      <span className="red-text">{errors.descrizione}</span>
                    </div>
                    <div className="row">
                      {parcheggio.length === 0 ? "Non ci sono parcheggi" : PL}
                    </div>
                    <button
                      type="submit"
                      value="Registrazione Log"
                      className="btn btn-dark btn-lg btn-block bottone"
                    >
                      Inserisci
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
            show={this.state.modalShow2}
            onHide={() => this.setModalShow(false)}
            backdrop="static"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Inserisci i dati della moto
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container style={{ marginTop: "3rem", marginBottom: "3rem" }}>
                <div className="Form">
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label>Modello</label>
                      <select
                        id="modello"
                        type="text"
                        value={this.state.modello}
                        onChange={this.onChange}
                        error={errors.modello}
                        className={classnames("form-control", {
                          invalid: errors.modello,
                        })}
                      >
                        <option value="" disabled selected>
                          Modello
                        </option>
                        <option value="Scooter">Scooter</option>
                        <option value="Motocicletta">Motocicletta</option>
                      </select>
                      <span className="red-text">{errors.modello}</span>
                    </div>
                    <div className="form-group">
                      <label>Marca</label>
                      <select
                        id="marca"
                        type="text"
                        value={this.state.marca}
                        onChange={this.onChange}
                        error={errors.marca}
                        className={classnames("form-control", {
                          invalid: errors.marca,
                        })}
                      >
                        <option value="" disabled selected>
                          Marca
                        </option>
                        <option value="Aprilia">Aprilia</option>
                        <option value="KTM">KTM</option>
                        <option value="Pegeout">Pegeout</option>
                      </select>
                      <span className="red-text">{errors.marca}</span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="cilindrata">Cilindrata</label>
                      <input
                        onChange={this.onChange}
                        value={this.state.cilindrata}
                        error={errors.cilindrata}
                        id="cilindrata"
                        type="number"
                        className={classnames("form-control", {
                          invalid: errors.cilindrata,
                        })}
                      />
                      <span className="red-text">{errors.cilindrata}</span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="targa">Targa</label>
                      <input
                        onChange={this.onChange}
                        value={this.state.targa}
                        error={errors.targa}
                        id="targa"
                        type="text"
                        className={classnames("form-control", {
                          invalid: errors.targa,
                        })}
                      />
                      <span className="red-text">{errors.targa}</span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="descrizione">Descrizione</label>
                      <input
                        onChange={this.onChange}
                        value={this.state.descrizione}
                        error={errors.descrizione}
                        id="descrizione"
                        type="text"
                        className={classnames("form-control", {
                          invalid: errors.descrizione,
                        })}
                      />
                      <span className="red-text">{errors.descrizione}</span>
                    </div>
                    <div className="row">
                      {parcheggio.length === 0 ? "Non ci sono parcheggi" : PL}
                    </div>
                    <button
                      type="submit"
                      value="Registrazione Log"
                      className="btn btn-dark btn-lg btn-block bottone"
                    >
                      Inserisci
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
            show={this.state.modalShow3}
            onHide={() => this.setModalShow(false)}
            backdrop="static"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Inserisci i dati del monopattino o della bicicletta
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container style={{ marginTop: "3rem", marginBottom: "3rem" }}>
                <div className="Form">
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label htmlFor="descrizione">Descrizione</label>
                      <input
                        onChange={this.onChange}
                        value={this.state.descrizione}
                        error={errors.descrizione}
                        id="descrizione"
                        type="text"
                        className={classnames("form-control", {
                          invalid: errors.descrizione,
                        })}
                      />
                      <span className="red-text">{errors.descrizione}</span>
                    </div>
                    <div className="row">
                      {parcheggio.length === 0 ? "Non ci sono parcheggi" : PL}
                    </div>

                    <button
                      type="submit"
                      value="Registrazione Log"
                      className="btn btn-dark btn-lg btn-block bottone"
                    >
                      Inserisci
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
            show={this.state.modalShow4}
            onHide={() => window.location.reload()}
            backdrop="static"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Modifica il parcheggio associato al veicolo selezionato
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container style={{ marginTop: "3rem", marginBottom: "3rem" }}>
                <div className="form-group">
                  <label>Parcheggio</label>
                </div>
                <div className="row">
                  {parcheggio.length === 0 ? "Non ci sono parcheggi" : PL2}
                </div>
              </Container>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => window.location.reload()}>Annulla</Button>
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
                + Inserisci veicolo
              </button>
            </Col>
          </Row>
          <Row>
            <Col sm>
              <div className="form-group">
                <label htmlFor="tipo">Tipo</label>
                <input
                  onChange={(event) =>
                    this.handleChange("filtroTipo", event.target.value)
                  }
                  id="tipo"
                  type="text"
                />
              </div>
            </Col>
            <Col sm>
              <div className="form-group">
                <label htmlFor="parcheggio">Parcheggio</label>
                <input
                  onChange={(event) =>
                    this.handleChange("filtroParcheggio", event.target.value)
                  }
                  id="parcheggio"
                  type="text"
                />
              </div>
            </Col>
            <Col sm>
              <div className="form-group">
                <label htmlFor="id_veicolo">ID</label>
                <input
                  onChange={(event) =>
                    this.handleChange("filtroID", event.target.value)
                  }
                  id="id_veicolo"
                  type="text"
                />
              </div>
            </Col>
          </Row>
        </div>
        <Container sm={12}>
          {veicolo.length === 0 ? "Non ci sono veicoli" : VL}
        </Container>
      </Container>
    );
  }
}

AggiornaVeicoli.propTypes = {
  CancellaVeicolo: PropTypes.func.isRequired,
  registerVeicolo: PropTypes.func.isRequired,
  Listaveicoli: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  listaveicoli: PropTypes.object.isRequired,
  listaparcheggi: PropTypes.object.isRequired,
  modificaStato: PropTypes.func.isRequired,
  modificaParcheggio: PropTypes.func.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  listaveicoli: state.listaveicoli,
  listaparcheggi: state.listaparcheggi,
});
export default connect(mapStateToProps, {
  registerVeicolo,
  Listaveicoli,
  CancellaVeicolo,
  Listaparcheggi,
  modificaStato,
  modificaParcheggio,
})(AggiornaVeicoli);
