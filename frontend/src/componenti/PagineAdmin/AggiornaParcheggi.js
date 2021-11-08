import { Listaparcheggi } from "../../actions/parcheggiActions";
import React, { Component } from "react";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";

import { registerParcheggio } from "../../actions/parcheggiActions";

//componenti da react-bootstrap
import { Container, Col, Row, Modal, Button, Alert } from "react-bootstrap";

import "../../App.css";
import classnames from "classnames";

import filtriParcheggi from "../../utils/filtriParcheggi";

class AggiornaParcheggi extends Component {
  state = {
    nome: "",
    indirizzo: "",
    numero_civico: "",
    capienza_auto: "",
    capienza_moto: "",
    capienza_bici: "",
    capienza_monopattini: "",
    errore: false,
    errors: {},
    filtroNome: "",
    filtroIndirizzo: "",
    modalShow: false,
    messaggio: false,
    bool: false,
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  setModalShow = (input) => {
    this.setState({ modalShow: input });
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  async componentDidMount() {
    await this.props.Listaparcheggi();
  }

  viewCustomer(id) {
    console.log(id);
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = async (e) => {
    this.state.bool = false;
    e.preventDefault();
    const newParcheggio = {
      nome: this.state.nome,
      indirizzo: this.state.indirizzo,
      numero_civico: this.state.numero_civico,
      capienza_auto: this.state.capienza_auto,
      capienza_moto: this.state.capienza_moto,
      capienza_bici: this.state.capienza_bici,
      capienza_monopattini: this.state.capienza_monopattini,
    };
    for (var i = 0; i < this.props.listaparcheggi.parcheggio.length; i++) {
      console.log(
        this.state.indirizzo,
        this.props.listaparcheggi.parcheggio[i].indirizzo,
        this.state.indirizzo ===
          this.props.listaparcheggi.parcheggio[i].indirizzo
      );
      if (
        this.state.indirizzo ===
        this.props.listaparcheggi.parcheggio[i].indirizzo
      ) {
        this.state.bool = true;
        break;
      }
    }
    this.props.registerParcheggio(newParcheggio, this.props.history);
    if (this.state.indirizzo === "") {
      this.setState({ errore: true });
      this.state.errors.indirizzo = "Inserisci l'indirizzo";
    } else if (this.state.bool) {
      this.setState({ errore: true });
      this.state.errors.indirizzo =
        "E' già presente un parcheggio con questo indirizzo";
    } else {
      this.setModalShow(false);
      this.setState({ messaggio: true });
    }
  };

  render() {
    const { filtroNome, filtroIndirizzo, errors } = this.state;

    let parcheggiFiltrati = [];
    const { parcheggio } = this.props.listaparcheggi;
    parcheggiFiltrati = filtriParcheggi(parcheggio, filtroNome, "nome");
    parcheggiFiltrati = filtriParcheggi(
      parcheggiFiltrati,
      filtroIndirizzo,
      "indirizzo"
    );

    const PL = (
      <div className="container" style={{ marginBottom: "16rem" }}>
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
              </tr>
            </thead>
            <tbody>
              {parcheggiFiltrati.map((parcheggio) => (
                <tr key={parcheggio._id}>
                  <td>{parcheggio.nome}</td>
                  <td>{parcheggio.indirizzo}</td>
                  <td>{parcheggio.numero_civico}</td>
                  <td>{parcheggio.capienza_auto}</td>
                  <td>{parcheggio.capienza_moto}</td>
                  <td>{parcheggio.capienza_bici}</td>
                  <td>{parcheggio.capienza_monopattini}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );

    return (
      <Container fluid style={{ marginTop: "3rem", marginBottom: "3rem" }}>
        {this.state.messaggio ? (
          <Alert variant="success">
            Hai inserito correttamente il parcheggio!{" "}
            <Alert.Link href="/AggiornaParcheggi">Clicca qui </Alert.Link> per
            visualizzarlo
          </Alert>
        ) : null}
        <Modal
          {...this.props}
          size="lg"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.state.modalShow}
          onHide={() => this.setModalShow(false)}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Inserisci i dati del parcheggio
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container>
              <div className="Form">
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="nome">Nome</label>
                    <input
                      onChange={this.onChange}
                      value={this.state.nome}
                      id="nome"
                      error={errors.nome}
                      type="text"
                      className={classnames("form-control", {
                        invalid: errors.nome,
                      })}
                    />
                    <span className="red-text">{errors.nome}</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="indirizzo">Indirizzo</label>
                    <input
                      onChange={this.onChange}
                      value={this.state.indirizzo}
                      id="indirizzo"
                      error={errors.indirizzo}
                      type="text"
                      className={classnames("form-control", {
                        invalid: errors.indirizzo,
                      })}
                    />
                    {this.state.errore ? (
                      <span className="red-text">{errors.indirizzo}</span>
                    ) : null}{" "}
                  </div>
                  <div className="form-group">
                    <label htmlFor="numero_civico">Numero Civico</label>
                    <input
                      onChange={this.onChange}
                      value={this.state.numero_civico}
                      error={errors.numero_civico}
                      id="numero_civico"
                      type="number"
                      className={classnames("form-control", {
                        invalid: errors.numero_civico,
                      })}
                    />
                    <span className="red-text">{errors.numero_civico}</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="capienza_auto">Capienza Auto</label>
                    <input
                      onChange={this.onChange}
                      value={this.state.capienza_auto}
                      error={errors.capienza_auto}
                      id="capienza_auto"
                      type="number"
                      className={classnames("form-control", {
                        invalid: errors.capienza_auto,
                      })}
                    />
                    <span className="red-text">{errors.capienza_auto}</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="capienza_moto">Capienza Moto</label>
                    <input
                      onChange={this.onChange}
                      value={this.state.capienza_moto}
                      error={errors.capienza_moto}
                      id="capienza_moto"
                      type="number"
                      className={classnames("form-control", {
                        invalid: errors.capienza_moto,
                      })}
                    />
                    <span className="red-text">{errors.capienza_moto}</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="capienza_bici">Capienza Biciclette</label>
                    <input
                      onChange={this.onChange}
                      value={this.state.capienza_bici}
                      error={errors.capienza_bici}
                      id="capienza_bici"
                      type="number"
                      className={classnames("form-control", {
                        invalid: errors.capienza_bici,
                      })}
                    />
                    <span className="red-text">{errors.capienza_bici}</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="capienza_monopattini">
                      Capienza Monopattini
                    </label>
                    <input
                      onChange={this.onChange}
                      value={this.state.capienza_monopattini}
                      error={errors.capienza_monopattini}
                      id="capienza_monopattini"
                      type="number"
                      className={classnames("form-control", {
                        invalid: errors.capienza_monopattini,
                      })}
                    />
                    <span className="red-text">
                      {errors.capienza_monopattini}
                    </span>
                  </div>
                  <button
                    type="submit"
                    value="Aggiunta Parcheggio"
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
        <div className="Form">
          <Row>
            <Col sm={3} md={{ span: 3, offset: 9 }}>
              <button
                className="btn btn-dark btn-lg btn-block bottone"
                onClick={() => {
                  this.setModalShow(true);
                  this.setState({ messaggio: false });
                }}
              >
                + Inserisci Parcheggio
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
                <label htmlFor="indirizzo">Indirizzo</label>
                <input
                  onChange={(event) =>
                    this.handleChange("filtroIndirizzo", event.target.value)
                  }
                  id="indirizzo"
                  type="text"
                />
              </div>
            </Col>
          </Row>
        </div>
        <div className="row">
          {parcheggio.length === 0 ? "Non ci sono parcheggi" : PL}
        </div>
      </Container>
    );
  }
}

AggiornaParcheggi.propTypes = {
  registerParcheggio: PropTypes.func.isRequired,
  Listaparcheggi: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  listaparcheggi: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  listaparcheggi: state.listaparcheggi,
});
export default connect(mapStateToProps, {
  registerParcheggio,
  Listaparcheggi,
})(AggiornaParcheggi);
