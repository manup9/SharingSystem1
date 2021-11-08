import React from "react";
import { Link } from "react-router-dom";

//componenti da react-bootstrap
import { Container, Row, Col } from "react-bootstrap";

//icone da material ui-icons
import CopyrightIcon from "@material-ui/icons/Copyright";

//Componenti nostre
import Logo from "../../../immagini/logo1.png";

export default class Footer extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className="Footer">
        <Container fluid>
          <Row>
            <Col sm={4}>
              <img
                src={Logo}
                alt="Karm-Logo-Footer"
                width="160em"
                style={{ marginBottom: "2rem" }}
              />
            </Col>
            <Col sm={4}>
              <h6 style={{ color: "#010101", fontWeight: "bold" }}>
                Contattaci
              </h6>
              <h6 style={{ color: "#010101" }}>Emanuele +39 3512134015</h6>
              <h6 style={{ color: "#010101" }}>Emanuele +39 3895864331</h6>
              <h6 style={{ color: "#010101" }}>Carmelo +39 3284621210</h6>
              <h6 style={{ color: "#010101" }}>Gaspare +39 3207251451</h6>
            </Col>
            <Col sm={4}>
              <h6 style={{ color: "#010101", fontWeight: "bold" }}>Azienda</h6>
              <Link to="/Mappa">
                <h6 style={{ color: "#010101" }}>I nostri parcheggi</h6>
              </Link>
            </Col>
          </Row>
          <Row>
            <Col className="Copyright" sm={12} style={{ textAlign: "center" }}>
              <h6 style={{ color: "#010101", fontWeight: "bold" }}>
                SharingSystem <br />
                Studenti dell'Università degli Studi di Palermo, Ingegneria
                Informatica 2178
              </h6>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
