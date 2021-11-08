import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authAutentications";
import classnames from "classnames";

//componenti da react-bootstrap
import { Container, Row, Col, Modal, Button } from "react-bootstrap";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      modalShow: false,
      errors: {},
    };
  }

  componentDidMount() {
    //se sei autenticato e provi ad andare indietro
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/HomeCliente");
    }
  }
  //dopo autenticazione
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/HomeCliente");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors,
      });
    }
  }

  setModalShow = (input) => {
    this.setState({ modalShow: input });
  };

  onChange = (e) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password,
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <Container
        fluid
        style={{
          paddingTop: "20rem",
          paddingBottom: "16rem",
        }}
      >
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
              Inserisci i dati di accesso
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Container style={{ marginTop: "3rem", marginBottom: "3rem" }}>
              <div className="form">
                <form noValidate onSubmit={this.onSubmit}>
                  <h3 style={{ textAlign: "center", color: "#010101" }}>
                    Accedi
                  </h3>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      onChange={this.onChange}
                      value={this.state.email}
                      error={errors.email}
                      id="email"
                      type="email"
                      className={classnames("form-control", {
                        invalid: errors.email || errors.emailnotfound,
                      })}
                    />
                    <span className="red-text">
                      {errors.email}
                      {errors.emailnotfound}
                    </span>
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
                        invalid: errors.password || errors.passwordincorrect,
                      })}
                    />
                    <span className="red-text">
                      {errors.password}
                      {errors.passwordincorrect}
                    </span>
                  </div>
                  <button
                    type="submit"
                    value="Registrazione Log"
                    className="btn btn-dark btn-lg btn-block bottone"
                  >
                    Accedi
                  </button>
                </form>
              </div>
            </Container>
          </Modal.Body>
          <Modal.Footer>
            <h5 style={{ marginTop: "1rem" }}>
              <p className="forgot-password text-left">
                <Link to="/email"> Hai dimenticato la password? </Link>
              </p>
            </h5>
          </Modal.Footer>
        </Modal>
        <Container>
          <Row className="justify-content-md-center">
            <Col sm={6}>
              {" "}
              <button
                onClick={() => this.setModalShow(true)}
                value="Registrazione Log"
                className="btn btn-dark btn-lg btn-block bottone"
              >
                Accedi
              </button>
            </Col>
          </Row>
          <Row className="justify-content-md-center">
            <Col sm={6}>
              <h5 style={{ color: "black" }}>
                <p className="forgot-password text-center">
                  Non sei registrato? <Link to="/register">Registrati</Link>
                </p>
              </h5>
            </Col>
          </Row>
        </Container>
      </Container>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

export default connect(mapStateToProps, { loginUser })(Login);
