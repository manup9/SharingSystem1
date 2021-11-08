import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link, withRouter } from "react-router-dom";
import {
  registerMetodoPagamento,
  CancellaMetodoPagamento,
  Listametodipagamento,
} from "../../actions/metodipagamentoActions";

//componenti da react-bootstrap
import { Container, Col, Row, Modal, Button, Alert } from "react-bootstrap";
import "../../App.css";
import classnames from "classnames";

class MetodiPagamento extends Component {
  state = {
    id_cliente: "",
    numero_carta: "",
    intestatario: "",
    data_scadenza: "",
    cvv: "",
    errors: {},
    messaggio: true,
    messaggio2: true,
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
    this.setState({messaggio2: false});
    this.setState({modalShow1: false});
    this.props.CancellaMetodoPagamento(id);
  }

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    const newMetodoPagamento = {
      id_cliente: this.state.id_cliente,
      numero_carta: this.state.numero_carta,
      intestatario: this.state.intestatario,
      data_scadenza: this.state.data_scadenza,
      cvv: this.state.cvv,
    };
    if(!this.props.registerMetodoPagamento(newMetodoPagamento)){
      this.setState({messaggio: false});
      this.setState({modalShow: false});
    }
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
                <th>Rimuovi</th>
              </tr>
            </thead>
            <tbody>
              {pagamento.map((pagamento) => (
                <tr key={pagamento._id}>
                  <td>{pagamento.numero_carta}</td>
                  <td>{pagamento.intestatario}</td>
                  <td>{pagamento.data_scadenza.substring(0, 10)}</td>
                  <td>{pagamento.cvv}</td>
                  <td>
                    {" "}
                    <button
                      class="btn"
                      onClick={() => {this.setState({modalShow1:true}); localStorage.setItem("currentcarta", pagamento.numero_carta); localStorage.setItem("currentcartaid", pagamento._id);}}
                      className="btn btn-primary btn-lg btn-block bottone"
                    >
                      RIMUOVI
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
        {this.state.messaggio  ? null : <Alert variant="success">
        Hai inserito correttamente un nuovo metodo di pagamento!<Alert.Link href="/MetodiDiPagamento"> Premi qui </Alert.Link>per visualizzarlo
      </Alert> }
      {this.state.messaggio2  ? null : <Alert variant="danger">
        Hai eliminato correttamente un metodo di pagamento!<Alert.Link href="/MetodiDiPagamento"> Premi qui </Alert.Link>per visualizzare la rimozione
      </Alert> }
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
                    className="btn btn-primary btn-lg btn-block bottone"
                  >
                    Aggiungi
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
          onHide={() => this.setState({ modalShow1: false})}
          backdrop="static"
        >
          <Modal.Header closeButton><h3 style={{ textAlign: "center", color: "black" }}>
                    Sei sicuro di voler eliminare il tuo metodo di pagamento con numero di carta: {localStorage.getItem("currentcarta")}?
                  </h3></Modal.Header>
          <Modal.Body>
            <Container style={{ marginTop: "3rem", marginBottom: "3rem" }}>
                  <Row className="justify-content-md-center">
                  <Col sm={3}>
                  <button
                    type="submit"
                    value="Registrazione Log"
                    className="btn btn-dark btn-lg btn-block bottone"
                    onClick={(e) => this.deleteMetodoPagamento(localStorage.getItem("currentcartaid"))}
                  >
                    Conferma
                  </button>
                  </Col>

                  </Row>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={() => this.setState({ modalShow1: false})}>Annulla</Button>
          </Modal.Footer>
        </Modal>
        <div className="Form">
          <Row>
            <Col sm={3} md={{ span: 3, offset: 9 }}>
              <button
                className="btn btn-dark btn-lg btn-block bottone"
                onClick={() => {this.setModalShow(true); this.state.messaggio=true;}}
              >
                + Inserisci nuova carta
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

MetodiPagamento.propTypes = {
  registerMetodoPagamento: PropTypes.func.isRequired,
  CancellaMetodoPagamento: PropTypes.func.isRequired,
  Listametodipagamento: PropTypes.func.isRequired,
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
})(MetodiPagamento);
