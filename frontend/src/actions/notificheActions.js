import axios from "axios";
import {
  VISUALIZZA_NOTIFICHE,
  INVIA_NOTIFICA_CLIENTE,
  CANCELLA_NOTIFICA,
  GET_ERRORS,
} from "./type";

export const ListaNotifiche = (cliente) => (dispatch) => {
  axios
    .put("/api/notifiche/notifichelist/", cliente)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: VISUALIZZA_NOTIFICHE,
        payload: res.data,
      });
    })
    .catch((err) => console.error(err));
};

export const inviaNotificaCliente = (id_utente) => (dispatch) => {
  axios
    .post(`/api/notifiche/notificheprenotazionicliente/${id_utente}`, id_utente)
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

export const cancellaNotifica = (id) => (dispatch) => {
  axios
    .delete(`/api/notifiche/cancellanotifica/${id}`)
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: CANCELLA_NOTIFICA,
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
