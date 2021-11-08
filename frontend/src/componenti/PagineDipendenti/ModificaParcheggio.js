import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { Listaparcheggi } from "../../actions/parcheggiActions";
import { modificaParcheggioAssociato } from "../../actions/authAutentications";

//componenti da react-bootstrap
import { Container } from "react-bootstrap";

class ModificaParcheggio extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      id_parcheggio: "",
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

  async componentDidMount() {
    await this.props.Listaparcheggi();
  }

  ModificaParcheggioAssociato(id_parcheggio) {
    this.state.id_parcheggio = id_parcheggio;
    const dataUser = {
      id_parcheggio: this.state.id_parcheggio,
    };
    this.props.modificaParcheggioAssociato(this.state.id, dataUser);
  }

  render() {
    const { parcheggio } = this.props.listaparcheggi;
    const { user } = this.props.auth;
    this.state.id = user.id;

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
                        this.ModificaParcheggioAssociato(parcheggio._id)
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
      <Container style={{ marginTop: "5rem", marginBottom: "31rem" }}>
        <div className="row">
          {parcheggio.length === 0 ? "Non ci sono parcheggi" : PL}
        </div>
      </Container>
    );
  }
}

ModificaParcheggio.propTypes = {
  Listaparcheggi: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  modificaParcheggioAssociato: PropTypes.object.isRequired,
  listaparcheggi: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  listaparcheggi: state.listaparcheggi,
});

export default connect(mapStateToProps, {
  Listaparcheggi,
  modificaParcheggioAssociato,
})(ModificaParcheggio);
