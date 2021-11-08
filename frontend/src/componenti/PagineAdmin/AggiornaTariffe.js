import { Listaveicoli } from "../../actions/veicoliActions";
import { Listaparcheggi } from "../../actions/parcheggiActions";
import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { modificaTariffa } from "../../actions/veicoliActions";

//componenti da react-bootstrap
import { Container, Col, Row, Modal, Button } from "react-bootstrap";

import "../../App.css";
import classnames from "classnames";

import filtriVeicoli from "../../utils/filtriVeicoli";

class ModificaTariffe extends Component {
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
    veicoli_inparcheggio: [], //per fare capienza mettere dentro tutti i veicoli del parcheggio selezionato e in caso restituire error
  };

  async componentDidMount() {
    await this.props.Listaveicoli();
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

  modificaTariffaFeriale(id) {
    this.setState({ modalShow1: true });
    this.state.current_id = id;
  }
  modificaTariffaFestivo(id) {
    this.setState({ modalShow2: true });
    this.state.current_id = id;
  }

  onChange = async (e) => {
    await this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    if (this.state.prezzo_festivo === "" && this.state.prezzo_feriale !== "") {
      const VeicoloDaModificare = {
        _id: this.state.current_id,
        prezzo_feriale: this.state.prezzo_feriale,
      };
      this.props.modificaTariffa(this.state.current_id, VeicoloDaModificare);
    } else if (
      this.state.prezzo_feriale === "" &&
      this.state.prezzo_festivo !== ""
    ) {
      const VeicoloDaModificareDue = {
        _id: this.state.current_id,
        prezzo_festivo: this.state.prezzo_festivo,
      };

      this.props.modificaTariffa(this.state.current_id, VeicoloDaModificareDue);
    }
  };

  render() {
    const { filtroTipo, filtroParcheggio, filtroID, errors } = this.state;
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
      <Container sm={12} style={{ marginBottom: "25rem" }}>
        <div class="center" style={{ textAlign: "left" }}>
          <table class="responsive-table">
            <thead>
              <tr>
                <th>Tipo</th>
                <th>Modello</th>
                <th>Marca</th>
                <th>Targa</th>
                <th>Parcheggio</th>
                <th>Prezzo Festivo</th>
                <th>Prezzo Feriale</th>
                <th>Stato</th>
              </tr>
            </thead>
            <tbody>
              {veicoliFiltrati.map((veicolo) => (
                <tr key={veicolo._id}>
                  <td>{veicolo.tipo}</td>
                  <td>{veicolo.modello}</td>
                  <td>{veicolo.marca}</td>
                  <td>{veicolo.targa}</td>
                  <td>{veicolo.id_parcheggio}</td>
                  <td>
                    {veicolo.prezzo_festivo + "€ "}
                    <button
                      class="btn"
                      onClick={() => this.modificaTariffaFestivo(veicolo._id)}
                    >
                      <i class="material-icons">create</i>
                    </button>
                  </td>
                  <td>
                    {veicolo.prezzo_feriale + "€ "}
                    {"  "}
                    <button
                      class="btn"
                      onClick={() => this.modificaTariffaFeriale(veicolo._id)}
                    >
                      <i class="material-icons">create</i>
                    </button>
                  </td>
                  <td>{veicolo.stato}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    );

    return (
      <Container fluid style={{ marginTop: "3rem", marginBottom: "3rem" }}>
        <Container fluid style={{ marginTop: "3rem", marginBottom: "3rem" }}>
          <Modal
            {...this.props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={this.state.modalShow1}
            onHide={() => this.setState({ modalShow1: false })}
            backdrop="static"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Inserisci il prezzo Feriale
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container style={{ marginTop: "3rem", marginBottom: "3rem" }}>
                <div className="Form">
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label htmlFor="prezzo_feriale">Prezzo Feriale</label>
                      <input
                        onChange={this.onChange}
                        value={this.state.prezzo_feriale}
                        error={errors.prezzo_feriale}
                        id="prezzo_feriale"
                        type="number"
                        className={classnames("form-control", {
                          invalid: errors.prezzo_feriale,
                        })}
                      />
                      <span className="red-text">{errors.prezzo_feriale}</span>
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
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.setState({ modalShow1: false })}>
                Annulla
              </Button>
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
            onHide={() => this.setState({ modalShow2: false })}
            backdrop="static"
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Inserisci il prezzo Festivo
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Container style={{ marginTop: "3rem", marginBottom: "3rem" }}>
                <div className="Form">
                  <form noValidate onSubmit={this.onSubmit}>
                    <div className="form-group">
                      <label htmlFor="prezzo_festivo">Prezzo Festivo</label>
                      <input
                        onChange={this.onChange}
                        value={this.state.prezzo_festivo}
                        error={errors.prezzo_festivo}
                        id="prezzo_festivo"
                        type="number"
                        className={classnames("form-control", {
                          invalid: errors.prezzo_festivo,
                        })}
                      />
                      <span className="red-text">{errors.prezzo_festivo}</span>
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
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => this.setState({ modalShow2: false })}>
                Annulla
              </Button>
            </Modal.Footer>
          </Modal>
        </Container>
        <div className="Form">
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

ModificaTariffe.propTypes = {
  Listaveicoli: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  listaveicoli: PropTypes.object.isRequired,
  modificaTariffa: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  listaveicoli: state.listaveicoli,
});
export default connect(mapStateToProps, {
  Listaveicoli,
  modificaTariffa,
})(ModificaTariffe);
