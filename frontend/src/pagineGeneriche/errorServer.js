import React, { Component } from "react";
import "../App.css";
import logo from "../immagini/logo.png";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export default class errorServer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      speed: 3,
    };
  }

  render() {
    return (
      <div className="Chisiamo" style={{ paddingBottom: "9rem" }}>
        <Container>
          <Row>
            <Col sm>
              <img
                style={{
                  animation: `spin ${this.state.speed}s linear infinite`,
                  marginTop: "3rem",
                }}
                src={logo}
                alt="img"
                width="50vw"
                className="logonotfound"
              />
            </Col>
          </Row>
          <Row>
            <Col sm>
              <h5 style={{ fontWeight: "400" }}>
                Il server è crashato! <Link to="/HomeCliente">Premi qui </Link>{" "}
                per tornare alla Home
              </h5>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
