import { Listaclienti } from "../../actions/authAutentications";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

//componenti da react-bootstrap
import { Container, Col, Row } from "react-bootstrap";

import ricercaFiltro from "../../utils/ricercaFiltro";

class AggiornaClienti extends Component {
  state = {
    filtroNome: "",
    filtroCognome: "",
    filtroEmail: "",
    filtroTelefono: "",
    filtroFiscale: "",
  };

  handleChange = (name, value) => {
    this.setState({ [name]: value });
  };

  async componentDidMount() {
    await this.props.Listaclienti();
  }

  viewCustomer(id) {
    console.log(id);
  }

  render() {
    const { filtroNome, filtroCognome, filtroEmail, filtroFiscale } =
      this.state;

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
      <div className="container" style={{ marginBottom: "23rem" }}>
        <div class="center" style={{ textAlign: "left" }}>
          <table class="responsive-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Cognome</th>
                <th>Codice Fiscale</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {utentiFiltrati.map((user) => (
                <tr key={user._id}>
                  <td>{user.nome}</td>
                  <td>{user.cognome}</td>
                  <td>{user.codice_fiscale}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );

    return (
      <Container fluid style={{ marginTop: "3rem", marginBottom: "3rem" }}>
        <div className="Form">
          <Row>
            <Col sm>
              <div className="form-group">
                <label htmlFor="name">Nome</label>
                <input
                  onChange={(event) =>
                    this.handleChange("filtroNome", event.target.value)
                  }
                  id="name"
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
                <label htmlFor="cf">Codice Fiscale</label>
                <input
                  onChange={(event) =>
                    this.handleChange("filtroFiscale", event.target.value)
                  }
                  id="cf"
                  type="text"
                />
              </div>
            </Col>
          </Row>
        </div>
        <div className="row">
          {user.length === 0 ? "Non ci sono clienti registrati" : CL}
        </div>
      </Container>
    );
  }
}

AggiornaClienti.propTypes = {
  Listaclienti: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  customerlist: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
  customerlist: state.customerlist,
});
export default connect(mapStateToProps, { Listaclienti })(AggiornaClienti);
