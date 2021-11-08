import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  loginUser,
  setCurrentUser,
  logoutUser,
} from "../../../actions/authAutentications";

import { Link, withRouter } from "react-router-dom";

import "../../../App.css";

//componenti da react-bootstrap
import { Navbar, ButtonGroup, DropdownButton, Dropdown } from "react-bootstrap";

//icone da material ui-icons
import PersonIcon from "@material-ui/icons/Person";
import { blue } from "@material-ui/core/colors";
import NotificationsActiveIcon from "@material-ui/icons/NotificationsActive";

//Componenti nostre
import Logo from "../../../immagini/logo.png";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";

let stile;

class MyNavbar extends React.Component {
  onLogoutClick = (e) => {
    e.preventDefault();
    this.setState({ modalShow: false });
    this.props.logoutUser();
  };
  constructor(props) {
    super(props);
    this.state = { modalShow: false };
  }
  render() {
    try {
      const { user } = this.props.auth;
      if (user.ruolo === "Admin" || user.ruolo === "Addetto") stile = "AA";
      else if (user.ruolo === "Cliente" || user.ruolo === "Autista")
        stile = "CA";
    } catch (error) {
      stile = "default";
    }
    switch (stile) {
      case "AA":
        return (
          <div>
            <Modal
              {...this.props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={this.state.modalShow}
              onHide={() => this.setState({ modalShow: false })}
              backdrop="static"
            >
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                <Container style={{ marginTop: "5rem", marginBottom: "5rem" }}>
                  <h3 style={{ textAlign: "center", color: "black" }}>
                    Sei sicuro di volerti disconnettere?
                  </h3>
                  <Row>
                    <Col sm>
                      <button
                        type="submit"
                        value="Registrazione Log"
                        className="btn btn-dark btn-lg btn-block bottone"
                        onClick={(e) => this.onLogoutClick(e)}
                      >
                        Conferma
                      </button>
                    </Col>
                    <Col sm>
                      <button
                        type="submit"
                        value="Registrazione Log"
                        className="btn btn-primary btn-lg btn-block bottone"
                        onClick={() => (window.location.href = "/HomeCliente")}
                      >
                        Annulla
                      </button>
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => this.setState({ modalShow: false })}>
                  Annulla
                </Button>
              </Modal.Footer>
            </Modal>
            <Navbar className="Navbar justify-content-between">
              <Navbar.Brand href="/HomeCliente">
                <img
                  src={Logo}
                  width="50"
                  height="50"
                  alt="Karm-Logo"
                  className="logonavbar"
                />
              </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <DropdownButton
                  menuAlign="right"
                  title={<PersonIcon style={{ fontSize: "25" }} />}
                  id="dropdown-menu-align-right"
                  className="bottonenavbar"
                >
                  <Dropdown.Item eventKey="1" href="/IlMioProfilo">
                    Il Mio Profilo
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    eventKey="4"
                    style={{ backgroundColor: "red" }}
                    onClick={() => this.setState({ modalShow: true })}
                  >
                    Disconnettiti
                  </Dropdown.Item>
                </DropdownButton>
              </Navbar.Collapse>
            </Navbar>
          </div>
        );
      case "CA":
        return (
          <div>
            <Modal
              {...this.props}
              size="lg"
              aria-labelledby="contained-modal-title-vcenter"
              centered
              show={this.state.modalShow}
              onHide={() => this.setState({ modalShow: false })}
              backdrop="static"
            >
              <Modal.Header closeButton></Modal.Header>
              <Modal.Body>
                <Container style={{ marginTop: "5rem", marginBottom: "5rem" }}>
                  <h3 style={{ textAlign: "center", color: "black" }}>
                    Sei sicuro di volerti disconnettere?
                  </h3>
                  <Row>
                    <Col sm>
                      <button
                        type="submit"
                        value="Registrazione Log"
                        className="btn btn-dark btn-lg btn-block bottone"
                        onClick={(e) => this.onLogoutClick(e)}
                      >
                        Conferma
                      </button>
                    </Col>
                    <Col sm>
                      <button
                        type="submit"
                        value="Registrazione Log"
                        className="btn btn-primary btn-lg btn-block bottone"
                        onClick={() => (window.location.href = "/HomeCliente")}
                      >
                        Annulla
                      </button>
                    </Col>
                  </Row>
                </Container>
              </Modal.Body>
              <Modal.Footer>
                <Button onClick={() => this.setState({ modalShow: false })}>
                  Annulla
                </Button>
              </Modal.Footer>
            </Modal>
            <Navbar className="Navbar justify-content-between">
              <Navbar.Brand href="/HomeCliente">
                <img
                  src={Logo}
                  width="50"
                  height="50"
                  alt="Karm-Logo"
                  className="logonavbar"
                />
              </Navbar.Brand>
              <Navbar.Toggle />
              <Navbar.Collapse className="justify-content-end">
                <Link to="/Notifiche">
                  <NotificationsActiveIcon
                    style={{ fontSize: "25", marginTop: "0.25rem" }}
                  />
                </Link>
                <DropdownButton
                  menuAlign="right"
                  title={<PersonIcon style={{ fontSize: "25" }} />}
                  id="dropdown-menu-align-right"
                  className="bottonenavbar"
                >
                  <Dropdown.Item eventKey="1" href="/IlMioProfilo">
                    Il Mio Profilo
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    eventKey="4"
                    style={{ backgroundColor: "red" }}
                    onClick={() => this.setState({ modalShow: true })}
                  >
                    Disconnettiti
                  </Dropdown.Item>
                </DropdownButton>
              </Navbar.Collapse>
            </Navbar>
          </div>
        );
      default:
        return (
          <div>
            <Navbar
              className="Navbar"
              style={{ display: "block", textAlign: "center" }}
            >
              <Navbar.Brand href="/Login">
                <img
                  src={Logo}
                  width="50"
                  height="auto"
                  alt="Karm-Logo"
                  className="logonavbar1"
                />
              </Navbar.Brand>
            </Navbar>
          </div>
        );
    }
  }
}

MyNavbar.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logoutUser })(MyNavbar);
