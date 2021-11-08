import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  GET_ERRORS,
  VISUALIZZA_PRENOTAZIONI,
  MODIFICA_PPRENOTAZIONE,
  CANCELLA_PRENOTAZIONE,
} from "./type";

//Register Prenotazioni
export const registerPrenotazione = (prenotazione) => (dispatch) => {
  axios
    .post("api/prenotazioni/addPrenotazione", prenotazione)
    .then()
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const ListaPrenotazioni = (cliente) => (dispatch) => {
  axios
    .put("/api/prenotazioni/prenotazionilist/", cliente)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: VISUALIZZA_PRENOTAZIONI,
        payload: res.data,
      });
    })
    .catch((err) => console.error(err));
};

export const inviaNotificheAutisti = (prenotazione) => (dispatch) => {
  axios
    .post("/api/prenotazioni/notificheprenotazioni/", prenotazione)
    .then((res) => {
      console.log(res.data);
      window.location.href = "/HomeCliente";
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const modificaStatoPrenotazione = (prenotazione) => (dispatch) => {
  axios
    .put(`/api/prenotazioni/modificastatoprenotazione/`, prenotazione)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: MODIFICA_PPRENOTAZIONE,
        payload: res.data,
      });
    })
    .catch((err) => console.error(err));
};

export const modificaStatoPrenotazione2 = (id, prenotazione) => (dispatch) => {
  axios
    .put(`/api/prenotazioni/modificastatoprenotazione2/${id}`, prenotazione)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: MODIFICA_PPRENOTAZIONE,
        payload: res.data,
      });
    })
    .catch((err) => console.error(err));
};

export const modificaPrenotazione = (id, Prenotazione) => (dispatch) => {
  axios
    .put(`/api/prenotazioni/modificaprenotazione/${id}`, Prenotazione)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: MODIFICA_PPRENOTAZIONE,
        payload: res.data,
      });
    })
    .catch((err) => console.error(err));
};

export const cancellaPrenotazione = (id) => (dispatch) => {
  axios
    .delete(`/api/prenotazioni/cancellaPrenotazione/${id}`)
    .then((res) => {
      dispatch({
        type: CANCELLA_PRENOTAZIONE,
        payload: id,
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};
