import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  registerMetodoPagamento,
  CancellaMetodoPagamento,
  Listametodipagamento,
} from "../../actions/metodipagamentoActions";

import {
  modificaStatoPrenotazione,
  registerPrenotazione,
} from "../../actions/prenotazioniActions";

//componenti da react-bootstrap
import { Container, Col, Row, Modal, Button } from "react-bootstrap";
import "../../App.css";
import classnames from "classnames";

class SchermataPagamento extends Component {
  state = {
    id_cliente: "",
    numero_carta: "",
    intestatario: "",
    data_scadenza: "",
    cvv: "",
    errors: {},
  };

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

  deleteMetodoPagamento(id) {
    this.props.CancellaMetodoPagamento(id);
    window.location.reload();
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const newMetodoPagamento = {
      name: this.state.name,
      id_cliente: this.state.id_cliente,
      numero_carta: this.state.numero_carta,
      intestatario: this.state.intestatario,
      data_scadenza: this.state.data_scadenza,
      cvv: this.state.cvv,
    };
    this.props.registerMetodoPagamento(newMetodoPagamento);
    //this.setModalShow(false);
    //window.location.reload();
    this.setModalShow(false);
    window.location.reload();
  };

  async componentDidMount() {
    await this.props.Listametodipagamento(this.state.id_cliente);
  }

  viewCustomer(id) {
    console.log(id);
  }
  setModalShow = (input) => {
    this.setState({ modalShow: input });
  };

  effettuapagamento() {
    if (
      localStorage.getItem("parcheggio_partenza") === "" &&
      localStorage.getItem("parcheggio_destinazione") === ""
    ) {
      this.setState({ modalShow1: true });
      const statoPrenotazione = {
        statoiniziale: "Incompleta",
        stato: "Pagata",
      };
      this.props.modificaStatoPrenotazione(statoPrenotazione);
    } else {
      const statoPrenotazione = {
        statoiniziale: "Incompleta",
        stato: "Pagata",
      };
      this.props.modificaStatoPrenotazione(statoPrenotazione);
      window.location.href = "/HomeCliente";
    }
  }

  render() {
    const { errors } = this.state;
    const { user } = this.props.auth;
    const { pagamento } = this.props.listametodipagamento;
    this.state.id_cliente = user.id;
    const MP = (
      <div className="container">
        <div class="center" style={{ textAlign: "left" }}>
          <table class="responsive-table">
            <thead>
              <tr>
                <th>Numero Carta</th>
                <th>intestatario</th>
                <th>Data Scadenza</th>
                <th>CVV</th>
                <th>Seleziona</th>
              </tr>
            </thead>
            <tbody>
              {pagamento.map((pagamento) => (
                <tr key={pagamento._id}>
                  <td>{pagamento.numero_carta}</td>
                  <td>{pagamento.intestatario}</td>
                  <td>{pagamento.data_scadenza}</td>
                  <td>{pagamento.cvv}</td>
                  <td>
                    {" "}
                    <button
                      className="btn btn-primary btn-lg btn-block bottone"
                      onClick={() => this.effettuapagamento()}
                    >
                      Seleziona
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
          show={this.state.modalShow1}
          onHide={() => this.setState({ modalShow1: false })}
          backdrop="static"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-vcenter">
              Vuoi lasciare una mancia per l'autista?
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container style={{ marginTop: "3rem", marginBottom: "3rem" }}>
              <div className="Form">
                <div className="form-group">
                  <label htmlFor="mancia">Mancia:</label>
                  <input
                    onChange={this.onChange}
                    value={this.state.mancia}
                    error={errors.mancia}
                    id="mancia"
                    type="number"
                    className={classnames("form-control", {
                      invalid: errors.mancia,
                    })}
                  />
                  <span className="red-text">{errors.mancia}</span>
                </div>
                <button
                  value="Registrazione Log"
                  className="btn btn-dark btn-lg btn-block bottone"
                  onClick={() => (window.location.href = "/HomeCliente")}
                >
                  Paga ora
                </button>
              </div>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ modalShow1: false })}>
              Annulla
            </Button>
          </Modal.Footer>
        </Modal>
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
            <Modal.Title id="contained-modal-title-center">
              Inserisci i dati del metodo di pagamento
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container style={{ marginTop: "3rem", marginBottom: "3rem" }}>
              <div className="Form">
                <form noValidate onSubmit={this.onSubmit}>
                  <div className="form-group">
                    <label htmlFor="numero_carta">Numero di carta</label>
                    <input
                      onChange={this.onChange}
                      value={this.state.numero_carta}
                      error={errors.numero_carta}
                      id="numero_carta"
                      type="number"
                      className={classnames("form-control", {
                        invalid: errors.numero_carta,
                      })}
                    />
                    <span className="red-text">{errors.numero_carta}</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="intestatario">intestatario</label>
                    <input
                      onChange={this.onChange}
                      value={this.state.intestatario}
                      error={errors.intestatario}
                      id="intestatario"
                      type="text"
                      className={classnames("form-control", {
                        invalid: errors.intestatario,
                      })}
                    />
                    <span className="red-text">{errors.intestatario}</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="date">Data di scadenza</label>
                    <input
                      onChange={this.onChange}
                      value={this.state.data_scadenza}
                      error={errors.data_scadenza}
                      id="data_scadenza"
                      type="date"
                      className={classnames("form-control", {
                        invalid: errors.data_scadenza,
                      })}
                    />
                    <span className="red-text">{errors.data_scadenza}</span>
                  </div>
                  <div className="form-group">
                    <label htmlFor="cvv">CVV</label>
                    <input
                      onChange={this.onChange}
                      value={this.state.cvv}
                      error={errors.cvv}
                      id="cvv"
                      type="number"
                      className={classnames("form-control", {
                        invalid: errors.cvv,
                      })}
                    />
                    <span className="red-text">{errors.cvv}</span>
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
        <div className="Form">
          <Row>
            <Col sm={3} md={{ span: 3, offset: 9 }}>
              <button
                className="btn btn-dark btn-lg btn-block bottone"
                onClick={() => this.setModalShow(true)}
              >
                + Inserisci nuovo metodo di pagamento
              </button>
            </Col>
          </Row>
        </div>
        <div className="row" style={{ marginBottom: "35rem" }}>
          {pagamento.length === 0 ? "Non ci sono metodi di pagamento" : MP}
        </div>
      </Container>
    );
  }
}

SchermataPagamento.propTypes = {
  registerMetodoPagamento: PropTypes.func.isRequired,
  registerPrenotazione: PropTypes.func.isRequired,
  CancellaMetodoPagamento: PropTypes.func.isRequired,
  Listametodipagamento: PropTypes.func.isRequired,
  modificaStatoPrenotazione: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  listametodipagamento: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  listametodipagamento: state.listametodipagamento,
});
export default connect(mapStateToProps, {
  registerMetodoPagamento,
  Listametodipagamento,
  CancellaMetodoPagamento,
  modificaStatoPrenotazione,
  registerPrenotazione,
})(SchermataPagamento);
