import { Container, Col, Row, Modal, Button, Alert } from "react-bootstrap";
import axios from "axios";
import {
  VISUALIZZA_VEICOLI,
  ERROR_VEICOLI,
  INSERISCI_VEICOLO,
  MODIFICA_VEICOLO,
  GET_SPECIFIC_VEICOLO,
  CANCELLA_VEICOLO,
  VISUALIZZA_VEICOLI_DISPONIBILI,
} from "./type";

// Register User
export const registerVeicolo = (veicolo) => (dispatch) => {
  axios.post("/api/veicoli/addVeicolo", veicolo).catch((err) =>
    dispatch({
      type: ERROR_VEICOLI,
      payload: err.response.data,
    })
  );
};

// Lista Veicoli
export const Listaveicoli = () => (dispatch) => {
  axios
    .get("/api/veicoli/veicolilist")
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: VISUALIZZA_VEICOLI,
        payload: res.data,
      });
    })
    .catch((err) => console.error(err));
};

export const Listaveicolidisponibili = (tipo, veicolo) => (dispatch) => {
  axios
    .put(`/api/veicoli/veicolilistdisponibili/${tipo}`, veicolo)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: VISUALIZZA_VEICOLI_DISPONIBILI,
        payload: res.data,
      });
    })
    .catch((err) => console.error(err));
};

export const ModificaVeicolo = (id, veicolo) => (dispatch) => {
  axios
    .put(`/api/veicoli/updateVeicolo/${id}`, veicolo)
    .then((res) => {
      dispatch({
        type: MODIFICA_VEICOLO,
        payload: res.data,
      });
    })
    .catch((err) => console.error(err));
};

export const CancellaVeicolo = (id) => (dispatch) => {
  axios
    .delete(`/api/veicoli/deleteVeicolo/${id}`)
    .then((res) => {
      console.log(id);
      dispatch({
        type: CANCELLA_VEICOLO,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch({
        type: ERROR_VEICOLI,
        payload: err.response.data,
      })
    );
};
export const GetSpecificVeicolo = (id) => (dispatch) => {
  axios
    .get(`/api/veicoli/veicolo/${id}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_SPECIFIC_VEICOLO,
        payload: res.data,
      });
    })
    .catch((err) => console.error(err));
};
export const modificaStato = (id, veicolo) => (dispatch) => {
  axios
    .put(`/api/veicoli/updatestatoveicolo/${id}`, veicolo)
    .then((res) => {
      console.log(res.data);
      window.location.reload();
      dispatch({
        type: MODIFICA_VEICOLO,
        payload: res.data,
      });
    })
    .catch((err) => console.error(err));
};
export const modificaParcheggio = (id, veicolo) => (dispatch) => {
  axios
    .put(`/api/veicoli/updateparcheggioveicolo/${id}`, veicolo)
    .then((res) => {
      console.log(res.data);
      window.location.reload();
      dispatch({
        type: MODIFICA_VEICOLO,
        payload: res.data,
      });
    })
    .catch((err) => console.error(err));
};

export const modificaTariffa = (id, veicolo) => (dispatch) => {
  axios
    .put(`/api/veicoli/updatetariffaveicolo/${id}`, veicolo)
    .then((res) => {
      console.log(res.data);
      window.location.href = "/GestioneAmministrazione";

      dispatch({
        type: MODIFICA_VEICOLO,
        payload: res.data,
      });

      return true;
    })
    .catch((err) => console.error(err));
};
