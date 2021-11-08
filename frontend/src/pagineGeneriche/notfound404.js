import React, { Component } from "react";
import "../App.css";
import logo from "../immagini/logo.png";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class notFound extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: 3,
    };
  }

  render() {
    return (
      <div className="Chisiamo" style={{ paddingBottom: "6rem" }}>
        <Container>
          <Row>
            <Col sm>
              <h1 className="testonotfound">4</h1>
            </Col>
            <Col sm>
              <img
                style={{
                  animation: `spin ${this.state.speed}s linear infinite`,
                  marginTop: "3rem",
                }}
                src={logo}
                alt="img"
                width="110%"
                className="logonotfound"
              />
            </Col>
            <Col sm>
              <h1 className="testonotfound">4</h1>
            </Col>
          </Row>
          <Row>
            <Col sm>
              <h5 style={{ fontWeight: "400" }}>
                La pagina che stavi cercando non esiste!{" "}
                <Link to="/HomeCliente">Premi qui </Link> per tornare alla Home
              </h5>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
